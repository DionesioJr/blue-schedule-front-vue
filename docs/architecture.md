# Page/View/Component Architecture

## Overview

The project uses a layered architecture based on the **Page/View/Component** pattern, where each layer has well-defined responsibilities for organization, maintainability, and code scalability.

## Layer Structure

### PAGES

**Location:** `src/pages/`

**Characteristics:**

- Map directly to application URLs/routes
- Entry point for each screen
- Generally "thin" (lightweight)
- Represent specific application routes/URLs

**Layout Responsibilities:**

- Define base page layout (header, footer, sidebar)
- Configure meta tags (title, description, SEO)
- Establish main screen structure
- Import and render corresponding View
- Manage conditional layouts (e.g., with/without sidebar for different routes)

**Example:**

```vue
<!-- pages/HomePage.vue -->
<template>
  <div>
    <HomeView />
  </div>
</template>

<script setup lang="ts">
import HomeView from '../views/Home.vue'
</script>
```

### VIEWS

**Location:** `src/views/`

**Characteristics:**

- Contain presentation logic and page state
- Manage local state and side effects
- Orchestrate multiple components

**Layout Responsibilities:**

- Organize screen sections (grid, flexbox, positioning)
- Define component arrangement on the page
- Control screen-specific responsiveness
- Manage states that affect layout (loading, empty states, errors)
- Coordinate communication between child components

**Example:**

```vue
<!-- views/Home.vue -->
<template>
  <div class="min-h-screen bg-surface-50">
    <AppHeader />
    <HeroSection />
    <FeaturesSection />
    <TechnologySection />
    <CTASection />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import HeroSection from '../components/ui/HeroSection.vue'
// ...other imports
</script>
```

### COMPONENTS

**Location:** `src/components/`

**Characteristics:**

- Highly reusable
- Focused on a single responsibility
- Receive props for customization

**Layout Responsibilities:**

- Own internal layout (don't depend on external context)
- Isolated and well-defined styles
- Visual variations through props
- Internal component responsiveness
- Visual states (hover, active, disabled)

**Example:**

```vue
<!-- components/common/FeatureCard.vue -->
<template>
  <div
    class="bg-white rounded-2xl p-8 border border-surface-200 hover:border-primary-200 transition-all duration-200 hover:shadow-lg group"
  >
    <div
      :class="`w-14 h-14 bg-gradient-to-r ${iconColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`"
    >
      <i :class="`pi ${icon} text-white text-xl`"></i>
    </div>
    <h3 class="text-xl font-bold text-surface-900 mb-3">{{ title }}</h3>
    <p class="text-surface-600 leading-relaxed">{{ description }}</p>
  </div>
</template>
```

## Responsibility Hierarchy

```
Page (Macro Layout)
├── Defines global structure
├── Headers, Footers, Navigation
└── View (Meso Layout)
    ├── Organizes screen sections
    ├── Grid/Flex layouts
    └── Components (Micro Layout)
        ├── Own internal layout
        └── Isolated styles
```

## Directory Organization

```
src/
├── pages/              # Application routes
│   ├── HomePage.vue
│   └── LoginPage.vue
├── views/              # Presentation logic
│   ├── Home.vue
│   └── Login.vue
├── components/         # Reusable components
│   ├── layout/        # Layout components (Header, Footer)
│   ├── ui/            # Interface components (Sections)
│   └── common/        # Common components (Cards, Buttons)
├── stores/            # State management (Pinia)
├── services/          # API communication layer
├── rules/             # Business validation rules
├── composables/       # Reusable composition functions
├── router/            # Route configuration
└── utils/             # Utilities
```

## Data Flow Architecture

The application follows a unidirectional data flow pattern with clear separation of concerns:

### Flow Layers

```
View → Store → Rules → Service → API
  ↑      ↓       ↓       ↓       ↓
  ←──────────────────────────────
     (Reactive Updates)
```

### Layer Responsibilities

1. **View**: User interface and interaction
2. **Store**: State management and business logic orchestration
3. **Rules**: Data validation and business rules
4. **Service**: API communication and data transformation
5. **API**: External data source

### Practical Flow Examples

#### Authentication Flow (Login/Register)

```
[LoginView] → User fills form and clicks "Login"
     ↓
[AuthStore] → Receives credentials and validates using Rules
     ↓
[AuthRules] → Validates email format, password length, etc.
     ↓
[AuthService] → Sends credentials to backend API
     ↓
[API] → Authenticates and returns token + user data
     ↓
[AuthStore] → Stores token and user state
     ↓
[LoginView] → Redirects to dashboard or shows errors
```

#### CRUD Operations Flow (Contacts)

```
[ContactsView] → User triggers create/edit/delete action
     ↓
[ContactsStore] → Orchestrates the operation with validation
     ↓
[ContactsRules] → Validates contact data (name, email, phone)
     ↓
[ContactsService] → Sends request to API with optimistic updates
     ↓
[API] → Processes the request
     ↓
[ContactsStore] → Updates cache and reactive state
     ↓
[ContactsView] → Automatically re-renders with new data
```

## Benefits of this Architecture

### Clear Separation of Responsibilities

- **Pages**: Represent specific application routes/URLs
- **Views**: Contain presentation logic and component orchestration
- **Stores**: Manage application state and business logic flow
- **Rules**: Centralize validation logic and business rules
- **Services**: Handle API communication and data transformation
- **Components**: Are reusable and focused on a single responsibility

### Reactive State Management

The Pinia stores provide reactive state that automatically updates the UI when data changes, enabling:

- Real-time UI updates
- Optimistic updates with rollback on errors
- Smart caching with automatic revalidation

### Centralized Validation

Business rules are centralized in the `/rules` directory, ensuring:

- Consistent validation across the application
- Easy maintenance and updates
- Testable validation logic

### Code Reuse

Components and composables can be shared between different views, reducing duplication and facilitating maintenance.

### Testability

Each layer can be tested in isolation:

- Rules can be unit tested independently
- Services can be mocked for store testing
- Stores can be tested without UI components
- Views can be tested with mocked stores

### Scalability

As the application grows, new features can be added without impacting existing code, following the established patterns.

## Practical Implementation Examples

### Complete Feature Flow: Contact Management

#### 1. Rules Layer (`/rules/contacts.rules.ts`)

```typescript
export const validateContactForm = (data: ContactForm): ValidationResult => {
  const errors: Record<string, string> = {}

  if (!data.name || !data.name.trim()) {
    errors.name = 'Nome é obrigatório'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres'
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido'
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}
```

#### 2. Service Layer (`/services/contacts.service.ts`)

```typescript
class ContactsService {
  async create(data: ContactCreateDto): Promise<Contact> {
    const response = await this.api.post('/api/contacts', data)
    return response.data
  }

  async update(id: string, data: ContactUpdateDto): Promise<Contact> {
    const response = await this.api.put(`/api/contacts/${id}`, data)
    return response.data
  }
}
```

#### 3. Store Layer (`/stores/contacts.store.ts`)

```typescript
export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([])
  const isLoading = ref(false)

  async function createContact(data: ContactCreateDto) {
    // Validation using rules
    const validation = validateContactCreate(data)
    if (!validation.isValid) {
      validationErrors.value = validation.errors
      throw new Error('Dados inválidos')
    }

    // Optimistic update
    const tempContact = { ...data, id: 'temp-' + Date.now() }
    contacts.value.push(tempContact)

    try {
      const newContact = await contactsService.create(data)
      // Replace temp with real contact
      const index = contacts.value.findIndex((c) => c.id === tempContact.id)
      contacts.value[index] = newContact
    } catch (error) {
      // Rollback on error
      contacts.value = contacts.value.filter((c) => c.id !== tempContact.id)
      throw error
    }
  }
})
```

#### 4. View Layer (`/views/ContactsView/ContactsView.vue`)

```vue
<script setup lang="ts">
import { useContacts } from '@/composables/useApi'

const { contacts, createContact, isLoading } = useContacts()

const handleNewContact = async (data: ContactCreateDto) => {
  try {
    await createContact(data)
    // UI automatically updates due to reactive state
    toast.success('Contato criado com sucesso!')
  } catch (error) {
    toast.error('Erro ao criar contato')
  }
}
</script>
```

### Authentication Flow Example

#### View → Store → Rules → Service → API

```vue
<!-- LoginView.vue -->
<template>
  <form @submit.prevent="handleLogin">
    <InputText
      v-model="email"
      :class="{ error: authStore.validationErrors.email }"
    />
    <small v-if="authStore.validationErrors.email">
      {{ authStore.validationErrors.email }}
    </small>
  </form>
</template>

<script setup lang="ts">
const authStore = useAuth()

const handleLogin = async () => {
  try {
    // Store handles validation and API call
    await authStore.login({ email: email.value, password: password.value })
    router.push('/contacts')
  } catch (error) {
    // Validation errors are automatically displayed via store
  }
}
</script>
```

## Key Implementation Patterns

### 1. Optimistic Updates

```typescript
// Store optimistically updates UI before API call
async function updateContact(id: string, data: ContactUpdateDto) {
  // Update UI immediately
  const index = contacts.value.findIndex((c) => c.id === id)
  const originalContact = { ...contacts.value[index] }
  contacts.value[index] = { ...originalContact, ...data }

  try {
    await contactsService.update(id, data)
  } catch (error) {
    // Rollback on failure
    contacts.value[index] = originalContact
    throw error
  }
}
```

### 2. Smart Caching with Revalidation

```typescript
// Cache with automatic expiration
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
let lastFetch = 0

async function fetchContacts() {
  const now = Date.now()
  if (contacts.value.length > 0 && now - lastFetch < CACHE_DURATION) {
    return // Use cache
  }

  isLoading.value = true
  try {
    contacts.value = await contactsService.getAll()
    lastFetch = now
  } finally {
    isLoading.value = false
  }
}
```

### 3. Reactive Error Handling

```typescript
// Centralized validation errors in store
const validationErrors = ref<Record<string, string>>({})

// View automatically reacts to validation state
watch(validationErrors, (errors) => {
  if (Object.keys(errors).length > 0) {
    // Show validation errors in UI
  }
})
```

### 4. Composable Pattern for Store Access

```typescript
// /composables/useApi.ts
export const useAuth = () => useAuthStore()
export const useContacts = () => useContactsStore()

// Views use composables for clean separation
const { login, isLoading, validationErrors } = useAuth()
```

## Architecture Benefits

### Reactive by Design

- UI automatically updates when store state changes
- No manual DOM manipulation required
- Optimistic updates provide immediate feedback

### Predictable State Flow

- Unidirectional data flow makes debugging easier
- Clear separation between presentation and business logic
- Centralized state management

### Maintainable Validation

- Business rules centralized in `/rules`
- Consistent validation across the application
- Easy to update validation logic

### Scalable Service Layer

- API communication abstracted in services
- Easy to switch between mock and real APIs
- Centralized error handling and caching

## Frameworks Following this Approach

This architecture promotes maintainability, reusability, and code organization, being widely adopted by the development community. It is especially effective for medium and large applications where code organization becomes crucial.

## Advanced Architecture: Feature-Based Organization

### Recommended Hybrid Approach

For larger applications, consider evolving to a feature-based structure that combines domain grouping with the Page/View/Component pattern:

```
src/
├── features/                    # Application domains
│   ├── contacts/
│   │   ├── views/
│   │   │   └── ContactListView/
│   │   │       ├── ContactListView.vue
│   │   │       └── components/      # View-specific components
│   │   │           ├── ContactHeader/
│   │   │           ├── ContactFilters/
│   │   │           └── ContactGrid/
│   │   ├── components/             # Domain-specific components
│   │   │   ├── ContactCard/
│   │   │   ├── ContactBadge/
│   │   │   └── ContactForm/
│   │   └── hooks/
│   └── auth/
│       ├── views/
│       ├── components/
│       └── hooks/
├── shared/                      # Global components
│   ├── components/
│   │   ├── ui/                 # Design system
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   └── layout/             # Layouts
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       └── MainLayout/
│   └── hooks/
└── pages/                       # Routes/pages
```

### Why This Approach?

**Advantages:**

1. **Scalability**: Easy to add new domains without impacting others with clear separation of responsibilities

2. **Maintainability**: Developers find related code quickly and changes in one domain don't affect others

3. **Team Collaboration**: Teams can work on different domains without conflicts with clear ownership of each feature

4. **Smart Reuse**:
   - View-specific components stay close to the view
   - Domain components are easily reused within the domain
   - Global components maintain consistency

### Component Placement Rules

**Question: "Where should this component go?"**

- **Used in 1 view only** → `view/components/`
- **Used in multiple views of same domain** → `feature/components/`
- **Used across multiple domains** → `shared/components/`

### Decision Examples

**Avoid: Everything in shared**

```
src/shared/components/
├── ContactCard/        # Only used in contacts
├── UserProfile/        # Only used in auth
├── Button/            # Used globally ✓
└── ContactFilter/     # Only used in contacts
```

**Recommended: Organized by scope**

```
src/
├── features/
│   ├── contacts/components/ContactCard/    # Domain specific
│   └── auth/components/UserProfile/        # Domain specific
└── shared/components/Button/               # Global
```

### Gradual Implementation

**Phase 1: Start simple**

```
src/
├── views/
├── components/
└── shared/
```

**Phase 2: When growing (5+ views), refactor to:**

```
src/
├── features/
├── shared/
└── pages/
```

## Component Sharing Guidelines

### Fundamental Rule

"A component should only be shared if used 3+ times"

### Decision Criteria

**Where to place the component:**

- **Used 1 time (view specific)** → `view/components/`
- **Used 2 times (same domain)** → `feature/components/`
- **Used 3+ times (multiple locations)** → `shared/components/`

### Decision Matrix

| Scenario                 | Location            | Reason            |
| ------------------------ | ------------------- | ----------------- |
| 1 use only               | view/components/    | Too specific      |
| 2 uses same domain       | feature/components/ | Domain specific   |
| 2 uses different domains | shared/components/  | Exception to rule |
| 3+ uses                  | shared/components/  | Truly shared      |

### Practical Examples

**Anti-pattern: Share too early**

```javascript
// DON'T do this - used only 1x
src/shared/components/ContactSpecificFilter/

// ✅ Correct - keep specific
src/features/contacts/views/ContactListView/components/ContactSpecificFilter/
```

**Pattern: Natural evolution**

```javascript
// PHASE 1: Specific (1 use)
src/features/contacts/views/ContactListView/components/StatusBadge/

// PHASE 2: Domain (2 uses same domain)
src/features/contacts/components/StatusBadge/
// Used in: ContactList + ContactDetail

// PHASE 3: Shared (3+ uses or multiple domains)
src/shared/components/ui/StatusBadge/
// Used in: Contacts + Orders + Users
```

### Safe Refactoring Checklist

Before moving a component:

- [ ] Confirm 3+ uses or 2+ different domains
- [ ] Verify it doesn't break domain-specific functionality
- [ ] Ensure props are generic enough
- [ ] Update imports in all usage locations
- [ ] Test all implementations
- [ ] Document the change in changelog

## Component Location Review

### For new components:

- [ ] Is it in the correct location per 3+ usage rule?
- [ ] Is name generic enough if in shared/?
- [ ] Are props flexible for reuse?

### For moved components:

- [ ] Were all imports updated?
- [ ] Was functionality not broken?
- [ ] Was documentation updated?

### Red flags:

- Component too specific in shared/
- Component used 3+ times still in view/components/
- Duplication of similar logic in different locations
