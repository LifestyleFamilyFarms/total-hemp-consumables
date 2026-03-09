# Agent Dispatch Hub

Use this folder as the single source of truth for active agent prompts.

## Why this exists
- Avoid losing prompts in chat history.
- Keep one active prompt per agent role.
- Make handoffs reproducible with stable file paths.

## Structure
- `dispatch-index.md` -> current queue, owners, status, and prompt paths.
- `active/*.md` -> the actual prompt files agents should run.
- `archive/` -> completed/replaced prompts (optional; add as needed).

## How to run
1. Open `dispatch-index.md`.
2. Pick the row with `Status: Ready`.
3. Copy prompt from the linked `active/*.md` file.
4. Give that exact prompt to the assigned domain agent.
5. After response, update status and evidence links in `dispatch-index.md`.

## Rules
- Keep prompts role-specific (match `docs/agent-roster.md` lane ownership).
- Include mandatory documentation intake gate in every prompt.
- Include validation commands and deliverable format in every prompt.
- Do not run work from stale prompts; mark replaced prompts clearly.

