# MVP Release Checklist

## Visitor Flow

- Browse home page.
- Browse GPU marketplace.
- Search, filter, sort, and paginate GPU packages.
- Open GPU details.
- Submit enquiry.
- Confirm redirect to thank-you page.

## Admin Flow

- Log in through `/admin/login`.
- Review pending enquiries.
- Move enquiry to in review, approved, or rejected.
- Add admin notes and customer-visible notes.
- Create and update GPU packages.
- Publish or unpublish packages.
- Set availability.
- Issue credentials.
- Revoke credentials.
- Review audit logs.

## Customer Flow

- Register or log in.
- Open dashboard home.
- Review recent enquiries and active credentials.
- Search and filter enquiries.
- Open enquiry details.
- Reveal, copy, and download credentials.
- Update profile.
- Change password.

## Access Control

- Anonymous users cannot access `/dashboard`.
- Anonymous users cannot access `/admin`.
- Customers cannot access `/admin`.
- Admins cannot access `/dashboard`.
- Customer APIs only return the current customer records.
- Admin APIs reject customer tokens.

## Final Gates

- Formatting passes.
- Lint passes.
- Production build passes.
- Backend route import check passes.
- Environment variables are configured.
- Backup and rollback procedures are documented.
