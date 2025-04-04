package com.flightsearch.flight_search_backend.service;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AmadeusConnect {

    @Autowired
    RestTemplate restTemplate;
    EnvConfig envConfig = new EnvConfig();

    public AmadeusConnect(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getAccessToken() {
        String tokenUrl = envConfig.getApiTokenUrl();
        String clientId = envConfig.getClientId();
        String secretKey = envConfig.getSecretKey();

        // Prepare the body for OAuth2 request
        String body = String.format("grant_type=client_credentials&client_id=%s&client_secret=%s", clientId, secretKey);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, requestEntity, Map.class);

        Map<String, Object> responseBody = response.getBody();
        String accessToken = (String) responseBody.get("access_token");

        return accessToken;
    }


}
