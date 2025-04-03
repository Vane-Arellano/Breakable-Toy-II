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
import com.flightsearch.flight_search_backend.dto.FlightDataDTO;
import com.flightsearch.flight_search_backend.dto.FlightOfferDTO;
import com.flightsearch.flight_search_backend.dto.ItineraryDTO;
import com.flightsearch.flight_search_backend.dto.PriceDTO;
import com.flightsearch.flight_search_backend.dto.StopDTO;
import com.flightsearch.flight_search_backend.service.AmadeusConnect;
import com.flightsearch.flight_search_backend.service.FlightCache;

@Repository
public class FlightsRepository {
    @Autowired
    RestTemplate restTemplate;
    private final AmadeusConnect amadeusConnect;
    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON parser
    private final FlightCache flightCache = new FlightCache();

    public FlightsRepository(RestTemplate restTemplate, AmadeusConnect amadeusConnect) {
        this.restTemplate = restTemplate;
        this.amadeusConnect = amadeusConnect;
    }

    public List<FlightOfferDTO> getFlightOffersRepository(String origin, String destination, String departureDate, int adults, String currency, boolean nonStop) {

        // Clear current cache of flight details
        flightCache.clearCache();

        // API call to get flights 
        String accessToken = amadeusConnect.getAccessToken();
        String url = String
        .format("https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=%s&destinationLocationCode=%s&departureDate=%s&adults=%d&currencyCode=%s&nonStop=%b"
        , origin, destination, departureDate, adults, currency, nonStop) ;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
        // Save all the details of all flights in cache
        List<FlightDataDTO> flightDetails = extractFlightDetails(response.getBody()); 
        flightCache.cacheFlights("details", flightDetails);

        // Return just the flight data (general data of the flight) 
        return extractFlightData(response.getBody()); 
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

            for (JsonNode offer : dataArray) {
                String id = offer.path("id").asText();
                List<ItineraryDTO> itineraries = itineraryClass.mapItineraries(offer, objectMapper);
                flightDetails.add(new FlightDataDTO(id, itineraries));

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
                
                    if (segments.isArray() && segments.size() > 0) {
                        JsonNode firstSegment = segments.get(0);
                        JsonNode lastSegment = segments.get(segments.size() - 1); 
                        departureDateTime = firstSegment.path("departure").path("at").asText();
                        departureAirport = firstSegment.path("departure").path("iataCode").asText(); 
                        arrivalDateTime = lastSegment.path("arrival").path("at").asText();
                        arrivalAirport = lastSegment.path("arrival").path("iataCode").asText();
                        airlineCode = firstSegment.path("carrierCode").asText(); 
                        operatingAirlineCode = firstSegment.path("operating").path("carrierCode").asText(); 
                    
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
                    PriceDTO price = new PriceDTO(currency, base, grandTotal); 
                    String pricePerTraveler = offer.path("travelerPricings").get(0).path("price").path("total").asText();

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
}
