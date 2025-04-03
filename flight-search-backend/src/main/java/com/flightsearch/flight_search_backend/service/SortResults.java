package com.flightsearch.flight_search_backend.service;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.flightsearch.flight_search_backend.dto.FlightOfferDTO;
import com.flightsearch.flight_search_backend.dto.RoundFlightDTO;

@Service
public class SortResults {
    @SuppressWarnings("unchecked")
    public Object sortFlightResults(Object flightResults, String sortBy, String sortOrder) {
        if (flightResults instanceof List) {
            List<?> results = (List<?>) flightResults;

            if (!results.isEmpty()) {
                if (results.get(0) instanceof FlightOfferDTO) {
                    return sortOneWayFlights((List<FlightOfferDTO>) results, sortBy, sortOrder);
                } else if (results.get(0) instanceof RoundFlightDTO) {
                    return sortRoundFlights((List<RoundFlightDTO>) results, sortBy, sortOrder);
                }
            }
        }
        return flightResults;
    }

    private List<FlightOfferDTO> sortOneWayFlights(List<FlightOfferDTO> flights, String sortBy, String sortOrder) {
        Comparator<FlightOfferDTO> comparator = buildComparator(sortBy, false);
        
        if ("desc".equalsIgnoreCase(sortOrder)) {
            comparator = comparator.reversed();
        }
        
        return flights.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }

    private List<RoundFlightDTO> sortRoundFlights(List<RoundFlightDTO> roundFlights, String sortBy, String sortOrder) {
        Comparator<RoundFlightDTO> comparator = buildComparator(sortBy, true);
        
        if ("desc".equalsIgnoreCase(sortOrder)) {
            comparator = comparator.reversed();
        }
        
        return roundFlights.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }

    private <T> Comparator<T> buildComparator(String sortBy, boolean isRoundTrip) {
        if (isRoundTrip) {
            return buildRoundTripComparator(sortBy);
        } else {
            return buildOneWayComparator(sortBy);
        }
    }
    
    @SuppressWarnings("unchecked")
    private <T> Comparator<T> buildRoundTripComparator(String sortBy) {
        Comparator<RoundFlightDTO> comparator;
        
        comparator = switch (sortBy.toLowerCase()) {
            case "price" -> Comparator.comparing(this::getRoundTripPrice);
            case "duration" -> Comparator.comparing(this::getRoundTripDuration);
            case "price_duration" -> Comparator.comparing(this::getRoundTripPrice)
                    .thenComparing(this::getRoundTripDuration);
            default -> Comparator.comparing(RoundFlightDTO::toString);
        };
        
        return (Comparator<T>) comparator;
    }
    
    @SuppressWarnings("unchecked")
    private <T> Comparator<T> buildOneWayComparator(String sortBy) {
        Comparator<FlightOfferDTO> comparator;
        
        comparator = switch (sortBy.toLowerCase()) {
            case "price" -> Comparator.comparing(this::getOneWayPrice);
            case "duration" -> Comparator.comparing(this::getOneWayDuration);
            case "price_duration" -> Comparator.comparing(this::getOneWayPrice)
                    .thenComparing(this::getOneWayDuration);
            default -> Comparator.comparing(FlightOfferDTO::toString);
        };
        
        return (Comparator<T>) comparator;
    }
    // Helper methods
    private BigDecimal getOneWayPrice(FlightOfferDTO flight) {
        return new BigDecimal(flight.getTotalPrice().getGrandTotal());
    }

    private long getOneWayDuration(FlightOfferDTO flight) {
        return parseDuration(flight.getFlightDuration());
    }

    private BigDecimal getRoundTripPrice(RoundFlightDTO flight) {
        return new BigDecimal(flight.getDepartureFlight().getTotalPrice().getGrandTotal())
                .add(new BigDecimal(flight.getReturnFlight().getTotalPrice().getGrandTotal()));
    }

    private long getRoundTripDuration(RoundFlightDTO flight) {
        return parseDuration(flight.getDepartureFlight().getFlightDuration()) +
               parseDuration(flight.getReturnFlight().getFlightDuration());
    }

    private long parseDuration(String duration) {
        try {
            return Duration.parse(duration).toMinutes();
        } catch (Exception e) {
            return 0;
        }
    }

}
