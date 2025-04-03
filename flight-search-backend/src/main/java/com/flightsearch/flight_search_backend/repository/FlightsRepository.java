package com.flightsearch.flight_search_backend.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flightsearch.flight_search_backend.dto.FeesDTO;
import com.flightsearch.flight_search_backend.dto.FlightDataDTO;
import com.flightsearch.flight_search_backend.dto.FlightOfferDTO;
import com.flightsearch.flight_search_backend.dto.ItineraryDTO;
import com.flightsearch.flight_search_backend.dto.PriceDTO;
import com.flightsearch.flight_search_backend.dto.RoundFlightDTO;
import com.flightsearch.flight_search_backend.dto.SegmentDTO;
import com.flightsearch.flight_search_backend.dto.StopDTO;
import com.flightsearch.flight_search_backend.service.AmadeusConnect;
import com.flightsearch.flight_search_backend.service.FlightCache;
import com.flightsearch.flight_search_backend.service.SortResults;

@Repository
public class FlightsRepository {
    @Autowired
    RestTemplate restTemplate;
    private final AmadeusConnect amadeusConnect;
    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON parser
    private final FlightCache flightCache = new FlightCache();
    private final FlightDetailsRepository flightDetailsRepo = new FlightDetailsRepository();
    private final SortResults sortResults = new SortResults(); 

    public FlightsRepository(RestTemplate restTemplate, AmadeusConnect amadeusConnect) {
        this.restTemplate = restTemplate;
        this.amadeusConnect = amadeusConnect;
    }

    public Object getFlightOffersRepository(
        String origin, String destination, 
        String departureDate, String returnDate, 
        int adults, String currency, 
        boolean nonStop, String sortBy, String sortOrder) {
        String url;
        // Clear current cache of flight details
        flightCache.clearCache();
        
        // API call to get flights 
        String accessToken = amadeusConnect.getAccessToken();
        if(returnDate.isEmpty()){
            url = String
            .format("https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=%s&destinationLocationCode=%s&departureDate=%s&adults=%d&currencyCode=%s&nonStop=%b"
            , origin, destination, departureDate, adults, currency, nonStop) ;
        } else {
            url = String
            .format("https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=%s&destinationLocationCode=%s&departureDate=%s&returnDate=%s&adults=%d&currencyCode=%s&nonStop=%b"
            , origin, destination, departureDate, returnDate, adults, currency, nonStop) ;
        }
       

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            // Save all the details of all flights in cache
            List<FlightDataDTO> flightDetails = extractFlightDetails(response.getBody()); 
            flightCache.cacheFlights("details", flightDetails);

            Object results;
            if(returnDate.isBlank()) {
                results = extractFlightData(response.getBody());
            } else {
                results = extractRoundFlights(response.getBody());
            }
            
            return sortResults.sortFlightResults(results, sortBy, sortOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return e;
        }
        
        
    }

    public FlightDataDTO getFlightDetailsRepository(int id){
        List<FlightDataDTO> flightDetails = flightCache.getCachedFlights("details");
        return flightDetails.get(id);
    }

    private List<FlightDataDTO> extractFlightDetails(String jsonResponse){
        List<FlightDataDTO> flightDetails = new ArrayList<>();
        Itineraries itineraryClass = new Itineraries(); 

        try {
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode dataArray = root.path("data");
            JsonNode dictionary = root.path("dictionaries");

            for (JsonNode offer : dataArray) {
                String id = offer.path("id").asText();
                ItineraryDTO itineraries = itineraryClass.mapItineraries(offer, dictionary, objectMapper);
                List<SegmentDTO> segments = itineraries.getSegments();
                List<String> timesBetween = flightDetailsRepo.calculateTimeBetweenSegments(segments);
                flightDetails.add(new FlightDataDTO(id, itineraries, timesBetween));

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flightDetails;
    }

    private List<FlightOfferDTO> extractFlightData(String jsonResponse){
        List<FlightOfferDTO> flightOffers = new ArrayList<>();
        try {
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode dataArray = root.path("data");
            JsonNode dictionary = root.path("dictionaries");
            for (JsonNode offer : dataArray) {
                String id = offer.path("id").asText();

                for (JsonNode itinerary : offer.path("itineraries")) {
                    String flightDuration = itinerary.path("duration").asText();
                    JsonNode segments = itinerary.path("segments");
                    String departureDateTime = "";
                    String departureAirport = ""; 
                    String arrivalDateTime = "";
                    String arrivalAirport = "";
                    String airlineCode = "";
                    String operatingAirlineCode = "";
                    String airlineName; 
                    String operatinAirlineName;
                
                    if (segments.isArray() && segments.size() > 0) {
                        JsonNode firstSegment = segments.get(0);
                        JsonNode lastSegment = segments.get(segments.size() - 1); 
                        departureDateTime = firstSegment.path("departure").path("at").asText();
                        departureAirport = firstSegment.path("departure").path("iataCode").asText(); 
                        arrivalDateTime = lastSegment.path("arrival").path("at").asText();
                        arrivalAirport = lastSegment.path("arrival").path("iataCode").asText();
                        airlineCode = firstSegment.path("carrierCode").asText(); 
                        operatingAirlineCode = firstSegment.path("operating").path("carrierCode").asText(); 
                        airlineName = dictionary.path("carriers").path(airlineCode).asText();
                        operatinAirlineName = dictionary.path("carriers").path(operatingAirlineCode).asText();
                        airlineCode = airlineCode.concat(" ").concat(airlineName);
                        operatingAirlineCode = operatingAirlineCode.concat(" ").concat(operatinAirlineName);
                    }

                    
                    int numberStops = segments.path("numberOfStops").asInt();
                    List<StopDTO> stops = new ArrayList<>(); 

                    if(numberStops > 0){
                        for (JsonNode stop: segments.path("stops").path("flightStop")){
                            String iataCode = stop.path("iataCode").asText(); 
                            String duration = stop.path("duration").asText();
                            stops.add(new StopDTO(iataCode, duration));
                        }
                    }

                    JsonNode priceRoot = offer.path("price"); 
                    String currency = priceRoot.path("currency").asText(); 
                    String base = priceRoot.path("base").asText(); 
                    String grandTotal = priceRoot.path("grandTotal").asText(); 
                    List<FeesDTO> fees = new ArrayList<>();
                    for(JsonNode fee: priceRoot.path("fees")){
                        fees.add(new FeesDTO(fee.path("amount").asText(), fee.path("type").asText()));
                    }
                    PriceDTO price = new PriceDTO(currency, base, grandTotal, fees); 
                    JsonNode pricePerTravelerRoot = offer.path("travelerPricings");
                    String baseTraveler =  pricePerTravelerRoot.get(0).path("price").path("base").asText();
                    String totalTraveler =  pricePerTravelerRoot.get(0).path("price").path("total").asText();

                    PriceDTO pricePerTraveler = new PriceDTO(currency, baseTraveler, totalTraveler);

                    FlightOfferDTO flightOffer = new FlightOfferDTO(
                        id, 
                        departureDateTime,
                        arrivalDateTime, 
                        departureAirport, 
                        arrivalAirport,
                        airlineCode, 
                        operatingAirlineCode, 
                        flightDuration, 
                        stops, 
                        price, 
                        pricePerTraveler
                    );

                    flightOffers.add(flightOffer);
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flightOffers;
    }

    private List<RoundFlightDTO> extractRoundFlights(String jsonResponse){
        List<FlightOfferDTO> flights = extractFlightData(jsonResponse); 
        List<RoundFlightDTO> pairedFlights = new ArrayList<>(); 

        for (int i = 0; i < flights.size(); i += 2) {
            if (i + 1 < flights.size()) {
                FlightOfferDTO departureFlight = flights.get(i);
                FlightOfferDTO returnFlight = flights.get(i+ 1);
                pairedFlights.add(new RoundFlightDTO(departureFlight, returnFlight));
            }
        }
        return pairedFlights;
    }
}
