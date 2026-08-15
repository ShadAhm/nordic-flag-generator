# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A client-side web app (no backend) that lets a user design a Nordic-style cross flag (à la Sweden/Denmark/Norway/Finland/Iceland) by tweaking dimensions, colours, and cross proportions via a form, sees it rendered live as an SVG, and can download the result as an `.svg` file.

## Commands

```bash
npm install      # install dependencies
npm run dev       # start Vite dev server
npm run build     # type-check (tsc) then production build via Vite
npm run preview   # preview the production build
```

There is no test suite and no linter configured in this repo.

## Architecture

Everything is wired together imperatively in [src/main.ts](src/main.ts), which attaches DOM event listeners and re-renders the flag on any input change. There is no framework/reactivity layer — state lives in the DOM form itself, read fresh on every update.

The data flow on every change is:

1. **Read form → `InputFormModel`**: [FlagForm.getValues()](src/form/flag-form.ts) scrapes every `<input>` in the DOM (skipping unchecked radios) and maps them into an [InputFormModel](src/form/input-form-model.ts) via id-keyed lookups. [FormElements](src/form/form-elements.ts) holds cached `getElementById` references to every form control.
2. **Build domain objects**: [FlagColourBuilder](src/flag/flag-colour-builder.ts) and [FlagSpecBuilder](src/flag/flag-spec-builder.ts) are builders (`.withUserInputs(...)`, `.withTemplateName(...)`, `.withRatioTemplate(...)`, `.build()`) that turn either user input or a named country template (`sweden`/`denmark`/`norway`/`finland`/`iceland`, hardcoded as ratios/proportions in the builders) into a [FlagColour](src/flag/flag-colour.ts) and a [FlagSpec](src/flag/flag-spec.ts). `FlagSpec` stores everything as *proportions* (0–1 ratios of width/height), not pixels.
3. **Compute pixel geometry**: `new Flag().drawFromSpec(width, spec)` ([src/flag/flag.ts](src/flag/flag.ts)) converts the proportional `FlagSpec` into absolute pixel dimensions/positions for the outer cross and (optional) inner cross, given a target width. `.colourize(flagColour)` then attaches colours. `Flag` is the single object that has everything needed to paint.
4. **Paint**: [FlagDiagram.paint(flag)](src/diagram/flag-diagram.ts) pushes the computed `Flag` values onto the live SVG's attributes/styles (cached in [DiagramElements](src/diagram/diagram-elements.ts)), toggling the inner cross rects' `display` on/off.
5. **Sync form**: [FlagForm.setValues(flagColour, flagSpec, flag)](src/form/flag-form.ts) writes values back into the form (including paired range+number inputs, and re-checking the matching aspect-ratio/has-innercross radio buttons) so the UI reflects the just-applied state — important after a template button click, since template values differ from whatever was previously in the sliders.

Three entry points in `main.ts` drive this cycle: `useTemplate` (template button clicked → colours+spec from template), `updateFlagRatioFromButton` (aspect-ratio radio clicked → spec's ratio overridden by template ratio, rest from current form), and `updateFlagFromInput` (any other input change → everything from current form).

[FlagRatio](src/flag/flag-ratio.ts) is a static lookup between named country aspect ratios and numbers (with float-tolerant comparison), used to figure out which aspect-ratio radio should be checked for a given custom ratio.

### Adding a new country template

Add a case to both `FlagColourBuilder.withTemplate` ([src/flag/flag-colour-builder.ts](src/flag/flag-colour-builder.ts)) and `FlagSpecBuilder.withTemplateName` ([src/flag/flag-spec-builder.ts](src/flag/flag-spec-builder.ts)), a named ratio entry in `FlagRatio.namedRatios` ([src/flag/flag-ratio.ts](src/flag/flag-ratio.ts)), and the corresponding template button + aspect-ratio radio markup in [index.html](index.html) (with matching `id`s picked up by [FormElements](src/form/form-elements.ts)).

### Conventions

- Form control ids follow `flag-<field>` for the range/colour/radio input and `flag-<field>-number` for its paired readonly numeric display; both must stay in sync manually (there's no two-way binding).
- All proportions/spec fields are fractions (0–1) of flag width or height, not pixels — pixel conversion only happens in `Flag.drawFromSpec`.
