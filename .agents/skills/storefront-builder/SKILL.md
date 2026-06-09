# Areakart Storefront Builder

Description: Use this skill when adding or modifying storefront builder sections, variants, schemas, UI components, preview logic, or `Project-Web` renderer mappings.

## Repo Focus

This repo owns the reusable section and variant components that both the editor preview and the live storefront renderer consume.

## Core Model

- Section type is stable.
- Variant controls UI.
- Schema drives editor behavior.
- Blocks are repeatable data.
- Normalize handles defaults, legacy safety, ids, and minimum blocks.
- `Project-Web` only maps and renders.

## Workflow

1. Identify whether the task is a new section or a new variant.
2. Confirm the stable section type and variant name before editing files.
3. Update editor schema, block schema, defaults, normalization, preview, and JSON safety in `areakart-frontend` when required by the task.
4. Update reusable UI components, props, and exports in `Webpage-UI-`.
5. Update `Project-Web` resolver mapping when a new type and variant combination must render live.
6. Validate preview, saved JSON compatibility, renderer mapping, multiple-instance safety, unique ids, and global style compatibility.

## Do

- Keep UI components reusable, prop-driven, and preview-safe.
- Convert hardcoded content into section props and repeatable blocks.
- Use the existing global style, color, and font system for every new section unless section-specific fields are explicitly requested.
- Keep safe fallback styles inside the component so legacy or partial data fails gracefully.
- Keep animations lightweight and compatible with multiple section instances.

## Do Not

- Do not add editor schema or normalization logic to this repo.
- Do not add renderer resolver logic to this repo.
- Do not hardcode storefront content inside reusable components.
- Do not duplicate saved JSON solely for marquee or ticker animation.
- Do not create duplicate per-section color or font systems unless explicitly requested.

## Section-Specific Rules

- Marquee or ticker sections must stay lightweight. Avoid ResizeObserver loops, DOM measuring loops, huge duplicated arrays, and heavy state updates. If there is only one item, duplicate only in render logic.
- Video sections should default autoplay to muted, use `playsInline`, handle autoplay failure safely, and hide empty video grids gracefully.
- Scroll or sticky hero sections should preserve intended scroll behavior and section height, and use optimized scroll handling when needed.
- Footer-only background or color options may exist, but they must not leak into other sections or override the shared global style system.
