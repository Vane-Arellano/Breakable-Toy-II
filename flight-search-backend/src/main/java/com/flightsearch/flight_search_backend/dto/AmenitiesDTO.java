package com.flightsearch.flight_search_backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AmenitiesDTO {
    private String description; 
    private boolean isChargeable;

    public AmenitiesDTO(String description, boolean isChargeable){
        this.description = description; 
        this.isChargeable = isChargeable;
    }

    public String getAmenityDecription(){ return description; }
    public void setdescription(String description){ this.description = description; }

    public boolean getIsChargeable(){ return isChargeable; }
    public void setIsChargeable(boolean isChargeable){ this.isChargeable = isChargeable; }
}
