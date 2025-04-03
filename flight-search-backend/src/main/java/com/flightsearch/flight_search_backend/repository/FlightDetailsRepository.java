package com.flightsearch.flight_search_backend.repository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.flightsearch.flight_search_backend.dto.SegmentDTO;

public class FlightDetailsRepository {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
    
    public List<String> calculateTimeBetweenSegments(List<SegmentDTO> segments) {
        List<String> times = new ArrayList<>();
        
        if (segments == null || segments.size() < 2) {
            return times; // Return empty list for insufficient segments
        }

        // Add "N/A" for first segment since there's no previous segment
        times.add("N/A");
        
        for (int i = 1; i < segments.size(); i++) {
            SegmentDTO previousSegment = segments.get(i - 1);
            SegmentDTO currentSegment = segments.get(i);
            
            LocalDateTime prevArrival = parseDateTime(previousSegment.getArrival().getAt());
            LocalDateTime currDeparture = parseDateTime(currentSegment.getDeparture().getAt());
            
            Duration duration = Duration.between(prevArrival, currDeparture);
            times.add(formatDuration(duration));
        }
        
        return times;
    }

    private LocalDateTime parseDateTime(String dateTimeStr) {
        return LocalDateTime.parse(dateTimeStr, FORMATTER);
    }

    private String formatDuration(Duration duration) {
        long hours = duration.toHours();
        long minutes = duration.toMinutesPart();
        return String.format("%dh %02dm", hours, minutes);
    }


}
