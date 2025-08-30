# Blue Contacts - Contact Management Application

## Overview

Blue Contacts is a modern contact management application built with Vue 3, TypeScript, and Vite. It provides a complete contact management solution with advanced features like favorites, photo uploads, soft delete functionality, user settings management, and intelligent API integration with caching strategies.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Documentation](#documentation)
- [Local Development](#local-development)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [CI/CD & Code Quality](#cicd--code-quality)
- [Versioning](#versioning)
- [Contributing](#contributing)
- [About](#about)

## Features

**Contact Management**

- Complete CRUD operations for contacts (Create, Read, Update, Delete)
- Contact listing with photo, name, email, phone, favorite status, and active status
- Soft Delete: mark contacts as deleted with restoration capability
- Persistent favorite marking with backend sync
- Photo upload for contacts
- Search functionality by name, email, or phone
- Pagination and sorting of records
- Form validation (required name, valid unique email, required phone with mask)

**User Management**

- User Settings page for account management
- Personal data updates: name, email, password, profile photo
- Profile photo upload
- Account deletion with security confirmation
- Automatic logout after account deletion

**Technical Features**

- TypeScript implementation throughout the frontend
- Reusable and strongly typed components
- PrimeVue UI components with Tailwind CSS integration
- Global state management with Pinia
- SPA navigation with Vue Router
- Backend communication via Axios with interceptors
- Smart caching strategy for performance optimization
- Automatic token management and refresh
- Responsive and user-friendly layout
- Visual feedback (toasts, confirmations)
- Type-safe API integration with complete CRUD operations

## Tech Stack

- **Vue.js 3:** Progressive JavaScript framework for building user interfaces
- **TypeScript:** Strongly typed language for safer, maintainable code
- **Vite:** Fast build tool and development server
- **PrimeVue:** Rich UI component library integrated with Tailwind CSS
- **Tailwind CSS:** Utility-first CSS framework for custom styling and PrimeVue theming
- **Pinia:** Vue.js state management library with smart caching
- **Vue Router:** Official router for Vue.js applications
- **Axios:** HTTP client with automatic token management and interceptors
- **Vitest:** Fast unit testing framework (planned)

## Documentation

Detailed documentation is available in the `docs/` directory:

- **[Requirements](docs/requirements.md)** - Complete functional and non-functional requirements
- **[Release Plan](docs/release-plan.md)** - Development roadmap and delivery planning
- **[Git Commit Guidelines](docs/git-commit-guidelines.md)** - Commit standards and best practices
- **[API Implementation](docs/api-implementation.md)** - Complete services and stores documentation

## Local Development

### Prerequisites

- Node.js v18.x or higher
- npm or yarn package manager

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot reload |
| `npm run build`        | Build application for production         |
| `npm run preview`      | Preview production build locally         |
| `npm run lint`         | Lint and fix code (ESLint + auto-fix)    |
| `npm run lint:check`   | Check code quality without auto-fix      |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting without changes    |
| `npm run type-check`   | Run TypeScript type checking             |

## Project Structure

```
blue-schedule/
├── .git/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
├── commitlint.config.js
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── .env.local (optional)
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── images/
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── assets/
│   │   ├── css/
│   │   │   ├── base.css
│   │   │   └── variables.css
│   │   ├── images/
│   │   └── fonts/
│   ├── components/
│   │   ├── common/
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseInput.vue
│   │   │   └── BaseModal.vue
│   │   ├── layout/
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   └── Sidebar.vue
│   │   └── ui/
│   │       ├── ContactTable.vue
│   │       ├── ContactForm.vue
│   │       └── ContactDialog.vue
│   ├── views/
│   │   ├── ContactsPage.vue
│   │   ├── SettingsPage.vue
│   │   └── auth/
│   │       ├── Login.vue
│   │       └── Register.vue
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   ├── index.ts
│   │   ├── contacts.ts
│   │   └── auth.ts
│   ├── composables/
│   │   ├── useAuth.ts
│   │   ├── useContacts.ts
│   │   └── useApi.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── constants.ts
│   │   └── validators.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   └── contacts.service.ts
│   ├── types/
│   │   ├── contact.ts
│   │   └── user.ts
│   └── plugins/
├── tests/
│   ├── unit/
│   └── e2e/
├── docs/
│   ├── requirements.md
│   ├── release-plan.md
│   └── git-commit-guidelines.md
└── dist/
```

## Environment Variables

This frontend application connects to external REST APIs. If needed, you can create a `.env.local` file for environment-specific configuration:

### Required `.env.local` (for API endpoints)

```env
# Development
VITE_APP_NAME="Blue Contacts"
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:5000

# Production API (when available)
# VITE_API_BASE_URL=https://your-api-domain.com
```

> - Environment variables are optional since this is a frontend-only application
> - API endpoints will be configured in the service layer
> - Never commit `.env.local` files to version control

---

## CI/CD & Code Quality

This project implements modern development practices with automated quality enforcement:

- **Pre-commit Hooks:** Husky automatically runs quality checks before each commit
- **Linting:** ESLint with Vue 3 + TypeScript support for code analysis
- **Formatting:** Prettier for consistent code style across the project
- **Commit Messages:** Commitlint validates conventional commit format
- **Type Checking:** TypeScript strict mode with vue-tsc
- **Lint-staged:** Runs quality tools only on staged files for faster commits
- **Testing:** Unit tests with Vitest (planned)
- **GitHub Actions:** CI/CD pipelines for linting, building, and testing (planned)

### Automated Quality Checks

Every commit automatically triggers:

1. **ESLint** - Code quality and syntax checking
2. **Prettier** - Code formatting and style consistency
3. **Commitlint** - Validates commit message format (e.g., `feat:`, `fix:`)

### Manual Quality Commands

```bash
# Lint and fix code automatically
npm run lint

# Check linting without fixing
npm run lint:check

# Format all code files
npm run format

# Check formatting without changes
npm run format:check

# Run TypeScript type checking
npm run type-check
```

### Commit Message Format

Use conventional commits for consistent history:

- `feat: add new contact form component`
- `fix: resolve email validation issue`
- `docs: update README with setup instructions`
- `style: format code with prettier`
- `refactor: reorganize store modules`

---

## Versioning

This project uses Git tags for version management following semantic versioning:

### Current Releases

```
v0.1.0   Initial setup - Vue 3 + TypeScript + PrimeVue + Tailwind + Husky
v0.2.0   API integration - Services, Stores, Types, and complete backend communication
v0.3.0   Contact CRUD with smart caching and optimistic updates
v0.4.0   User settings, photo upload, and authentication flow (planned)
v1.0.0   First stable release (planned)
```

### Release Process

1. Complete feature development on feature branch
2. Merge to `develop` branch
3. Create release branch: `release/vX.Y.Z`
4. Final testing and documentation updates
5. Merge to `main` and tag: `git tag vX.Y.Z`
6. Deploy to production

---

## Contributing

This project follows structured development practices:

1. **Branch Strategy**: Use feature branches for development, integrate via develop branch
2. **Commit Standards**: Follow the guidelines in [Git Commit Guidelines](docs/git-commit-guidelines.md)
3. **Code Quality**: TypeScript, ESLint, and Prettier for consistent code
4. **Testing**: Unit tests with Vitest (planned)
5. **Documentation**: Keep documentation updated with changes

For detailed development workflow, refer to the [Release Plan](docs/release-plan.md).

---

## About

This project is developed for **Blue Technology** - [bluetechnology.com.br](https://bluetechnology.com.br/)

Blue Technology is a leading technology company focused on delivering innovative digital solutions and modern web applications.
