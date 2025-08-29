# Requirements - Contact Agenda Frontend

## 1. Functional Requirements

### Contacts

- **Complete CRUD operations** for contacts (Create, Read, Update, Delete)

- **Contact listing table** with the following columns:
  - Photo (avatar)
  - Name
  - Email
  - Phone
  - Favorite (toggle)
  - Status (Active/Inactive, soft delete)

- **Soft Delete**: Mark contacts as deleted (`isDeleted`) with restoration capability

- **Persistent favorite marking** with backend synchronization

- **Photo upload** for contacts

- **Search functionality** by name, email, or phone

- **Pagination and sorting** of records

- **Form validations**:
  - Name (required)
  - Email (valid format and unique)
  - Phone (required with input mask)

### User Management

- **User Settings Page** (`SettingsPage`)

- **Personal data updates**: name, email, password, profile photo

- **Profile photo upload**

- **Account deletion** with security confirmation

- **Automatic logout** after account deletion

---

## 2. Non-Functional Requirements

- **TypeScript** implementation throughout the frontend

- **Reusable and strongly typed components**

- **PrimeVue with Tailwind CSS** for UI components (DataTable, FileUpload, Button, Dialog, Toast)

- **Pinia** for global state management (`contactsStore`, `authStore`)

- **Vue Router** for navigation between screens (Contacts and Settings)

- **Backend communication** via Axios

- **Unit testing** with Vitest

- **Code quality** with ESLint + Prettier

- **Responsive and user-friendly layout** with visual feedback (toasts, confirmations)

- **Minimal usage documentation** in README

---

## 3. Differentials / Extras

- **Advanced componentization support** (reusable modals, forms, and tables)

- **Enhanced UX**: deletion confirmations, success/error toasts, circular avatars

- **Simulated backend integration** (mock) if backend is not ready

- **Preparation for future integration** with messaging or notifications
