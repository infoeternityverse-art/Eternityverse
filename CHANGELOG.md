# Changelog

## 0.1.0 - Phase 1 MVP QA Hardening

- Added route-level lazy loading for public, auth, customer, and admin pages.
- Added backend rate limiting and Mongo operator sanitization middleware.
- Added credential secret encryption for new credential writes.
- Added immediate frontend session clearing on API `401` responses.
- Tightened customer route guard role isolation.
- Improved query retry behavior for authorization and not-found failures.
- Added Escape-key and focus restoration support to Modal and Drawer.
- Added audit log recording for admin package, enquiry, and credential write actions.
- Added API documentation, deployment checklist, and MVP release checklist.
