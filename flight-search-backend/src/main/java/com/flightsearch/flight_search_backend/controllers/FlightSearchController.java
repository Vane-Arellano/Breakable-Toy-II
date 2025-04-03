package com.flightsearch.flight_search_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.flight_search_backend.dto.FlightDataDTO;
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
    public Object getFlightDestinations(
        @RequestParam(name="origin") String origin,
        @RequestParam(name="destination") String destination,
        @RequestParam(name="departureDate") String departureDate,
        @RequestParam(defaultValue="", name="returnDate") String returnDate,
        @RequestParam(name="adults", defaultValue="1") int adults, 
        @RequestParam(name="currency") String currency,
        @RequestParam(name="nonStop") boolean nonStop, 
        @RequestParam(defaultValue = "", name="sortBy") String sortBy, 
        @RequestParam(defaultValue = "", name="sortOrder") String sortOrder
    ) 
    { 
        return flightSearch.getFlightOffers(origin, destination, departureDate, returnDate, adults, currency, nonStop, sortBy, sortOrder);
    }

    @GetMapping("/details/{id}")
    public FlightDataDTO getFlightDetails( @PathVariable("id") String id ) 
    { 
        return flightSearch.getFlightDetails(id);
    }

}
