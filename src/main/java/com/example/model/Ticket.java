package com.example.model;

public class Ticket {

    private final long id;
    private final String title;
    private final String status;
    private final long teamId;

    public Ticket(long id, String title, String status, long teamId) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.teamId = teamId;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getStatus() {
        return status;
    }

    public long getTeamId() {
        return teamId;
    }
}
