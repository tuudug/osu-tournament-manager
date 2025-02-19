# API Endpoints

## osu! Related Endpoints

- `/api/osu/get-map-data` - Fetch beatmap data from osu! API
- `/api/osu/get-own-data` - Fetch current user's osu! profile data
- `/api/osu/get-user` - Fetch specific user's osu! profile data

## Tournament Management

- `/api/tournament/create` - Create new tournament
- `/api/tournament/get` - Get tournament details
- `/api/tournament/update` - Update tournament information
- `/api/tournament/status` - Update tournament status (upcoming/ongoing/completed)
- `/api/tournament/registration` - Toggle registration open/close

### Tournament Mappool

- `/api/tournament/mappool` - Manage tournament mappools
  - `/fetch` - Fetch mappool data
  - `/list` - List available mappools
  - `/create` - Create new mappool
  - `/update` - Update existing mappool

### Tournament Teams

- `/api/tournament/team/create` - Create new team
- `/api/tournament/team/update` - Update team information
- `/api/tournament/team/invite` - Send team invitation
- `/api/tournament/team/invite/respond` - Accept/decline team invitation
- `/api/tournament/team/status` - Get team status (pending/confirmed)

### Tournament Matches

- `/api/tournament/match/create` - Create new match
- `/api/tournament/match/update` - Update match details
- `/api/tournament/match/status` - Update match status
- `/api/tournament/match/score` - Update match scores
- `/api/tournament/match/maps` - Manage match map picks/bans
  - `/pick` - Pick a map
  - `/ban` - Ban a map
  - `/status` - Update map status

### Tournament Brackets

- `/api/tournament/bracket/create` - Create tournament bracket
- `/api/tournament/bracket/update` - Update bracket information
- `/api/tournament/bracket/stages` - Manage bracket stages

### Tournament Statistics

- `/api/tournament/stats/team` - Get team statistics
- `/api/tournament/stats/match` - Get match statistics
- `/api/tournament/stats/maps` - Get map statistics

## Authentication

- `/api/auth/[...nextauth]` - NextAuth.js authentication endpoints for osu! OAuth

## API Implementation Details

### Tournament Creation Flow

1. POST to `/api/tournament/create`
   - Creates new tournament record
   - Sets up initial tournament roles (Host)
   - Initializes tournament settings
   - Sets initial status as 'upcoming'

### Tournament Status Management

1. POST to `/api/tournament/status`
   - Updates tournament lifecycle status
   - Triggers relevant state changes (e.g., closing registration)
   - Updates related tournament data

### Team Registration Flow

1. POST to `/api/tournament/team/create`

   - Creates new team record
   - Sets initial status based on tournament.team_size
   - Automatically confirmed for team_size=1, pending otherwise

2. POST to `/api/tournament/team/invite`
   - Creates team invitations
   - Notifies invited players
   - Tracks invitation status

### Match Management

1. POST to `/api/tournament/match/create`

   - Creates match record
   - Associates teams and referee
   - Sets up match schedule

2. POST to `/api/tournament/match/maps`
   - Manages map picking phase
   - Tracks banned and picked maps
   - Updates map statuses

### Statistics Tracking

1. GET from `/api/tournament/stats/*`
   - Retrieves various statistics
   - Aggregates match/team/map data
   - Provides tournament progress metrics

### User Authentication

1. Uses NextAuth.js with osu! OAuth
2. Stores user session data
3. Manages role-based access control for tournament features
