package com.flightsearch.flight_search_backend.dto;

public class FeesDTO {
    private String amount; 
    private String type;

    public FeesDTO(String amount, String type){
        this.amount = amount; 
        this.type = type;
    }

      public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
