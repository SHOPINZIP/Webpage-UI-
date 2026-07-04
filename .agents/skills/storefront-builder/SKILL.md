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

## Component File Checklist

Single-variant section (most common for a new section type — e.g. `MinimalTimelineBenefitsSection/`, `LeadFormSection/`):
```
src/components/<Name>Section/
  <ComponentName>.tsx   - default export, props: { section, appearance, theme }
  types.ts              - <ComponentName>Props, <Name>SectionDoc, <Name>Settings, block prop types
  index.ts              - `export { default } from "./<ComponentName>"` + `export type {...} from "./types"`
  index.scss            - actual CSS rules (BEM, prefix `ak-<short-name>__`), not a partial-forwarding file
```
Multi-variant section (e.g. `MessageStyleTestimonialsSection/`) additionally has a `variants/` subfolder, a dispatcher `<Name>.tsx` that switches on `section.variant`/a style prop, `shared.ts` for constants/pure helpers, and `hooks.ts` if it needs its own local hook (this codebase duplicates small hooks like `usePrefersReducedMotion` per-section rather than sharing one — follow that convention, don't introduce a new shared hooks file).

Wiring a new component in:
- `src/index.tsx` — add `export { default as <ComponentName> } from "./components/<Name>Section";` plus a `export type {...} from "./components/<Name>Section";` block, in the same position/style as neighboring exports.
- `src/styles/index.scss` — add `@use "../components/<Name>Section/index" as <name>;` (or point at the dispatcher file directly for multi-variant sections, matching how `MessageStyleTestimonialsSection` does it via its own forwarding `index.scss`).

## Global style compatibility — the practical rule

Every section component takes `{ section, appearance, theme }` — `appearance` is already resolved by the caller (`DynamicDomainRenderer` in `Project-Web`, or the editor's `preview.js` wrapper in `areakart-frontend`) via `resolveSectionAppearance(section, theme)`. Apply it with `style={sectionAppearanceStyle(appearance)}` on the outermost element for background, and `resolveTextStyle`/`resolveBlockGroupTextStyle` + `resolvedTextStyleToInlineStyle` for any labeled text field/block-group.

**Don't invent a bespoke default palette** (e.g. assuming a dark backdrop) unless the section is guaranteed a section-level `appearance` override — `SECTION_TYPE_APPEARANCE_DEFAULTS` in `shared/sectionAppearance.ts` is effectively dead code in the common case because `normalizeTheme()` always fills in a non-empty background (`#ffffff`), which beats the per-type default in `resolveSectionAppearance`'s priority order. Pick `defaultStyle` values for `resolveTextStyle` calls that look correct against the actual default background (`#ffffff`) — dark heading (`#111111`), gray body (`#444444`) — matching `DEFAULT_TYPOGRAPHY` in `sectionTypography.ts`, so the component looks right with zero configuration and still fully respects a merchant's custom global theme when one is set.

## No networking in this package — ever

This package must stay pure/presentational: no `fetch`, no `axios`, no data-fetching of any kind, even for a section that legitimately needs live external data (e.g. `lead_form` optionally rendering a linked Form Builder form's fields). When a component needs data the section JSON doesn't carry:
- Accept the already-fetched data as a prop (e.g. `formBuilderSchema`), plus `loading`/`error` state props, and render from those — don't fetch it yourself even "just this once."
- Accept any submit/mutation as an injected callback prop (e.g. `onSubmitDynamicForm`) that the component calls and awaits; never hardcode an endpoint or base URL inside this package.
- Each consumer (`areakart-frontend`'s `preview.js` wrapper, and — since `Project-Web` only maps types to components — a small wrapper component registered in its `domainSectionRegistry.js` instead of the raw import from `@shopinzip/webpage-ui`) does its own fetching with its own existing API layer, then passes the results down as props. Type-only contracts for the data shape (e.g. `shared/publicFormTypes.ts`) are fine to define and export here — just no functions that call out over the network.

## Sections that link a Form Builder form — reusable hook + per-section design

A section can let the admin link an existing Form Builder form (`areakart-frontend`'s `src/formbuilder/**`) and render/submit through it (established by `lead_form`/`ServiceInquiryForm`). The split that keeps this reusable and duplication-free:

- **Data-shape types are shared**: `shared/publicFormTypes.ts` — `PublicFormField`, `PublicFormSchema`, `PublicFormSubmitBody`, etc. Type-only, no functions (per the no-networking rule below), importable by any section.
- **State/validation/submit logic is shared**: `shared/formBuilder/useDynamicFormBuilderState.ts` — a hook holding field values, honeypot, required-field validation, and the submit lifecycle (`idle/loading/success/error`). It only needs `schema` and `onSubmitDynamicForm` (both host-supplied) — it has zero knowledge of any specific section's fields/design. **Any section that ever links a Form Builder form reuses this exact hook** — never re-implement this logic per section or per layout.
- **Visual field design stays local per section**: each section owns its own `fieldPrimitives.tsx` (icons, input/select/textarea markup, its own CSS class namespace) and its own `variants/<Name>Layout.tsx` components that consume the hook's returned state via props and render however that section wants. This is the "just change the input design" boundary — a new section, or a new layout within an existing section, only ever touches this layer.
- **The section's top-level component is a shell + layout switch**: it renders the section's own chrome (header, showcase, whatever), calls the shared hook **once, unconditionally** (a `formLayoutStyle`-style prop must not gate the hook call itself — that would violate the rules of hooks), then hands the hook's result to whichever `variants/` component matches. Adding a new layout = one new file in `variants/` + one new case in that switch. Nothing about fetching, validation, or submit changes.
- **Still zero networking** (see the rule above) — the top-level component accepts `formBuilderSchema`/`formBuilderLoading`/`formBuilderError`/`onSubmitDynamicForm` as props; the host app's wrapper component (`preview.js` in `areakart-frontend`, a small wrapper registered in `Project-Web`'s `domainSectionRegistry.js`) does the actual `getPublicForm`/`submitPublicForm` calls and passes results down.

## Inline text-style gotcha: strip `fontSize` unless you want the global default controlling size

`resolveTextStyle(...)` always resolves a `fontSize` — falling back to the global system default (e.g. 18px body / 48px heading) when nothing overrides it — and `resolvedTextStyleToInlineStyle` puts it in the `style` object. Applied inline, that **always** wins over CSS class rules regardless of specificity, silently overriding intentional CSS sizing (small uppercase eyebrow pills, responsive `clamp()` headings) with the wrong fixed size. If your component's CSS already owns sizing for an element, strip `fontSize` before applying the resolved style — keep only `fontFamily`/`color`/`fontWeight` theme-driven:
```ts
function textColorStyle(resolved: ReturnType<typeof resolvedTextStyleToInlineStyle>) {
  const { fontFamily, color, fontWeight } = resolved;
  return { fontFamily, color, fontWeight };
}
```

## Controlled-input gotcha: never `.trim()` a live `value` prop

Any text/textarea `input` bound to state as `value={someHelper(v)}` must NOT trim while typing — if `someHelper` calls `.trim()`, a trailing space (typed constantly, between every two words) gets stripped the instant React re-renders the controlled value back into the DOM, making it look like the spacebar does nothing. Symptom: users report "can't add spaces" in text fields. Fix: keep a separate non-trimming coercion (e.g. `String(value ?? "")`, no `.trim()`) for anything bound to a live `value=`/`onChange` pair; only trim when building the actual submit payload (that's a one-time read, not a re-render loop, so trimming there is correct and doesn't affect typing). See `StandardFieldsLayout.tsx`'s `inputValue()` vs. the hook's submit-time trimming in `useDynamicFormBuilderState.ts`.

## framer-motion v6 gotcha

`package.json` pins `framer-motion` at `^6.5.1`. `AnimatePresence` in this version does **not** support `mode="wait"` — use the v6-native `exitBeforeEnter` boolean prop instead. Using `mode="wait"` builds fine with plain `tsup` JS output but fails the DTS build step (`TS2322: Property 'mode' does not exist on type AnimatePresenceProps`) — always verify with `npx tsup` (not just eslint/a JS bundler) after adding exit animations.

## Build & verify

```
npx tsup                                                              # JS (cjs) + dist/index.d.ts
npx sass src/styles/index.scss:dist/styles.css --no-source-map --style=compressed   # dist/styles.css
npx tsc --noEmit                                                      # full project type-check
```
After building, confirm the rebuild actually reached both consumers rather than assuming it did:
- `areakart-frontend`: `ls -i` on `Webpage-UI-/dist/index.js` and `areakart-frontend/node_modules/@shopinzip/webpage-ui/dist/index.js` — matching inode numbers confirm the hardlink survived the rebuild.
- `Project-Web`: `node_modules/@shopinzip/` should be a symlink (`ls -la`) resolving back to this repo via the global yarn link — always live, no rebuild-propagation check needed.

To sanity-check a new component's actual resolved appearance/output without a running dev server, `require()` the built `dist/index.js` directly (CJS) and either call `resolveSectionAppearance` on mock section/theme data, or `ReactDOMServer.renderToStaticMarkup(...)` the component and inspect the emitted inline `style` attributes — this catches appearance/priority bugs that are easy to miss by only reading source.
