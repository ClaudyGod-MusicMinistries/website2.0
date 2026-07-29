# Frontend architecture

Keep shared code small and predictable. Reuse an existing component when it already expresses the same layout or behaviour; create a new abstraction only after a pattern repeats.

## Page structure

Public pages should use these layers:

1. `PageHero` for the page title and one short supporting sentence.
2. `Section` for background and vertical spacing.
3. `Container` for horizontal width and gutters.
4. `SectionHeading` for an eyebrow, title, short description, or action.
5. `Grid`, `Card`, and `ContentState` for content, surfaces, and loading/empty/error states.

Do not recreate container widths, section spacing, heading scales, card shadows, or status panels inside individual pages.

## Forms

Use `FormField`, `FormGrid`, `FormLabel`, `FormHint`, `FormError`, `FormCheckbox`, and the shared control classes. Public POST routes must validate input before proxying it upstream.

## Language

- Prefer familiar labels: “Email address”, “Contact number”, “Country”.
- Keep headings short and specific.
- Use one sentence of supporting text only when it helps the user act.
- Avoid internal terminology, exaggerated marketing language, and repeated explanations.
- Never collect a field that is discarded by the API.
