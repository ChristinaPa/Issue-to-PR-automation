# Issue-to-PR Automation

Automatically assign newly opened GitHub issues to an AI coding agent that analyzes the issue, implements a fix, and opens a draft pull request — powered by [GitHub Agentic Workflows](https://github.github.com/gh-aw/).

## How It Works

```
New Issue Opened → AI Agent Reads Issue → Explores Codebase → Implements Fix → Opens Draft PR
```

1. A new issue is created in the repository
2. The workflow triggers automatically and reacts with 👀 to acknowledge it
3. The AI coding agent (GitHub Copilot) reads the issue title and description
4. It explores the repository to understand the codebase structure and conventions
5. It implements the necessary changes to address the issue
6. A draft pull request is created with a reference back to the original issue

## Repository Structure

```
.github/
├── agents/
│   └── ms-learn-coder.agent.md    # Custom Copilot agent with Microsoft Learn integration
├── aw/
│   └── actions-lock.json          # Pinned action versions for reproducibility
└── workflows/
    ├── issue-to-pr.md             # Agentic workflow definition (natural language)
    └── issue-to-pr.lock.yml       # Compiled GitHub Actions workflow (auto-generated)
```

## Workflow Details

The core workflow is defined in `.github/workflows/issue-to-pr.md` using natural language markdown:

| Setting | Value |
|---|---|
| **Trigger** | New issue opened |
| **Engine** | GitHub Copilot (default) |
| **Reaction** | 👀 on triggering issue |
| **PR Style** | Draft, prefixed with `[issue-fix]` |
| **Labels** | `automated`, `issue-fix` |
| **Protected Files** | Allowed (agent can modify `pom.xml`, `.github/`, etc.) |
| **Secret** | `COPILOT_GITHUB_TOKEN` |

### Safe Outputs

The workflow uses [safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/) to ensure the AI agent operates securely:

- **`create-pull-request`** — Opens a draft PR with the implemented fix
- **`add-comment`** — Posts up to 2 comments on the issue (progress updates or clarification requests)
- **`add-labels`** — Labels the issue `in-progress` or `agent-working`

## Custom Agent: Microsoft Learn Coder

The repository includes a custom Copilot agent (`.github/agents/ms-learn-coder.agent.md`) that can be integrated into the workflow to augment the AI with [Microsoft Learn](https://learn.microsoft.com) documentation via MCP (Model Context Protocol).

When enabled, the agent:
- Searches Microsoft Learn for relevant documentation, API references, and best practices
- Cross-references official docs with existing codebase patterns
- Cites relevant Microsoft Learn articles in PR descriptions

This is useful when issues involve Azure services, .NET, Java, or any Microsoft technology stack.

## Setup

### Prerequisites

- A GitHub repository with [GitHub Actions](https://docs.github.com/en/actions) enabled
- [GitHub CLI](https://cli.github.com/) installed (`gh --version` ≥ 2.0.0)
- A [GitHub Copilot](https://github.com/features/copilot) subscription

### Step 1: Install the GitHub Agentic Workflows CLI Extension

```bash
gh extension install github/gh-aw
```

### Step 2: Configure the Repository Secret

Go to **Settings → Secrets and variables → Actions** and add:

| Secret Name | Description |
|---|---|
| `COPILOT_GITHUB_TOKEN` | A GitHub token with Copilot access. See [authentication docs](https://github.github.com/gh-aw/reference/auth/#copilot_github_token) for details. |

### Step 3: Add the Workflow Files

Copy the workflow files to your repository:

```
.github/workflows/issue-to-pr.md
.github/workflows/issue-to-pr.lock.yml
```

Or compile from source:

```bash
gh aw compile
```

### Step 4: Commit and Push

```bash
git add .github/
git commit -m "Add issue-to-PR agentic workflow"
git push
```

## Usage

1. **Open an issue** in your repository describing a bug fix, feature, or improvement
2. The workflow triggers automatically — look for the 👀 reaction
3. Wait a few minutes for the AI agent to analyze and implement
4. **Review the draft PR** that gets created
5. Merge if the changes look good, or request modifications

### Tips for Better Results

- Write clear, specific issue descriptions with context
- Include expected behavior and steps to reproduce (for bugs)
- Reference specific files or components when possible
- The agent works best with well-scoped, focused issues

## Built With

- [GitHub Agentic Workflows](https://github.github.com/gh-aw/) — Repository automation with AI coding agents
- [GitHub Copilot](https://github.com/features/copilot) — AI coding engine
- [GitHub Actions](https://github.com/features/actions) — CI/CD and workflow execution

## Resources

- [GitHub Agentic Workflows Documentation](https://github.github.com/gh-aw/)
- [Creating Agentic Workflows](https://github.github.com/gh-aw/setup/creating-workflows/)
- [IssueOps Pattern](https://github.github.com/gh-aw/patterns/issue-ops/)
- [Safe Outputs Reference](https://github.github.com/gh-aw/reference/safe-outputs/)
- [AI Engines Reference](https://github.github.com/gh-aw/reference/engines/)

## License

This project is provided as-is for experimentation with GitHub Agentic Workflows.
