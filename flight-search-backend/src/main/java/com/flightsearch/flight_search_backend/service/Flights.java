package com.flightsearch.flight_search_backend.service;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.flightsearch.flight_search_backend.dto.FlightDataDTO;
import com.flightsearch.flight_search_backend.repository.FlightsRepository;

@Service
public class Flights {

    private final FlightsRepository flightsRepository; 

    public Flights(FlightsRepository flightsRepository) {
        this.flightsRepository = flightsRepository;
    }

    public Object getFlightOffers(
        String origin, String destination,
         String departureDate, String returnDate, 
         int adults, String currency, boolean nonStop,
         String sortBy, String sortOrder) {
    
        Object response = new ArrayList<>();

        try {
            response = flightsRepository.getFlightOffersRepository(
                origin, destination, 
                departureDate, returnDate, 
                adults, currency, nonStop, 
                sortBy, sortOrder);
        } catch (Exception e) {
            e.toString();
        }
        
        return response;
    }

    public FlightDataDTO getFlightDetails(String id){
        int index = Integer.parseInt(id);
        return flightsRepository.getFlightDetailsRepository(index-1);
    }
}
