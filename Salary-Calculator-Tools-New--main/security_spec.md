# Security Specification - Salary Calculator Leads

## Data Invariants
- A lead must have a valid email address.
- A lead name must have a userType from the allowed set.
- A lead must have an action describing what they did.
- Timestamps must be recorded.
- Optional fields (phoneNumber, companyName, hiringStatus) must be validated for type and size if present.
- Leads are public-create but private-read (Admin only).

## The "Dirty Dozen" Payloads (Designed to Fail)

1. **Identity Spoofing**: Attempt to set a custom field like `isAdmin: true`.
2. **Key Injection**: Adding a field not in the schema (e.g., `hack: "detected"`).
3. **Invalid Email**: `email: "not-an-email"`.
4. **Invalid UserType**: `userType: "Hacker"`.
5. **Oversized Action**: `action` string length > 100.
6. **Oversized PhoneNumber**: `phoneNumber` string length > 50.
7. **Oversized CompanyName**: `companyName` string length > 150.
8. **Missing Required Field**: No `userType`.
9. **Wrong Type**: `email` is a list/number instead of string.
10. **Unauthorized Read**: Authenticated non-admin user trying to list leads.
11. **Unauthorized Delete**: Authenticated non-admin user trying to delete a lead.
12. **Unauthorized Update**: Authenticated non-admin user trying to modify a lead.

## The Test Plan
Verify that `allow create` works for valid payloads and `PERMISSION_DENIED` for the dozen above.
Ensure `allow read, write` (update/delete) are restricted to the specific admins.
