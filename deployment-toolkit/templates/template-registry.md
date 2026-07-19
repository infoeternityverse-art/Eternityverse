# Workspace Template Registry

Templates standardize which applications, resources, routing, and health checks are expected for each workspace type.

## Template Versioning

Template format:

```text
template-id@major.minor.patch
```

Examples:

```text
ai-development@1.0.0
image-generation@1.0.0
llm-chat@1.0.0
```

Version policy:
- Patch versions: safe fixes and health check tuning.
- Minor versions: app version changes or optional app additions.
- Major versions: breaking path, volume, routing, or compatibility changes.

Existing workspaces should stay pinned to their deployed template version until an admin performs an explicit upgrade.

## Template: AI Development

Template ID: `ai-development`

Initial version: `1.0.0`

Supported applications:
- JupyterLab
- code-server
- Ollama
- Open WebUI

Minimum GPU:
- NVIDIA GPU with CUDA-compatible driver.

Minimum VRAM:
- 16GB.

Recommended storage:
- 150GB or more.

Reverse proxy requirement:
- Required for JupyterLab, code-server, and Open WebUI.
- Ollama should remain internal unless explicitly routed through a protected interface.

Health checks:
- Host health.
- GPU availability.
- JupyterLab HTTP health.
- code-server HTTP health.
- Ollama model runtime health.
- Open WebUI HTTP health.
- Customer URL checks.

Supported operating systems:
- Ubuntu 22.04 LTS.
- Ubuntu 24.04 LTS after validation.

Intended customers:
- AI engineers.
- ML researchers.
- Developers building prototypes.

Advantages:
- Browser-based development.
- Notebook workflows.
- Local LLM runtime.
- Chat UI for model testing.

## Template: Image Generation

Template ID: `image-generation`

Initial version: `1.0.0`

Supported applications:
- ComfyUI
- JupyterLab
- code-server

Minimum GPU:
- NVIDIA GPU with strong CUDA support.

Minimum VRAM:
- 12GB minimum.
- 24GB recommended for heavier workflows.

Recommended storage:
- 200GB or more because models and outputs can grow quickly.

Reverse proxy requirement:
- Required for ComfyUI, JupyterLab, and code-server.

Health checks:
- ComfyUI HTTP health.
- WebSocket route check if applicable.
- Model directory availability.
- Output directory write check.
- GPU availability.
- Customer URL checks.

Supported operating systems:
- Ubuntu 22.04 LTS.
- Ubuntu 24.04 LTS after validation.

Intended customers:
- AI artists.
- Designers.
- Agencies.
- Image generation workflow builders.

Advantages:
- Fast visual workflow access.
- Clear model and output separation.
- Useful for SDXL, Flux, and custom workflow experimentation.

## Template: LLM Chat

Template ID: `llm-chat`

Initial version: `1.0.0`

Supported applications:
- Ollama
- Open WebUI
- JupyterLab

Minimum GPU:
- NVIDIA GPU with CUDA-compatible driver.

Minimum VRAM:
- 16GB minimum.
- 24GB or more recommended for larger models.

Recommended storage:
- 150GB or more.

Reverse proxy requirement:
- Required for Open WebUI and JupyterLab.
- Ollama should stay internal unless access is protected.

Health checks:
- Ollama runtime health.
- Open WebUI HTTP health.
- JupyterLab HTTP health.
- Model storage check.
- GPU availability.
- Customer URL checks.

Supported operating systems:
- Ubuntu 22.04 LTS.
- Ubuntu 24.04 LTS after validation.

Intended customers:
- Teams testing open-source LLMs.
- Prompt engineers.
- Internal assistant builders.

Advantages:
- Clean browser-first chat experience.
- Private model runtime.
- Good base for future retrieval and app integration workflows.

