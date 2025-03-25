package com.flightsearch.flight_search_backend.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Flights {

    @Autowired
    RestTemplate restTemplate;
    private final AmadeusConnect amadeusConnect;

    public Flights(RestTemplate restTemplate, AmadeusConnect amadeusConnect) {
        this.restTemplate = restTemplate;
        this.amadeusConnect = amadeusConnect;
    }

    public Map<String, Object> getAirports(String keyword){
        String type = "AIRPORT"; 
        String accessToken = amadeusConnect.getAccessToken();

        String url = String.format("https://test.api.amadeus.com/v1/reference-data/locations?subType=%s&keyword=%s&view=LIGHT", type, keyword);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

        return response.getBody();
    }

    public String getFlightOffers(String origin, String destination, String departureDate, int adults, String currency, boolean nonStop) {

        String accessToken = amadeusConnect.getAccessToken();
        String url = String
        .format("https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=%s&destinationLocationCode=%s&departureDate=%s&adults=%d&currencyCode=%s&nonStop=%b"
        , origin, destination, departureDate, adults, currency, nonStop) ;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody(); 
    }


}
