package com.flightsearch.flight_search_backend.service;

import org.springframework.stereotype.Service;

import io.github.cdimascio.dotenv.Dotenv;

@Service
public class EnvConfig {
    private final Dotenv dotenv;

    public EnvConfig() {
        this.dotenv = Dotenv.configure().load();
    }

    public String getApiTokenUrl() {
        return dotenv.get("API_TOKEN_URL");
    }

    public String getClientId() {
        return dotenv.get("API_CLIENT_ID");
    }

    public String getSecretKey() {
        return dotenv.get("API_SECRET_KEY");
    }

    
}
