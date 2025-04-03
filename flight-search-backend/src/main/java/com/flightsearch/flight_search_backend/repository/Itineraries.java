package com.flightsearch.flight_search_backend.repository;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flightsearch.flight_search_backend.dto.AmenitiesDTO;
import com.flightsearch.flight_search_backend.dto.FareDetailsDTO;
import com.flightsearch.flight_search_backend.dto.ItineraryDTO;
import com.flightsearch.flight_search_backend.dto.LocationDTO;
import com.flightsearch.flight_search_backend.dto.SegmentDTO;

/**
         * ItineraryDTO {
         *  String duration
         *  List<SegmentDTO> segments 
         * }
         * 
         * SegmentDTO {
         *  LocationDTO departure
         *  LocationDTO arrival
         *  String carrierCode
         *  String operationCarrierCode
         *  String flightNumber
         *  String aircraftCode
         *  FareDetailsDTO travelerFareDetails
         * }
 */

public class Itineraries {
    public List<ItineraryDTO> mapItineraries(JsonNode offer, ObjectMapper objectMapper) {

        List<SegmentDTO> segments = new ArrayList<>(); 
        List<ItineraryDTO> itineraries = new ArrayList<>(); 
        
        // Iterate through the itineraries of the flight offer
        for (JsonNode itinerary : offer.path("itineraries")) {
            // get the flight duration of that itinerary 
            String flightDuration = itinerary.path("duration").asText();
            List<AmenitiesDTO> amenities = new ArrayList();

            //Initialize index of current segment
            int segmentIndex = 0;

            // Iterate through all segments 
            for (JsonNode segment : itinerary.path("segments")) {

                // Get departure and arrival data for each segment 
                String departureIata = segment.path("departure").path("iataCode").asText();
                String departureAt = segment.path("departure").path("at").asText();
                LocationDTO departure = new LocationDTO(departureIata, departureAt);

                String arrivalIata = segment.path("arrival").path("iataCode").asText();
                String arrivalAt = segment.path("arrival").path("at").asText();
                LocationDTO arrival = new LocationDTO(arrivalIata, arrivalAt);

                // Get carrierCode, operating, flightNumber and aircraftCode for each segment
                String carrierCode = segment.path("carrierCode").asText();
                String operatingCarrierCode = segment.path("operatingCarrierCode").asText();
                String flightNumber = segment.path("number").asText();
                String aircraftCode = segment.path("aircraft").path("code").asText();

                // Get into the travelerPricing of the current segment through the segmentIndex
                JsonNode fareDetailsBySegment = 
                    offer.path("travelerPricings")
                    .get(0)
                    .path("fareDetailsBySegment")
                    .get(segmentIndex);

                // get the fareDetails of the current segment and save it into travelerFareDetails
                String segmentId = fareDetailsBySegment.path("segmentId").asText();
                String cabin = fareDetailsBySegment.path("cabin").asText();
                String fClass = fareDetailsBySegment.path("class").asText();
                amenities = getAmenities(fareDetailsBySegment, objectMapper);

                FareDetailsDTO travelerFareDetailsDTO = new FareDetailsDTO(
                        segmentId,
                        cabin,
                        fClass,
                        amenities);
                
                // Once we have all the necessary data for this segment, create a segment object and add it to the segments list 
                SegmentDTO singleSegment = new SegmentDTO(
                        departure,
                        arrival,
                        carrierCode,
                        operatingCarrierCode,
                        flightNumber,
                        aircraftCode,
                        travelerFareDetailsDTO);

                segments.add(singleSegment);


                // increase the segment index 
                segmentIndex ++;
            }

            // Once we have all the segments of this itinerary, create a new itinerary object and add it to the itineraries list
            itineraries.add(new ItineraryDTO(flightDuration, segments));
        }
        return itineraries;
    }

    private List<AmenitiesDTO> getAmenities(JsonNode fareDetailsBySegment, ObjectMapper objectMapper){
        JsonNode amenitiesNode = fareDetailsBySegment.path("amenities");
        List<AmenitiesDTO> amenities = new ArrayList<>();

        for (JsonNode node : amenitiesNode) {
            String description = node.path("description").asText();
            boolean isChargeable = node.path("isChargeable").asBoolean();
            AmenitiesDTO amenity = new AmenitiesDTO(description, isChargeable);
            amenities.add(amenity);
        }
        return amenities;

    }
}
