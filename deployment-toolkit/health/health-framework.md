# Workspace Health Framework

Workspace health should be evaluated across separate categories.

## Infrastructure Health

Evaluates:
- VM reachability.
- System load.
- Memory pressure.
- Docker daemon status.
- Reverse proxy process status.

Healthy:
- Host reachable and core services running.

Degraded:
- High resource pressure or non-critical service warnings.

Critical:
- Host unreachable or Docker unavailable.

## Application Health

Evaluates:
- Container running state.
- HTTP response.
- Startup logs.
- Crash loops.
- App-specific readiness behavior.

Healthy:
- Selected app responds and is usable.

Degraded:
- App responds slowly or shows warnings.

Critical:
- App unavailable.

## GPU Health

Evaluates:
- GPU visibility.
- VRAM availability.
- Driver status.
- GPU temperature.
- GPU runtime access from containers.

Healthy:
- GPU visible and usable.

Degraded:
- High utilization or temperature.

Critical:
- GPU unavailable or driver failure.

## Storage Health

Evaluates:
- Disk usage.
- Inode usage.
- Model directory growth.
- Log growth.
- Backup destination availability.

Healthy:
- Disk usage below warning thresholds.

Degraded:
- Disk approaching capacity.

Critical:
- Disk full or persistent volume unavailable.

## Network Health

Evaluates:
- DNS resolution.
- Proxy routing.
- Firewall rules.
- TLS status.
- Provider network reachability.

Healthy:
- Customer routes resolve and proxy correctly.

Degraded:
- Increased latency or non-critical DNS warnings.

Critical:
- Customer routes unavailable.

## Customer Access Health

Evaluates:
- Browser access to each workspace URL.
- HTTPS trust.
- App route response.
- Access control behavior.

Healthy:
- Customer can open all enabled applications.

Degraded:
- One optional application unavailable.

Critical:
- Core workspace access unavailable.

