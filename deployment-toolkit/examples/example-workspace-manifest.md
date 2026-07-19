# Example Workspace Manifest

This is a conceptual, non-executable example.

## Identity

- Workspace ID: `ws-example-001`
- Customer: `Example Customer`
- Operator: `Admin User`
- Deployment date: `YYYY-MM-DD`

## Provider

- Provider: `RunPod`
- Provider Instance ID: `provider-instance-placeholder`
- Region: `Example Region`
- GPU Model: `NVIDIA RTX 4090`
- VRAM: `24GB`

## Template

- Template ID: `image-generation`
- Template Version: `1.0.0`

## Applications

- ComfyUI
- JupyterLab
- code-server

## Volumes

- Models volume.
- ComfyUI workflow/output volume.
- Jupyter notebooks volume.
- code-server user data volume.

## Domains

- ComfyUI URL: `https://comfyui.ws-example-001.workspace.eternityverse.com`
- JupyterLab URL: `https://jupyter.ws-example-001.workspace.eternityverse.com`
- code-server URL: `https://code.ws-example-001.workspace.eternityverse.com`

## Reverse Proxy

- Proxy type: `Caddy or Nginx`
- HTTPS: `Required`
- Raw app ports public: `No`

## Secrets References

- Reverse proxy auth secret reference.
- Jupyter token reference if applicable.
- Application admin credential references if applicable.

## Health Policies

- Host health required.
- GPU health required.
- Application health required.
- HTTPS validation required.
- Customer access validation required.

## Lifecycle State

- Current state: `running`

## Version Information

- Deployment toolkit version: `manual-v1`
- Last validated date: `YYYY-MM-DD`

