# Configuration Standards

Configuration should be predictable, separated by responsibility, and safe for future automation.

## Configuration Classes

### Non-secret Workspace Configuration

Examples:
- Workspace ID.
- Template ID and version.
- Enabled applications.
- Internal ports.
- Customer URLs.
- Volume paths.

Recommended location:
- Workspace config directory on the GPU VM.
- Workspace manifest in this toolkit convention.

### Secrets

Examples:
- Application passwords.
- Jupyter tokens.
- Reverse proxy auth credentials.
- Future gateway credentials.

Rules:
- Never store secret values in public documentation.
- Never expose secrets in customer dashboard unless deliberately designed.
- Reference secrets by name or location.
- Restrict file permissions.
- Exclude secrets from logs.

### Ports

Rules:
- App ports should be internal only.
- Customer access should use HTTPS proxy routes.
- Raw app ports should not be exposed publicly.

### Domains

Preferred format:

```text
https://app-name.workspace-id.workspace.eternityverse.com
```

Subdomains are preferred over path prefixes because AI tools often behave better at domain root.

### Reverse Proxy

Proxy configuration should define:
- App route.
- Upstream app target.
- HTTPS policy.
- WebSocket support.
- Timeout behavior.
- Upload size behavior.
- Optional access policy.

