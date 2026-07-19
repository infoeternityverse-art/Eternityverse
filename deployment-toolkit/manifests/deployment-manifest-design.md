# Deployment Manifest Design

The deployment manifest is the desired-state record for a workspace deployment.

It should be human-readable today and automation-friendly later.

## Conceptual Manifest Sections

### Identity

Purpose:
- Identify the workspace and customer context.

Fields:
- Workspace ID
- Customer ID or customer reference
- Customer display name
- Operator/admin
- Created date
- Deployment date

### Provider

Purpose:
- Capture where the GPU VM lives.

Fields:
- Provider name
- Provider instance ID
- Region
- Public IP or access endpoint
- Private IP if available
- GPU model
- GPU count
- VRAM

### Template

Purpose:
- Pin the intended deployment standard.

Fields:
- Template ID
- Template version
- Compatibility notes
- Upgrade channel

### Applications

Purpose:
- Define which apps should exist in the workspace.

Fields:
- Application key
- Application display name
- Enabled status
- Internal port
- Customer URL
- Health check policy
- Version

### Volumes

Purpose:
- Define persistent data layout.

Fields:
- Volume name
- Host path
- Mounted application
- Backup policy
- Retention policy
- Criticality

### Domains

Purpose:
- Define customer-facing routing.

Fields:
- Workspace base domain
- App subdomains
- TLS mode
- DNS status

### Reverse Proxy

Purpose:
- Define how traffic enters the workspace.

Fields:
- Proxy type
- Route map
- Upstream targets
- WebSocket requirements
- Auth mode
- Certificate status

### Secrets References

Purpose:
- Reference secrets without exposing secret values.

Fields:
- Secret name
- Secret purpose
- Storage location reference
- Rotation policy
- Owner

### Health Policies

Purpose:
- Define readiness and ongoing health checks.

Fields:
- Infrastructure health policy
- GPU health policy
- Application health policy
- Storage health policy
- Network health policy
- Customer access health policy

### Lifecycle State

Purpose:
- Track current deployment state.

Allowed states:
- requested
- planning
- preparing
- installing
- configuring
- validating
- running
- updating
- maintenance
- recovery
- expired
- failed
- archived

### Version Information

Purpose:
- Track what is deployed.

Fields:
- Deployment toolkit version
- Template version
- App versions
- Reverse proxy config version
- Last update date
- Last validated date

