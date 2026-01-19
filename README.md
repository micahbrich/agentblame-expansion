# agentblame design mockups

Design exercise exploring expanded views for [mesa-dot-dev/agentblame](https://github.com/mesa-dot-dev/agentblame) — a Chrome extension that surfaces AI-generated code attribution on GitHub PRs.

## What This Is

Static mockups that visualize how agentblame could expand beyond PR summaries into GitHub's Insights pages. Three views:

<img width="1822" height="1180" alt="Screenshot 2026-01-19 at 11 33 22" src="https://github.com/user-attachments/assets/a3959076-36bd-4ef1-bd2a-bb60ff353ddf" />

### `/pr` — Pull Request Summary

Expands the existing PR summary banner with:
- AI vs human line attribution
- Provider/model breakdown (Cursor, Claude Code, etc.)
- Security-sensitive file alerts
- Duplicate code detection
- Complexity hotspots
- Convention drift warnings
- Error handling review flags

<img width="1822" height="1180" alt="Screenshot 2026-01-19 at 11 33 25" src="https://github.com/user-attachments/assets/a648f03d-8a50-42f7-a9e4-62ddd0b1efc6" />

### `/pulse` — Repository Insights

Injects into GitHub's Pulse page:
- AI adoption trends over time
- Tool usage breakdown by provider
- Repo-wide AI contribution stats

<img width="1822" height="1180" alt="Screenshot 2026-01-19 at 11 33 29" src="https://github.com/user-attachments/assets/00dc580e-ed16-4553-8fe7-85741ecc66f3" />

### `/contributors` — Personal AI Fingerprint

Per-contributor view showing:
- AI usage badges per developer
- Activity heatmap (when AI code was written)
- Code quality metrics
- Survivability panel (how much AI code persists vs gets modified/deleted)

## Design Philosophy

**Actionable insights, not surveillance.**

- Consider AI contributions as a positive, not something to fear
- Aggregate repo trends, not individual performance metrics
- Focus on code health signals over "AI usage scores"

## Running

```bash
pnpm install
pnpm run dev
```

Open [localhost:3000](http://localhost:3000).
