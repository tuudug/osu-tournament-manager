# Database Schema

## Tables

### tournament

Main tournament information table

- `id`: number (Primary Key)
- `name`: string
- `acronym`: string
- `description`: string | null
- `team_size`: number
- `vs_size`: number
- `rank_limit_lower`: number | null
- `rank_limit_upper`: number | null
- `referee_ids`: number[] | null
- `pooler_ids`: number[] | null
- `cohost_ids`: number[] | null
- `created_at`: string
- `host_id`: number
- `registration_open`: boolean
- `start_date`: timestamp
- `end_date`: timestamp
- `status`: enum ('upcoming', 'ongoing', 'completed')

### tournament_mappool

Mappool management table

- `id`: number (Primary Key)
- `tournament_id`: number (Foreign Key → tournament.id)
- `name`: string
- `created_user_id`: number
- `created_at`: string

### tournament_mappool_map

Individual maps within a mappool

- `id`: number (Primary Key)
- `mappool_id`: number (Foreign Key → tournament_mappool.id)
- `osu_map_id`: number
- `map_prefix`: string
- `map_number`: number
- `pooler_id`: number
- `comment`: string | null
- `map_data`: Json | null
- `created_at`: string

### tournament_match

Match information and tracking

- `id`: number (Primary Key)
- `tournament_id`: number (Foreign Key → tournament.id)
- `internal_match_id`: number
- `team_1_id`: number (Foreign Key → tournament_team.id)
- `team_2_id`: number (Foreign Key → tournament_team.id)
- `mappool_id`: number (Foreign Key → tournament_mappool.id)
- `referee_id`: number | null
- `match_data`: Json | null
- `created_at`: string
- `scheduled_time`: timestamp
- `status`: enum ('scheduled', 'ongoing', 'completed')
- `winner_id`: number (Foreign Key → tournament_team.id)
- `score_team1`: number
- `score_team2`: number
- `round_name`: string
- `room_id`: string

### tournament_team

Team management

- `id`: number (Primary Key)
- `tournament_id`: number (Foreign Key → tournament.id)
- `name`: string
- `captain_id`: number
- `player_ids`: number[] | null
- `created_at`: string
- `status`: enum ('confirmed', 'pending')

### tournament_bracket

Tournament bracket management

- `id`: number (Primary Key)
- `tournament_id`: number (Foreign Key → tournament.id)
- `stage_name`: string
- `stage_order`: number
- `created_at`: timestamp

### tournament_match_map

Match map picks/bans tracking

- `id`: number (Primary Key)
- `match_id`: number (Foreign Key → tournament_match.id)
- `map_id`: number (Foreign Key → tournament_mappool_map.id)
- `order_number`: number
- `winner_id`: number (Foreign Key → tournament_team.id)
- `score_team1`: number
- `score_team2`: number
- `status`: enum ('banned', 'picked', 'played')
- `picked_by`: number (Foreign Key → tournament_team.id)
- `banned_by`: number (Foreign Key → tournament_team.id)

### tournament_statistics

Tournament statistics tracking

- `id`: number (Primary Key)
- `tournament_id`: number (Foreign Key → tournament.id)
- `team_id`: number (Foreign Key → tournament_team.id)
- `matches_played`: number
- `matches_won`: number
- `maps_played`: number
- `maps_won`: number
- `total_score`: number
- `created_at`: timestamp
- `updated_at`: timestamp

### tournament_team_invitation

Team invitation management

- `id`: number (Primary Key)
- `tournament_id`: number (Foreign Key → tournament.id)
- `team_id`: number (Foreign Key → tournament_team.id)
- `inviter_id`: number
- `invitee_id`: number
- `status`: enum ('pending', 'accepted', 'declined')
- `created_at`: timestamp
- `updated_at`: timestamp

## Relationships

### Tournament Relationships

- One tournament can have multiple mappools (tournament → tournament_mappool)
- One tournament can have multiple teams (tournament → tournament_team)
- One tournament can have multiple matches (tournament → tournament_match)
- One tournament can have multiple brackets (tournament → tournament_bracket)
- One tournament can have multiple statistics entries (tournament → tournament_statistics)

### Mappool Relationships

- Each mappool belongs to one tournament (tournament_mappool → tournament)
- One mappool can have multiple maps (tournament_mappool → tournament_mappool_map)
- Each mappool can be used in multiple matches (tournament_mappool → tournament_match)

### Match Relationships

- Each match belongs to one tournament (tournament_match → tournament)
- Each match involves two teams (tournament_match → tournament_team)
- Each match uses one mappool (tournament_match → tournament_mappool)
- Each match can have multiple map picks/bans (tournament_match → tournament_match_map)

### Team Relationships

- Each team belongs to one tournament (tournament_team → tournament)
- Teams participate in matches as either team_1 or team_2
- Teams can send/receive invitations (tournament_team → tournament_team_invitation)
- Teams have statistics tracked (tournament_team → tournament_statistics)

## Key Features

### Tournament Management

- Flexible team size configuration (`team_size`, `vs_size`)
- Rank limits for participants (`rank_limit_lower`, `rank_limit_upper`)
- Role management (host, referees, poolers, cohosts)
- Registration control (`registration_open`)
- Tournament lifecycle management (`status`)
- Scheduling (`start_date`, `end_date`)

### Mappool System

- Hierarchical organization (tournament → mappool → maps)
- Detailed map metadata storage
- Pooler assignment and tracking

### Match System

- Internal match ID tracking
- Team assignments
- Referee assignment
- Match data storage (JSON for flexibility)
- Match scheduling
- Match status tracking
- Score tracking
- Map pick/ban system
- Room management

### Team System

- Captain designation
- Player roster management
- Tournament association
- Team status tracking (pending/confirmed)
- Team type support (solo/team)
- Invitation system for team formation

### Statistics System

- Match statistics tracking
- Map performance tracking
- Team performance metrics
- Historical data storage
