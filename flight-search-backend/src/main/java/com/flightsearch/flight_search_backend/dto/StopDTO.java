package com.flightsearch.flight_search_backend.dto;

public class StopDTO {
    private String iataCode; 
    private String duration; 

    public StopDTO(String iataCode, String duration){
        this.iataCode = iataCode;
        this.duration = duration;
    }

    public String getIataCode(){ return iataCode; }
    public void setIataCode( String iataCode ){ this.iataCode = iataCode; }

    public String getDuration(){ return duration; }
    public void setDuration( String duration ){ this.duration = duration; }


}
