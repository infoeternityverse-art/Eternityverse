# Workspace Readiness Checklist

Use this checklist before marking a workspace ready for customer use.

## Host

- Supported Ubuntu version confirmed.
- Disk capacity meets template requirement.
- Standard workspace directories exist.
- File permissions verified.
- SSH restricted to admin access.

## GPU

- GPU detected.
- VRAM meets template minimum.
- NVIDIA driver available.
- GPU runtime works with containers.

## Docker

- Docker engine healthy.
- Docker Compose plugin available.
- NVIDIA container runtime configured.
- Workspace application containers running.

## Networking

- DNS routes configured.
- Raw application ports blocked publicly.
- Firewall allows only approved inbound ports.
- Provider firewall matches host firewall.

## Reverse Proxy and HTTPS

- Reverse proxy running.
- Each enabled app has a route.
- HTTPS certificate valid.
- HTTP redirects to HTTPS where applicable.
- Customer URLs open without browser certificate warnings.

## Applications

- Each selected app responds.
- Persistent volumes writable.
- Logs reviewed for startup failures.
- GPU-dependent apps can use GPU.

## Customer Access

- Customer does not need SSH.
- Dashboard URLs are accurate.
- Secrets are not exposed.
- Workspace status is ready to mark running.

