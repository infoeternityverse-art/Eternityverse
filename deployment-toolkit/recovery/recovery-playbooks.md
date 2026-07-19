# Recovery Playbooks

## Application Crash

Symptoms:
- App container stopped.
- Customer app URL fails.
- App is crash looping.

Severity:
- Critical if core app is unavailable.
- High if optional app is unavailable.

Recovery strategy:
- Inspect app health category.
- Restart target app.
- Check persistent volume permissions.
- Recreate app runtime from template if needed.
- Roll back recent update if crash followed update.
- Record recovery action.

## Deployment Failure

Symptoms:
- Workspace cannot reach running state.
- Validation fails.
- Apps or proxy never become healthy.

Severity:
- Critical.

Recovery strategy:
- Identify failed lifecycle phase.
- Preserve deployment logs.
- Retry only idempotent steps.
- Restore generated configuration from last known-good state.
- Move workspace to recovery, maintenance, or failed.

## GPU Unavailable

Symptoms:
- GPU not detected.
- GPU runtime unavailable in containers.
- Apps report CUDA errors.

Severity:
- Critical for GPU-dependent templates.

Recovery strategy:
- Validate provider GPU allocation.
- Validate driver/runtime.
- Restart GPU-dependent services if appropriate.
- Escalate to provider or manually reprovision if hardware is unavailable.

## Disk Full

Symptoms:
- Apps fail writes.
- Containers crash.
- Model downloads fail.
- Logs grow rapidly.

Severity:
- High or Critical depending on impact.

Recovery strategy:
- Identify largest directories.
- Rotate logs.
- Remove temporary outputs.
- Remove unused images.
- Expand storage if possible.
- Restore app health.

## Configuration Corruption

Symptoms:
- Proxy routes broken.
- Apps start with wrong settings.
- Expected volumes or ports do not match manifest.

Severity:
- High or Critical.

Recovery strategy:
- Regenerate configuration from manifest and template.
- Restore last known-good config.
- Revalidate proxy and apps.
- Record drift and correction.

## Reverse Proxy Failure

Symptoms:
- Apps run internally but customer URLs fail.
- TLS errors.
- Route mismatch.

Severity:
- Critical.

Recovery strategy:
- Validate proxy service.
- Validate routes.
- Validate certificates.
- Restore last known-good proxy config.
- Revalidate customer access.

