---
on:
  issues:
    types: [opened]
  reaction: "eyes"

permissions:
  contents: read
  issues: read

safe-outputs:
  create-pull-request:
    title-prefix: "[issue-fix] "
    labels: [automated, issue-fix]
    draft: true
    protected-files: allowed
    github-token: ${{ secrets.COPILOT_GITHUB_TOKEN }}
  add-comment:
    max: 2
  add-labels:
    allowed: [in-progress, agent-working]
    max: 1
---

# Issue to Pull Request Agent

When a new issue is opened, analyze the issue and implement a fix or feature as described, then open a pull request with the changes.

## Instructions

1. Read the issue title and description carefully: "${{ steps.sanitized.outputs.text }}"
2. Understand the codebase by exploring the repository structure, relevant files, and existing patterns.
3. Plan the changes needed to address the issue.
4. Implement the changes following existing code conventions and patterns in the repository.
5. Create a pull request with:
   - A clear title referencing the issue number
   - A description explaining what was changed and why
   - A reference back to the original issue using "Closes #<issue_number>"

## Guidelines

- Follow existing code style and conventions in the repository
- Keep changes focused and minimal — only address what the issue describes
- Include appropriate tests if the project has a test suite
- Do not modify unrelated files
- If the issue is unclear or cannot be resolved with code changes, add a comment explaining why and what additional information is needed instead of creating a PR
