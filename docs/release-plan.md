# Documento de Entrega – Frontend da Agenda de Contatos

## Objetivo

Este documento descreve a evolução do projeto frontend da Agenda de Contatos, incluindo telas de contatos, favoritos, upload de fotos, soft delete e configuração do usuário.

O objetivo é apresentar ao Scrum Master o planejamento de releases, funcionalidades implementadas e organização do Git.

---

## Tecnologias Utilizadas

- Vue.js 3 + TypeScript
- PrimeVue (UI Components)
- Pinia (state management)
- Vue Router (SPA)
- Axios (integração backend)
- Vitest (unit testing)
- ESLint + Prettier (qualidade de código)

---

## Estrutura de Branches

- **main**: branch estável, contém as releases aprovadas.
- **develop**: branch de desenvolvimento, integra funcionalidades.
- **feature/**: branches para funcionalidades específicas.
- **release/**: branches para preparar releases.

Exemplo de branches de funcionalidades:

- feature/contacts-crud
- feature/user-settings
- feature/favorites-and-photos

---

## Plano de Releases

### Release 0.1 – Setup Inicial

- Scaffold Vue 3 + TypeScript
- Configuração de Router, Pinia e Axios
- PrimeVue instalado
  **Commit:** `Setup inicial do projeto – Vue 3 + TypeScript + PrimeVue + Pinia`

### Release 0.2 – CRUD de Contatos

- Implementação de `ContactsPage`, `ContactTable`, `ContactForm` e `ContactDialog`
- Integração com backend (API real ou fake)
- Paginação, busca e ordenação
  **Commit:** `Implementação CRUD de contatos + listagem paginada + busca`

### Release 0.3 – Favoritos, Foto e Soft Delete

- Marcação de contatos favoritos
- Upload e exibição de fotos
- Soft delete (`isDeleted`, `isActive`, `deletedAt`) com restauração
  **Commit:** `Funcionalidades avançadas: favoritos, fotos e soft delete`

### Release 0.4 – Tela de Configurações do Usuário

- `SettingsPage` com formulário de atualização de dados
- Upload de foto de perfil
- Exclusão de conta com confirmação
  **Commit:** `Tela de configuração do usuário – atualizar dados e excluir conta`

### Release 0.5 – Testes e Ajustes Finais

- Testes unitários com Vitest
- Ajustes de validação e UX (toasts, confirmações)
  **Commit:** `Testes unitários + ajustes finais de UX/UI`

### Release 1.0 – Primeira versão estável

- Merge de `develop` para `main`
- Tag Git: `v1.0.0`
- Release notes com funcionalidades implementadas

---

## Boas Práticas de Git

- Commits curtos e descritivos, ex:
  - `feat: adicionar paginação e filtro na tabela de contatos`
  - `fix: corrigir validação de e-mail`
  - `refactor: organizar store e tipos TypeScript`

- Branches de feature curtas, integradas rapidamente no develop.
- Tags Git para releases importantes.
- README atualizado a cada release.
