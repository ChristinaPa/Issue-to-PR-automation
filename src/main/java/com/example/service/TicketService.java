package com.example.service;

import com.example.model.Team;
import com.example.model.Ticket;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final List<Team> teams;
    private final List<Ticket> tickets;

    public TicketService() {
        teams = new ArrayList<>();
        teams.add(new Team(1, "Backend"));
        teams.add(new Team(2, "Frontend"));
        teams.add(new Team(3, "DevOps"));

        tickets = new ArrayList<>();
        tickets.add(new Ticket(1, "Fix login bug", "open", 1));
        tickets.add(new Ticket(2, "Update API docs", "open", 1));
        tickets.add(new Ticket(3, "Deploy to staging", "closed", 1));
        tickets.add(new Ticket(4, "Redesign dashboard", "open", 2));
        tickets.add(new Ticket(5, "Fix CSS layout", "closed", 2));
        tickets.add(new Ticket(6, "Set up CI pipeline", "open", 3));
    }

    public List<Team> getTeamsWithTicketCounts() {
        Map<Long, Long> openTicketCountByTeam = tickets.stream()
                .filter(t -> "open".equalsIgnoreCase(t.getStatus()))
                .collect(Collectors.groupingBy(Ticket::getTeamId, Collectors.counting()));

        return teams.stream().map(team -> {
            Team result = new Team(team.getId(), team.getName());
            result.setTicketCount(openTicketCountByTeam.getOrDefault(team.getId(), 0L));
            return result;
        }).collect(Collectors.toList());
    }
}
