package com.example.model;

public class Team {

    private final long id;
    private final String name;
    private long ticketCount;

    public Team(long id, String name) {
        this.id = id;
        this.name = name;
        this.ticketCount = 0;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public long getTicketCount() {
        return ticketCount;
    }

    public void setTicketCount(long ticketCount) {
        this.ticketCount = ticketCount;
    }
}
