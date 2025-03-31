package com.flightsearch.flight_search_backend.dto;

import java.util.List;

public class ItineraryDTO {
    private String duration; 
    private List<SegmentDTO> segments;
    
    public ItineraryDTO(String duration, List<SegmentDTO> segments){
        this.duration = duration; 
        this.segments = segments; 
    }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public List<SegmentDTO> getSegments() { return segments; }
    public void setSegments(List<SegmentDTO> segments) { this.segments = segments; }
}
