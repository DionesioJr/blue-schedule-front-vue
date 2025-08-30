# API Implementation Documentation

## Estrutura Criada

### 📁 Types (`src/types/`)

- **`api.ts`** - Interfaces gerais da API (responses, paginação, erros)
- **`auth.ts`** - Interfaces de autenticação (Login, Register, User)
- **`contacts.ts`** - Interfaces de contatos (Contact, Create/Update DTOs)
- **`users.ts`** - Interfaces de usuários (Profile, Update DTO)
- **`index.ts`** - Barrel exports de todos os types

### 🔧 Services (`src/services/`)

- **`api.ts`** - Configuração base do Axios com interceptors
- **`auth.service.ts`** - Serviços de autenticação
- **`contacts.service.ts`** - Serviços de CRUD de contatos
- **`users.service.ts`** - Serviços de gerenciamento de usuários
- **`index.ts`** - Barrel exports de todos os services

### 🗃️ Stores (`src/stores/`)

- **`auth.store.ts`** - Store de autenticação com Pinia
- **`contacts.store.ts`** - Store de contatos com cache inteligente
- **`users.store.ts`** - Store de usuários com cache de perfil
- **`index.ts`** - Barrel exports de todos os stores

### 🎣 Composables (`src/composables/`)

- **`useApi.ts`** - Composables para facilitar uso dos stores

## Funcionalidades Implementadas

### 🔐 Autenticação

- Login e registro de usuários
- Refresh token automático
- Logout com revogação de token
- Verificação de token expirado
- Redirecionamento automático para login em caso de 401

### 👥 Contatos

- CRUD completo (Create, Read, Update, Delete)
- Busca com paginação
- Ordenação personalizada
- Marcação de favoritos
- Controle de status (ativo/inativo)
- Cache inteligente com 5 minutos de duração
- Sincronização automática entre cache local e servidor

### 👤 Usuários

- Gerenciamento de perfil do usuário
- Upload de foto de perfil
- Atualização de dados pessoais
- Exclusão de conta
- Cache de perfil com 10 minutos de duração

## Características Técnicas

### 🚀 Cache Inteligente

- **Contacts Store**: Cache de 5 minutos para lista de contatos
- **Users Store**: Cache de 10 minutos para perfil do usuário
- **Revalidação automática**: Dados são revalidados automaticamente após expiração
- **Cache local**: Utiliza Map() para cache em memória com timestamps

### 🔄 Sincronização

- **Otimistic Updates**: Atualizações locais imediatas
- **Server Sync**: Sincronização com servidor após operações
- **Error Handling**: Rollback automático em caso de erro

### 🛡️ Segurança

- **Token Management**: Gerenciamento automático de tokens JWT
- **Refresh Token**: Renovação automática de tokens
- **Logout Seguro**: Revogação de tokens no servidor
- **Request Interceptors**: Adição automática de headers de autenticação

## Como Usar

### 1. Configuração de Environment

```bash
# .env.local
VITE_API_BASE_URL=http://localhost:5000
```

### 2. Uso com Composables

```vue
<script setup lang="ts">
import { useAuth, useContacts } from '@/composables/useApi'

const { login, user, isAuthenticated } = useAuth()
const { fetchContacts, contacts, createContact } = useContacts()
</script>
```

### 3. Uso Direto dos Stores

```vue
<script setup lang="ts">
import { useAuthStore, useContactsStore } from '@/stores'

const authStore = useAuthStore()
const contactsStore = useContactsStore()
</script>
```

### 4. Inicialização da App

```ts
// main.ts já configurado com Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
```

## Endpoints Implementados

### Auth

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/revoke` - Logout

### Contacts

- `GET /api/contacts` - Lista paginada com filtros
- `POST /api/contacts` - Criar contato
- `GET /api/contacts/{uuid}` - Buscar por ID
- `PUT /api/contacts/{uuid}` - Atualizar contato
- `DELETE /api/contacts/{uuid}` - Deletar contato
- `PATCH /api/contacts/{uuid}/favorite` - Toggle favorito
- `PATCH /api/contacts/{uuid}/status` - Toggle status
- `GET /api/contacts/favorites` - Lista de favoritos

### Users

- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `DELETE /api/users/profile` - Deletar conta
- `GET /api/users/{uuid}` - Buscar usuário por ID

## Padrões e Boas Práticas

- **TypeScript**: Tipagem completa em toda a aplicação
- **Error Handling**: Tratamento consistente de erros
- **Loading States**: Estados de carregamento em todas as operações
- **Cache Strategy**: Estratégia de cache para otimização de performance
- **Separation of Concerns**: Separação clara entre services, stores e UI
- **Reactive State**: Estado reativo com Pinia
- **Composable Pattern**: Padrão de composables para reutilização
