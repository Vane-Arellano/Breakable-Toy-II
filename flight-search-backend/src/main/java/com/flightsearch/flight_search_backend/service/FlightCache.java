package com.flightsearch.flight_search_backend.service;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.flightsearch.flight_search_backend.dto.FlightDataDTO;

@Service
public class FlightCache {
    private final ConcurrentHashMap<String, List<FlightDataDTO>> cache = new ConcurrentHashMap<>();

    public void cacheFlights(String cacheKey, List<FlightDataDTO> flightsDetails) {
        cache.put(cacheKey, flightsDetails);
    }

    public List<FlightDataDTO> getCachedFlights(String cacheKey) {
        return cache.get(cacheKey);
    }

    public void clearCache() {
        cache.clear();
    }
}
