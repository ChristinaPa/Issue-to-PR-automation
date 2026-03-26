function validateTicket(req, res, next) {
  const { title, description, priority } = req.body;

  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length < 5) {
    errors.push("Title is required and must be at least 5 characters");
  }
  if (title && title.length > 200) {
    errors.push("Title must be 200 characters or less");
  }

  if (!description || typeof description !== "string" || description.trim().length < 10) {
    errors.push("Description is required and must be at least 10 characters");
  }
  if (description && description.length > 5000) {
    errors.push("Description must be 5000 characters or less");
  }

  const validPriorities = ["low", "medium", "high", "critical"];
  if (priority && !validPriorities.includes(priority)) {
    errors.push(`Priority must be one of: ${validPriorities.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Validation failed", details: errors });
  }

  // Sanitize inputs
  req.body.title = title.trim();
  req.body.description = description.trim();
  req.body.priority = priority || "medium";
  req.body.category = req.body.category || "";

  next();
}

module.exports = { validateTicket };
