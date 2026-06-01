# Confidentiality Check

Use this skill before publishing, deploying, committing, or sharing portfolio changes, and before any change that touches AYK-related work, project descriptions, screenshots, documents, visuals, data, or source code.

Purpose:
Prevent exposure of confidential AYK data, real customer data, internal source code, private documents, file paths, credentials, proprietary screenshots, or sensitive implementation details.

Check for:
- Customer names, vessel names, private partner names, or identifiable commercial details.
- Internal AYK documents, screenshots, dashboards, source code, architecture diagrams, logs, file paths, or ticket references.
- Credentials, tokens, keys, database URLs, API secrets, private endpoints, or local network details.
- Exact internal metrics, battery performance values, test results, failure rates, pricing, or production quantities not already public.
- Proprietary algorithms, unpublished design decisions, internal tooling details, or confidential workflows.
- Personal data beyond intended public contact and portfolio information.

Allowed style:
- Sanitized summaries.
- Abstracted engineering workflows.
- Public research citations and public profile links.
- High-level descriptions of skills, tools, responsibilities, impact areas, and lessons learned.
- Original diagrams that explain concepts without revealing internal systems.

Workflow:
- Search changed files for secrets and sensitive terms before finalizing.
- Review any new visual asset names, alt text, metadata, and embedded text.
- If a detail feels even slightly private, generalize it or remove it.
- Prefer saying "marine battery diagnostics" or "engineering analytics workflows" over internal product names or project code names.
- Update `CHANGELOG.md` and `TASKS.md` only with sanitized summaries.
