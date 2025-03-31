package com.flightsearch.flight_search_backend.dto;

public class LocationDTO {
    private String iataCode; 
    private String at; 

    public LocationDTO(String iataCode, String at){
        this.iataCode = iataCode; 
        this.at = at;
    }

    public String getIataCode() { return iataCode; }
    public void setIataCode(String iataCode) { this.iataCode = iataCode; }

    public String getAt() { return at; }
    public void setAt(String at) { this.at = at; }


}
