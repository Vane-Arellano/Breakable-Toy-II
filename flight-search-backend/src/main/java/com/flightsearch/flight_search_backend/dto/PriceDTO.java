package com.flightsearch.flight_search_backend.dto;

import java.util.ArrayList;
import java.util.List;

public class PriceDTO {
    private String currency; 
    private String base; 
    private String grandTotal; 
    private List<FeesDTO> fees = new  ArrayList<>(); ;

    
    public PriceDTO(String currency, String base, String grandTotal, List<FeesDTO> fees) {
        this.currency = currency;
        this.base = base;
        this.grandTotal = grandTotal;
        this.fees = fees;
    }

    public PriceDTO(String currency, String base, String grandTotal) {
        this.currency = currency;
        this.base = base;
        this.grandTotal = grandTotal;
    }
    
    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    public String getBase() {
        return base;
    }
    public void setBase(String base) {
        this.base = base;
    }
    public String getGrandTotal() {
        return grandTotal;
    }
    public void setGrandTotal(String grandTotal) {
        this.grandTotal = grandTotal;
    }
    public List<FeesDTO> getFees() {
        return fees;
    }
    public void setFees(List<FeesDTO> fees) {
        this.fees = fees;
    } 
    
    
}
