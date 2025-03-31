package com.flightsearch.flight_search_backend.dto;

import java.util.List;

public class FareDetailsDTO {
    private String segmentId;
    private String cabin; 
    private String fClass;
    private List<AmenitiesDTO> amenities;

    public FareDetailsDTO(String segmentId, String cabin, String fClass, List<AmenitiesDTO> amenities){
        this.segmentId = segmentId;
        this.cabin = cabin; 
        this.fClass = fClass; 
        this.amenities = amenities;
    }

    public String getSegmentId(){ return segmentId; }
    public void setSegmentId(String segmentId){ this.segmentId = segmentId; }

    public String getCabin(){ return cabin; }
    public void setCabin(String cabin){ this.cabin = cabin; }


    public String getFClass(){ return fClass; }
    public void setFClass(String fClass){ this.fClass = fClass; }


    public List<AmenitiesDTO> getAmenities(){ return amenities; }
    public void setAmenities(List<AmenitiesDTO> amenities){ this.amenities = amenities; }
}
