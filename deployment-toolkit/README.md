# Eternityverse Deployment Toolkit

Internal operations handbook for standardized manual GPU workspace provisioning.

This toolkit is not part of the customer-facing React application, Express API, or MongoDB data model. It defines reusable deployment conventions, validation standards, runbook outlines, and manifest structure for admins preparing GPU workspaces from providers such as Vast.ai, RunPod, and TensorDock.

## Folder Structure

```text
deployment-toolkit/
  docs/
  templates/
  manifests/
  configs/
  validation/
  health/
  checklists/
  operations/
  recovery/
  examples/
```

## Folder Purposes

### docs

Purpose: High-level architecture and operating principles for the deployment toolkit.

Contents:
- Deployment workflow standards.
- Directory conventions.
- Security rules.
- Operational readiness definitions.

Admin usage:
- Read before preparing a workspace.
- Use as the source of truth for expected manual workflow.

Future automation usage:
- Converts directly into deployment engine requirements, planner behavior, and agent responsibilities.

### templates

Purpose: Versioned workspace template registry.

Contents:
- AI Development template.
- Image Generation template.
- LLM Chat template.
- Template compatibility and deprecation standards.

Admin usage:
- Choose the correct template before provisioning.
- Confirm minimum GPU, VRAM, storage, operating system, health checks, and app set.

Future automation usage:
- Backend deployment planner can load these definitions as machine-readable templates later.

### manifests

Purpose: Defines the standard deployment manifest shape.

Contents:
- Workspace identity fields.
- Provider and GPU metadata.
- Applications.
- Volumes.
- Domains.
- Reverse proxy.
- Secrets references.
- Health policies.
- Lifecycle state.
- Version information.

Admin usage:
- Fill or review a manifest for every workspace.
- Keep workspace state consistent across providers.

Future automation usage:
- Becomes the desired-state document consumed by a deployment runner or workspace agent.

### configs

Purpose: Documents configuration management conventions.

Contents:
- Environment configuration rules.
- Secret handling standards.
- Port and domain conventions.
- Reverse proxy configuration expectations.

Admin usage:
- Know where settings should live and what must not be exposed.

Future automation usage:
- Config generator can create runtime files from these standards.

### validation

Purpose: Standard validation checklists before workspace activation.

Contents:
- Host validation.
- GPU validation.
- Docker validation.
- Networking validation.
- Reverse proxy validation.
- HTTPS validation.
- Application validation.
- Customer access validation.

Admin usage:
- Complete these checks before marking a workspace ready.

Future automation usage:
- Validation engine can implement each check as an automated gate.

### health

Purpose: Defines ongoing health categories and status interpretation.

Contents:
- Infrastructure health.
- Application health.
- GPU health.
- Storage health.
- Network health.
- Customer access health.

Admin usage:
- Triage degraded or failed workspaces consistently.

Future automation usage:
- Workspace agent can report these categories to the platform.

### checklists

Purpose: Human-friendly operational checklists for repeated tasks.

Contents:
- Workspace readiness checklist.
- Pre-update checklist.
- Pre-decommission checklist.

Admin usage:
- Use during live operations to avoid missed steps.

Future automation usage:
- Checklist items become deployment gates and workflow tasks.

### operations

Purpose: Runbook outlines for normal operations.

Contents:
- New workspace provisioning.
- Application update.
- Workspace upgrade.
- Backup.
- Restore.
- Decommission.

Admin usage:
- Follow a consistent procedure for standard operations.

Future automation usage:
- Runbooks map to orchestrated workflows.

### recovery

Purpose: Recovery playbooks for failure scenarios.

Contents:
- Application crash.
- Deployment failure.
- GPU unavailable.
- Disk full.
- Configuration corruption.
- Reverse proxy failure.

Admin usage:
- Quickly identify severity and restore service.

Future automation usage:
- Recovery manager can automate safe restart, rollback, and escalation decisions.

### examples

Purpose: Non-executable examples that show how completed planning artifacts should look.

Contents:
- Example workspace manifest.
- Example template selection notes.
- Example validation summary.

Admin usage:
- Reference when preparing real workspace records.

Future automation usage:
- Test fixtures for future manifest parsing and planner validation.

## Core Operating Principles

- Customer-facing app ports must not be publicly exposed.
- Customers should access workspaces through HTTPS reverse proxy URLs.
- Docker containers should hold disposable app runtime; persistent customer data must live in mounted workspace directories.
- Secrets must be referenced, not pasted into manifests.
- Every workspace should be tied to a template ID and template version.
- Every workspace should pass validation before customer access is enabled.
- Manual steps today should map to future automated deployment states.

