# Operational Runbook Outlines

These are structured outlines for admins. They are not scripts or implementation instructions.

## New Workspace Provisioning

Objective:
- Prepare a fresh GPU VM as a customer-ready Eternityverse workspace.

Inputs:
- Customer.
- Provider.
- GPU VM details.
- Selected template.
- Workspace ID.
- Domain plan.

Phases:
1. Confirm provider lease.
2. Prepare deployment manifest.
3. Validate host.
4. Validate GPU.
5. Prepare runtime.
6. Deploy template apps.
7. Configure reverse proxy.
8. Validate HTTPS.
9. Validate apps.
10. Validate customer access.
11. Record workspace URLs in Admin Dashboard.

Completion criteria:
- Workspace passes validation and customer URLs are active.

## Application Update

Objective:
- Update one application without rebuilding the whole workspace.

Phases:
1. Identify target app and current version.
2. Review compatibility.
3. Capture pre-update backup or restore point.
4. Update target app only.
5. Validate app health.
6. Validate customer route.
7. Record update history.

Rollback trigger:
- App fails health check or customer URL fails.

## Workspace Upgrade

Objective:
- Move a workspace from one template version to another.

Phases:
1. Review template compatibility.
2. Identify breaking changes.
3. Notify relevant stakeholders.
4. Capture backup.
5. Apply upgrade.
6. Validate all apps.
7. Update manifest version.
8. Record upgrade history.

## Workspace Backup

Objective:
- Preserve critical customer data and configuration.

Phases:
1. Identify critical volumes.
2. Include config and metadata.
3. Include customer-generated data.
4. Include models only when required.
5. Store backup locally as staging.
6. Copy to remote backup destination.
7. Verify backup integrity.

## Workspace Restore

Objective:
- Restore a workspace from a backup.

Phases:
1. Confirm restore target.
2. Stop affected applications.
3. Restore configuration.
4. Restore volumes.
5. Restore model data if included.
6. Restart applications.
7. Validate health.
8. Validate customer access.

## Workspace Decommission

Objective:
- Safely retire a workspace.

Phases:
1. Confirm workspace is expired or approved for removal.
2. Disable customer access.
3. Capture final backup if required.
4. Remove app routes.
5. Stop application containers.
6. Apply retention policy.
7. Release provider resources.
8. Mark workspace archived.

## Workspace Recovery

Objective:
- Restore service after failure.

Phases:
1. Identify failure category.
2. Assess severity.
3. Preserve logs.
4. Apply recovery playbook.
5. Validate health.
6. Validate customer access.
7. Record recovery action.

