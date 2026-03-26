package com.example.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TicketControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getTeams_returnsListWithTicketCounts() throws Exception {
        mockMvc.perform(get("/api/tickets/teams"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].name").value("Backend"))
                .andExpect(jsonPath("$[0].ticketCount").value(2))
                .andExpect(jsonPath("$[1].name").value("Frontend"))
                .andExpect(jsonPath("$[1].ticketCount").value(1))
                .andExpect(jsonPath("$[2].name").value("DevOps"))
                .andExpect(jsonPath("$[2].ticketCount").value(1));
    }

    @Test
    public void getTeams_eachTeamHasTicketCountField() throws Exception {
        mockMvc.perform(get("/api/tickets/teams"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].ticketCount").exists())
                .andExpect(jsonPath("$[1].ticketCount").exists())
                .andExpect(jsonPath("$[2].ticketCount").exists());
    }
}
