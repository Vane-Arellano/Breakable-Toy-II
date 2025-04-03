package com.flightsearch.flight_search_backend.dto;

public class RoundFlightDTO {
    private FlightOfferDTO departureFlight;
    private FlightOfferDTO returnFlight;
    
    public RoundFlightDTO(FlightOfferDTO departureFlight, FlightOfferDTO returnFlight) {
        this.departureFlight = departureFlight;
        this.returnFlight = returnFlight;
    }
    public FlightOfferDTO getDepartureFlight() {
        return departureFlight;
    }
    public void setDepartureFlight(FlightOfferDTO departureFlight) {
        this.departureFlight = departureFlight;
    }
    public FlightOfferDTO getReturnFlight() {
        return returnFlight;
    }
    public void setReturnFlight(FlightOfferDTO returnFlight) {
        this.returnFlight = returnFlight;
    }

    
}
