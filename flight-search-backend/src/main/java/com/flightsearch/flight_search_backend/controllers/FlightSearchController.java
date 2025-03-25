package com.flightsearch.flight_search_backend.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.flight_search_backend.service.Flights;


@RestController
@RequestMapping("/api/flights")
public class FlightSearchController {
    private final Flights flightSearch;

    @Autowired
    public FlightSearchController(Flights flightSearch) {
        this.flightSearch = flightSearch;
    }

    @GetMapping("/airports")
    public Map<String, Object> getAirports(@RequestParam String keyword) {
        return flightSearch.getAirports(keyword);
    }

    @GetMapping("")
    public String getFlightDestinations(
        @RequestParam String origin,
        @RequestParam String destination,
        @RequestParam String departureDate,
        @RequestParam int adults, 
        @RequestParam String currency,
        @RequestParam boolean nonStop

    ) 
    { 
        return flightSearch.getFlightOffers(origin, destination, departureDate, adults, currency, nonStop);
    }

}
