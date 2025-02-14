# API Endpoints

## osu! Related Endpoints

- `/api/osu/get-map-data` - Fetch beatmap data from osu! API
- `/api/osu/get-own-data` - Fetch current user's osu! profile data
- `/api/osu/get-user` - Fetch specific user's osu! profile data

## Tournament Management

- `/api/tournament/create` - Create new tournament
- `/api/tournament/get` - Get tournament details
- `/api/tournament/update` - Update tournament information
- `/api/tournament/mappool` - Manage tournament mappools
  - `/fetch` - Fetch mappool data
  - `/list` - List available mappools

## Authentication

- `/api/auth/[...nextauth]` - NextAuth.js authentication endpoints for osu! OAuth

## API Implementation Details

### Tournament Creation Flow

1. POST to `/api/tournament/create`
   - Creates new tournament record
   - Sets up initial tournament roles (Host)
   - Initializes tournament settings

### Mappool Management

1. POST to `/api/tournament/mappool`
   - Manages mappool modifications
   - Validates map selections
   - Updates mappool status

### User Authentication

1. Uses NextAuth.js with osu! OAuth
2. Stores user session data
3. Manages role-based access control for tournament features
