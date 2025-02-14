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

### tournament_team

Team management

- `id`: number (Primary Key)
- `tournament_id`: number (Foreign Key → tournament.id)
- `name`: string
- `captain_id`: number
- `player_ids`: number[] | null
- `created_at`: string

## Relationships

### Tournament Relationships

- One tournament can have multiple mappools (tournament → tournament_mappool)
- One tournament can have multiple teams (tournament → tournament_team)
- One tournament can have multiple matches (tournament → tournament_match)

### Mappool Relationships

- Each mappool belongs to one tournament (tournament_mappool → tournament)
- One mappool can have multiple maps (tournament_mappool → tournament_mappool_map)
- Each mappool can be used in multiple matches (tournament_mappool → tournament_match)

### Match Relationships

- Each match belongs to one tournament (tournament_match → tournament)
- Each match involves two teams (tournament_match → tournament_team)
- Each match uses one mappool (tournament_match → tournament_mappool)

### Team Relationships

- Each team belongs to one tournament (tournament_team → tournament)
- Teams participate in matches as either team_1 or team_2

## Key Features

### Tournament Management

- Flexible team size configuration (`team_size`, `vs_size`)
- Rank limits for participants (`rank_limit_lower`, `rank_limit_upper`)
- Role management (referees, poolers, cohosts)

### Mappool System

- Hierarchical organization (tournament → mappool → maps)
- Detailed map metadata storage
- Pooler assignment and tracking

### Match System

- Internal match ID tracking
- Team assignments
- Referee assignment
- Match data storage (JSON for flexibility)

### Team System

- Captain designation
- Player roster management
- Tournament association
