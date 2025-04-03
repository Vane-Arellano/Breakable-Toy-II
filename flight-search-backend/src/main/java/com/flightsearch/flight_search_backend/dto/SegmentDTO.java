package com.flightsearch.flight_search_backend.dto;

public class SegmentDTO {
    private LocationDTO departure; 
    private LocationDTO arrival; 
    private String carrierCode; 
    private String operationCarrierCode; 
    private String flightNumber; 
    private String aircraftCode;
    private FareDetailsDTO travelerFareDetailsDTO;

    public SegmentDTO(
        LocationDTO deperature, 
        LocationDTO arrival, 
        String carrierCode, 
        String operationCarrierCode, 
        String flightNumber, 
        String aircraftCode,
        FareDetailsDTO travelerFareDetailsDTO)
        {
        this.departure = deperature; 
        this.arrival = arrival; 
        this.carrierCode = carrierCode; 
        this.operationCarrierCode = operationCarrierCode; 
        this.flightNumber = flightNumber; 
        this.aircraftCode = aircraftCode;
        this.travelerFareDetailsDTO = travelerFareDetailsDTO;
    }

    public LocationDTO getDeparture() { return departure; }
    public void setDeparture(LocationDTO departure) { this.departure = departure; }


    public LocationDTO getArrival() { return arrival; }
    public void setArrival(LocationDTO arrival) { this.arrival = arrival; }

    public String getCarrierCode(){ return carrierCode; }
    public void setCarrierCode(String carrierCode ){ this.carrierCode = carrierCode; }

    public String getOperationCarrierCode(){ return operationCarrierCode; }
    public void setOperationCarrierCode(String operationCarrierCode ){ this.operationCarrierCode = operationCarrierCode; }

    public String getFlightNumber(){ return flightNumber; }
    public void setFlightNumber( String flightNumber ){ this.flightNumber = flightNumber; }

    public String getAircraftCode(){ return aircraftCode; }
    public void setAircraftCode(String aircraftCode){ this.aircraftCode = aircraftCode; }

    public FareDetailsDTO getTravelerFareDetailsDTO(){ return travelerFareDetailsDTO; }
    public void setTravelerFareDetailsDTO(FareDetailsDTO travelerFareDetailsDTO){ this.travelerFareDetailsDTO = travelerFareDetailsDTO; }
}