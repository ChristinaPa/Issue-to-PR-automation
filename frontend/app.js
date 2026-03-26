const API_URL = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", () => {
  loadTeams();
  loadTickets();
  setupForm();
  setupFilters();
});

// --- Form Submission ---
function setupForm() {
  const form = document.getElementById("ticketForm");
  const description = document.getElementById("description");
  const charCount = document.getElementById("charCount");

  description.addEventListener("input", () => {
    charCount.textContent = description.value.length;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    hideMessage();

    const data = {
      title: document.getElementById("title").value,
      description: description.value,
      priority: document.getElementById("priority").value,
      category: document.getElementById("category").value,
      contactEmail: document.getElementById("contactEmail").value
    };

    try {
      const res = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        const details = result.details ? result.details.join(", ") : result.error;
        showMessage(details, "error");
        return;
      }

      const team = result.ticket.assignedTeam.name;
      const confidence = result.ticket.routing.confidence;
      showMessage(
        `Ticket #${result.ticket.id} created and routed to ${team} (${confidence} confidence)`,
        "success"
      );
      form.reset();
      charCount.textContent = "0";
      loadTickets();
    } catch {
      showMessage("Failed to connect to the server. Is the backend running?", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Ticket";
    }
  });
}

// --- Load Teams for Filter ---
async function loadTeams() {
  try {
    const res = await fetch(`${API_URL}/tickets/teams`);
    const teams = await res.json();
    const select = document.getElementById("filterTeam");
    teams.forEach(team => {
      const option = document.createElement("option");
      option.value = team.id;
      option.textContent = team.name;
      select.appendChild(option);
    });
  } catch {
    // Teams will just not appear in filter
  }
}

// --- Load Tickets ---
async function loadTickets() {
  const status = document.getElementById("filterStatus").value;
  const team = document.getElementById("filterTeam").value;

  let url = `${API_URL}/tickets?`;
  if (status) url += `status=${encodeURIComponent(status)}&`;
  if (team) url += `team=${encodeURIComponent(team)}&`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    renderTickets(data.tickets);
  } catch {
    document.getElementById("ticketList").innerHTML =
      '<p class="empty-state">Unable to load tickets. Is the backend running?</p>';
  }
}

// --- Render Tickets ---
function renderTickets(tickets) {
  const container = document.getElementById("ticketList");

  if (!tickets || tickets.length === 0) {
    container.innerHTML = '<p class="empty-state">No tickets found.</p>';
    return;
  }

  container.innerHTML = tickets.map(ticket => `
    <div class="ticket-item">
      <div class="ticket-item-header">
        <h3>${escapeHtml(ticket.title)}</h3>
        <span class="ticket-id">#${ticket.id}</span>
      </div>
      <p class="ticket-description">${escapeHtml(ticket.description)}</p>
      <div class="ticket-meta">
        <span class="badge badge-team">${escapeHtml(ticket.assignedTeam.name)}</span>
        <span class="badge badge-priority-${ticket.priority}">${ticket.priority}</span>
        <span class="badge badge-status-${ticket.status}">${ticket.status}</span>
        <span class="badge badge-confidence">${ticket.routing.confidence} confidence</span>
      </div>
      ${ticket.routing.matchedKeywords.length > 0
        ? `<p class="routing-info">Matched: ${ticket.routing.matchedKeywords.map(k => escapeHtml(k)).join(", ")}</p>`
        : ""}
    </div>
  `).join("");
}

// --- Filters ---
function setupFilters() {
  document.getElementById("filterStatus").addEventListener("change", loadTickets);
  document.getElementById("filterTeam").addEventListener("change", loadTickets);
  document.getElementById("refreshBtn").addEventListener("click", loadTickets);
}

// --- Messages ---
function showMessage(text, type) {
  const el = document.getElementById("formMessage");
  el.textContent = text;
  el.className = `message ${type}`;
}

function hideMessage() {
  const el = document.getElementById("formMessage");
  el.className = "message hidden";
}

// --- Security: escape HTML to prevent XSS ---
function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}
