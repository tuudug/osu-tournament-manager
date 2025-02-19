# System Patterns

## Architecture Overview

### Frontend Architecture

1. Page Structure

   - App Router-based routing (/app directory)
   - Server and Client Components separation
   - Layout inheritance for consistent UI

2. Component Patterns

   - Feature-based organization (/features directory)
   - Common UI components (/components/common)
   - Tournament-specific components (/components/tournament)

3. State Management
   - Server-side data fetching
   - Client-side state with React hooks
   - Real-time updates via Supabase subscriptions

### API Architecture

1. Route Structure

   - API routes under /app/api
   - RESTful endpoints for tournament operations
   - Dedicated osu! API integration routes

2. Authentication Flow
   - osu! OAuth integration
   - Session management with NextAuth.js
   - Role-based access control

### Data Patterns

1. Database Schema

   - Tournament management tables
   - User roles and permissions
   - Match and mappool data

2. API Integration
   - osu! API client for map data
   - IRC command integration for match management
   - Real-time score tracking

## Common Patterns

### Feature Implementation Pattern

1. Component Structure

   ```
   features/
     feature-name/
       components/
       hooks/
       types/
       utils/
   ```

2. API Integration Pattern
   ```
   services/
     service-name/
       client.ts
       provider.ts
   ```

### Code Organization

1. Type Definitions

   ```
   types/
     models/     # Data models
     api/        # API types
     common/     # Shared types
   ```

2. Utility Functions
   ```
   utils/
     formatting/
     validation/
     auth/
   ```

## Best Practices

1. Component Design

   - Separate business logic from UI
   - Use custom hooks for reusable logic
   - Implement proper error boundaries

2. API Design

   - Consistent error handling
   - Input validation
   - Proper status codes and responses

3. State Management
   - Server-side rendering when possible
   - Optimistic updates for better UX
   - Proper loading and error states
