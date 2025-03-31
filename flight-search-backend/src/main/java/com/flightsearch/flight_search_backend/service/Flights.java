package com.flightsearch.flight_search_backend.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.flightsearch.flight_search_backend.dto.FlightDataDTO;
import com.flightsearch.flight_search_backend.dto.FlightOfferDTO;
import com.flightsearch.flight_search_backend.repository.FlightsRepository;

@Service
public class Flights {

    private final FlightsRepository flightsRepository; 

    public Flights(FlightsRepository flightsRepository) {
        this.flightsRepository = flightsRepository;
    }

    public List<FlightOfferDTO> getFlightOffers(String origin, String destination, String departureDate, int adults, String currency, boolean nonStop) {
    
        List<FlightOfferDTO> response = new ArrayList<>();

        try {
            response = flightsRepository.getFlightOffersRepository(origin, destination, departureDate, adults, currency, nonStop);
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
