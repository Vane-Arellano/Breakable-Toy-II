package com.flightsearch.flight_search_backend.dto;

import java.util.List;

public class FlightOfferDTO {
    private String id; 
    private String departureDateTime; 
    private String arrivalDateTime; 
    private String departureAirport;
    private String arrivalAirport;
    private String airlineCode; 
    private String operatingAirlineCode; 
    private String flightDuration; 
    private List<StopDTO> stops; 
    private PriceDTO price; 
    private PriceDTO pricePerTraveler;

    public FlightOfferDTO(String id, String departureDatTime, String arrivalDateTime, String departureAirport,
            String arrivalAirport, String airlineCode, String operatingAirlineCode, String flightDuration,
            List<StopDTO> stops, PriceDTO price, PriceDTO pricePerTraveler) {
        this.id = id;
        this.departureDateTime = departureDatTime;
        this.arrivalDateTime = arrivalDateTime;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.airlineCode = airlineCode;
        this.operatingAirlineCode = operatingAirlineCode;
        this.flightDuration = flightDuration;
        this.stops = stops;
        this.price = price;
        this.pricePerTraveler = pricePerTraveler;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getDepartureDatTime() {
        return departureDateTime;
    }
    public void setDepartureDatTime(String departureDatTime) {
        this.departureDateTime = departureDatTime;
    }

    public String getArrivalDateTime() {
        return arrivalDateTime;
    }
    public void setArrivalDateTime(String arrivalDateTime) {
        this.arrivalDateTime = arrivalDateTime;
    }

    public String getDepartureAirport() {
        return departureAirport;
    }
    public void setDepartureAirport(String departureAirport) {
        this.departureAirport = departureAirport;
    }

    public String getArrivalAirport() {
        return arrivalAirport;
    }
    public void setArrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public String getAirlineCode() {
        return airlineCode;
    }
    public void setAirlineCode(String airlineCode) {
        this.airlineCode = airlineCode;
    }

    public String getOperatingAirlineCode() {
        return operatingAirlineCode;
    }
    public void setOperatingAirlineCode(String operatingAirlineCode) {
        this.operatingAirlineCode = operatingAirlineCode;
    }

    public String getFlightDuration() {
        return flightDuration;
    }
    public void setFlightDuration(String flightDuration) {
        this.flightDuration = flightDuration;
    }

    public List<StopDTO> getStops() {
        return stops;
    }
    public void setStops(List<StopDTO> stops) {
        this.stops = stops;
    }

    public PriceDTO getTotalPrice() {
        return price;
    }
    public void setTotalPrice(PriceDTO price) {
        this.price = price;
    }

    public PriceDTO getPricePerTraveler() {
        return pricePerTraveler;
    }
    public void setPricePerTraveler(PriceDTO pricePerTraveler) {
        this.pricePerTraveler = pricePerTraveler;
    } 



}
