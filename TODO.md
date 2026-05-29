# TODO

## Enrollment code role-hardening (Option B)
- [x] Add `src/lib/courseEnrollmentPrefixes.ts` with course title → prefix mapping.
- [x] Update `src/app/register/actions.ts` to enforce:
  - letters prefix (A-Z) + digits suffix (5–10 digits)
  - prefix must match one of the 12 allowed course prefixes
  - enrollment code must still exist in `courses.enrollment_code`

- [ ] (Next) Update UI hint/placeholder if needed to match new format (e.g. EI12345).
- [ ] (Next) Add server-side defense-in-depth to block `/register` if a logged-in user is not a student.

## Supabase data + testing
- [ ] Create `.env.local` with Supabase URL + anon key.
- [ ] Update `courses.enrollment_code` in Supabase to match the required formats:
  - Electrical Installation → EI12345
  - Solar PV Installation → SP12345
  - Plumbing → P12345
  - Cosmetology → C12345
  - Fashion Design → FD12345
  - Regenerative Agriculture → RA12345
  - Core Agriculture → CA12345
  - Reproductive Health → RH12345
  - ICT → ICT12345
  - Basic Digital Literacy → DL12345
  - Entrepreneurship → E12345
  - Beadwork → B12345
- [ ] Create admin + teacher auth users and insert `profiles.role` for portal testing.
- [ ] Register a student via `/register` and verify dashboard routing + progress pages.

