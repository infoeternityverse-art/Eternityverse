# Validation Standards

Every workspace must pass validation before customer access is enabled.

Severity levels:

- Critical: workspace must not be activated.
- High: workspace should not be activated without admin approval.
- Medium: workspace can run, but issue should be tracked.
- Low: informational or cleanup item.

## Host Validation

Required checks:
- Supported Ubuntu version.
- Sufficient disk capacity.
- Standard workspace directories exist.
- Correct file permissions.
- System clock/timezone reasonable.
- Admin-only SSH posture.

Expected result:
- Host is stable and ready for runtime installation.

Failure severity:
- Unsupported OS: Critical.
- Low disk: High.
- Missing directory: High.
- Incorrect permissions: High.

## GPU Validation

Required checks:
- GPU detected.
- NVIDIA driver loaded.
- VRAM meets template minimum.
- GPU is available to container runtime.
- GPU temperature and utilization are reasonable at baseline.

Expected result:
- GPU can be used by selected applications.

Failure severity:
- GPU not detected: Critical.
- VRAM below template minimum: Critical.
- Driver mismatch: Critical.
- High baseline GPU utilization: High.

## Docker Validation

Required checks:
- Docker engine healthy.
- Docker Compose plugin available.
- NVIDIA container runtime configured.
- Workspace network available.
- Containers can access GPU where required.

Expected result:
- Containerized apps can run with GPU support.

Failure severity:
- Docker unavailable: Critical.
- NVIDIA runtime unavailable: Critical.
- Compose unavailable: High.

## Networking Validation

Required checks:
- Public DNS resolves.
- Internal app ports are not publicly exposed.
- Firewall allows only approved inbound access.
- Provider firewall aligns with host firewall.
- SSH is restricted.

Expected result:
- Customer traffic enters only through approved HTTPS routes.

Failure severity:
- Raw app ports public: Critical.
- SSH unrestricted: High.
- DNS missing: High.

## Reverse Proxy Validation

Required checks:
- Proxy service is running.
- Each enabled app has a route.
- Upstream targets are reachable.
- WebSocket support works where required.
- Timeouts and upload limits match app needs.

Expected result:
- Proxy routes customer requests to healthy internal apps.

Failure severity:
- Proxy down: Critical.
- Missing app route: High.
- WebSocket failure for required app: High.

## HTTPS Validation

Required checks:
- Valid certificate.
- Trusted certificate chain.
- HTTP redirects to HTTPS.
- No browser security warnings.

Expected result:
- Customer URLs are secure and browser-trusted.

Failure severity:
- Invalid certificate: Critical.
- No HTTPS: Critical.
- Redirect missing: Medium.

## Application Validation

Required checks:
- Container running.
- Application responds on internal port.
- Application responds through public route.
- Persistent directories are writable.
- App logs do not show startup failure.

Expected result:
- Each selected application is usable.

Failure severity:
- Core app down: Critical.
- Optional app down: High.
- Minor log warning: Low.

## Customer Access Validation

Required checks:
- Dashboard workspace URLs match proxy routes.
- Each app opens in a browser.
- Customer does not need SSH.
- Passwords/secrets are not exposed.
- Access is limited to intended routes.

Expected result:
- Customer can use workspace apps securely from the dashboard.

Failure severity:
- Customer URL unusable: Critical.
- Secret exposed: Critical.
- Requires SSH: High.

