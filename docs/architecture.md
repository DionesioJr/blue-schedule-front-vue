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
├── router/            # Route configuration
├── services/          # Business logic/API (future)
└── utils/             # Utilities (future)
```

## Benefits of this Architecture

### Clear Separation of Responsibilities

- **Pages**: Represent specific application routes/URLs
- **Views**: Contain presentation logic and page state
- **Components**: Are reusable and focused on a single responsibility

### Code Reuse

Components can be shared between different views, reducing duplication and facilitating maintenance.

### Testability

Each layer can be tested in isolation, from unit components to complete view integration.

### Scalability

As the application grows, new components and views can be added without impacting existing code.

## Practical Example

```vue
<!-- PAGE: Defines global layout -->
<template>
  <div>
    <HomeView />
    <!-- VIEW -->
  </div>
</template>

<!-- VIEW: Organizes the screen -->
<template>
  <div class="min-h-screen bg-surface-50">
    <AppHeader />
    <!-- COMPONENT -->
    <HeroSection />
    <!-- COMPONENT -->
    <FeaturesSection />
    <!-- COMPONENT -->
    <AppFooter />
    <!-- COMPONENT -->
  </div>
</template>

<!-- COMPONENT: Own layout -->
<template>
  <div class="bg-white rounded-2xl p-8">
    <div class="w-14 h-14 bg-gradient-to-r rounded-xl">
      <i class="pi text-white text-xl"></i>
    </div>
    <h3 class="text-xl font-bold">{{ title }}</h3>
    <p class="text-surface-600">{{ description }}</p>
  </div>
</template>
```

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
