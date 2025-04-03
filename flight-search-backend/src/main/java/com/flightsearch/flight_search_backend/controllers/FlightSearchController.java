package com.flightsearch.flight_search_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.flight_search_backend.dto.FlightDataDTO;
import com.flightsearch.flight_search_backend.dto.FlightOfferDTO;
import com.flightsearch.flight_search_backend.service.Flights;


@RestController
@RequestMapping("/api/flights")
public class FlightSearchController {
    private final Flights flightSearch;

    @Autowired
    public FlightSearchController(Flights flightSearch) {
        this.flightSearch = flightSearch;
    }

    @GetMapping("")
    public List<FlightOfferDTO> getFlightDestinations(
        @RequestParam(name="origin") String origin,
        @RequestParam(name="destination") String destination,
        @RequestParam(name="departureDate") String departureDate,
        @RequestParam(required = false, name="arrivalDate") String arrivalDate,
        @RequestParam(name="adults", defaultValue="1") int adults, 
        @RequestParam(name="currency") String currency,
        @RequestParam(name="nonStop") boolean nonStop
    ) 
    { 
        return flightSearch.getFlightOffers(origin, destination, departureDate, adults, currency, nonStop);
    }

    @GetMapping("/details")
    public FlightDataDTO getFlightDetails( @RequestParam(name="id") String id ) 
    { 
        return flightSearch.getFlightDetails(id);
    }

}
