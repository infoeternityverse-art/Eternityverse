# Workspace Deployment Workflow

This document defines the standard manual flow from a fresh Ubuntu GPU VM to a customer-ready Eternityverse workspace.

## Lifecycle Overview

```text
GPU VM leased
  -> Workspace template selected
  -> Deployment manifest prepared
  -> Host validated
  -> GPU runtime validated
  -> Docker runtime prepared
  -> Applications deployed
  -> Reverse proxy configured
  -> HTTPS verified
  -> Application health verified
  -> Customer access verified
  -> Workspace URLs recorded in Admin Dashboard
```

## Recommended Installation Order

1. Confirm provider VM details.
2. Validate host operating system and disk.
3. Validate GPU, driver, and VRAM.
4. Prepare standard workspace directory layout.
5. Prepare Docker and Docker Compose plugin.
6. Prepare NVIDIA container runtime.
7. Deploy selected template applications.
8. Configure persistent volumes.
9. Configure reverse proxy routes.
10. Verify HTTPS.
11. Validate application health.
12. Validate customer access.
13. Record final workspace metadata in Eternityverse Admin.

## Workspace Readiness Definition

A workspace is ready only when:

- GPU is available.
- Required VRAM is available.
- Docker runtime is healthy.
- Selected applications are running.
- Reverse proxy routes are active.
- HTTPS certificates are valid.
- Raw application ports are not publicly exposed.
- Persistent data paths are mounted and writable.
- Customer-facing URLs open in a browser.
- Admin has recorded workspace URLs in the Workspace module.

