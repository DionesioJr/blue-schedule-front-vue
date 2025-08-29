# Git Commit Guidelines

This document defines **rules and best practices for Git commits** in the Contact Agenda project, ensuring clarity, organization, and traceability.

---

## 1️⃣ Commit Structure

Use short, clear, and descriptive commit messages in the format:

```
<type>: <short description>
```

### Recommended commit types:

- `feat:` → new feature or enhancement
- `fix:` → bug fix
- `refactor:` → code refactoring without changing behavior
- `docs:` → documentation changes
- `test:` → adding or updating tests
- `chore:` → maintenance tasks (e.g., build configuration, linter)

**Examples:**

```
feat: add pagination and filter to contacts table
fix: correct email validation in ContactForm
refactor: reorganize store and TypeScript types
docs: update README with setup instructions
```

---

## 2️⃣ Best Practices

- Each commit should contain **a single logical change**. Avoid mixing multiple features.
- Write messages in **English consistently**.
- Use **imperative mood** (`add`, `fix`, `refactor`).
- Avoid generic messages like `update` or `test`.
- Always **stage only the changes that should be included**: `git add file1 file2`.

---

## 3️⃣ Branches and Commits

- **main:** commits only from merges of stable releases.
- **develop:** commits integrating ongoing features.
- **feature/feature-name:** incremental, small, and clear commits focused on a single feature.
- **release/x.x.x:** commits for final adjustments before delivery.

---

## 4️⃣ Recommended Initial Commits

1. `Initial commit – Setup Vue 3 + TypeScript + PrimeVue + Pinia`
2. `feat: create basic contacts CRUD`
3. `feat: add favorites and photo upload`
4. `feat: implement soft delete and contact restoration`
5. `feat: create user settings page`
6. `test: add Vitest unit tests`
7. `refactor: UX/UI and validation improvements`

---

## 5️⃣ Tags

- For each stable release, use **Git tags** in the format `vX.Y.Z` (e.g., `v1.0.0`).
- Include **release notes** describing the main features.

---

This document ensures **consistent commits**, facilitates code review, and maintains an organized history for future deliveries.
