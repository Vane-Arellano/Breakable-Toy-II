package com.flightsearch.flight_search_backend.dto;

import java.util.ArrayList;
import java.util.List;

public class FlightDataDTO {
    private String id;
    private ItineraryDTO itineraries; 
    private List<String> timeBetween = new ArrayList<>(); 

    public FlightDataDTO(String id, ItineraryDTO itineraries, List<String> timeBetween){
        this.id = id; 
        this.itineraries = itineraries; 
        this.timeBetween = timeBetween; 
    }

    public FlightDataDTO(String id, ItineraryDTO itineraries){
        this.id = id; 
        this.itineraries = itineraries; 
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ItineraryDTO getItineraries() {
        return itineraries;
    }

    public void setItineraries(ItineraryDTO itineraries) {
        this.itineraries = itineraries;
    }

    public List<String> getTimeBetween() {
        return timeBetween;
    }

    public void setTimeBetween(List<String> timeBetween) {
        this.timeBetween = timeBetween;
    }

    
}
