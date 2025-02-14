# Key Components

## Layout Components

- `/app/components/layout/header.tsx` - Main navigation header
- `/app/components/common/avatar.tsx` - User avatar component

## Tournament Components

### Main Tournament Components

- `/app/tournament/components/tournament.tsx` - Main tournament component
- `/app/tournament/components/tournament-form.tsx` - Tournament creation/editing form
- `/app/tournament/components/tournaments-list.tsx` - List of tournaments

### Tournament Detail Components

- `/app/tournament/[id]/components/header.tsx` - Tournament page header
- `/app/tournament/[id]/components/information-card.tsx` - Tournament information display
- `/app/tournament/[id]/components/tournament-info.tsx` - Detailed tournament information
- `/app/tournament/[id]/components/upcoming-card.tsx` - Upcoming matches display

### Mappool Components

- `/app/tournament/[id]/mappool/components/map-card.tsx` - Detailed map display
- `/app/tournament/[id]/mappool/components/map-card-compact.tsx` - Compact map display
- `/app/tournament/[id]/mappool/components/mappool-selector.tsx` - Mappool selection interface

### Referee Components

- `/app/tournament/referee/[id]/components/match.tsx` - Match management interface
- `/app/tournament/referee/[id]/components/pre-match.tsx` - Pre-match setup
- `/app/tournament/referee/[id]/components/post-match.tsx` - Post-match results
- `/app/tournament/referee/[id]/components/sidebar.tsx` - Referee sidebar controls

## Component Hierarchy

```
Layout
└── Header
    └── Avatar

Tournament
├── TournamentsList
├── TournamentForm
└── Tournament
    ├── Header
    ├── InformationCard
    ├── TournamentInfo
    ├── UpcomingCard
    └── Mappool
        ├── MapCard
        ├── MapCardCompact
        └── MappoolSelector

Referee
└── Match
    ├── PreMatch
    ├── PostMatch
    └── Sidebar
```

## Component Responsibilities

### Tournament Management

- `tournament-form.tsx`: Handles tournament creation and editing
  - Form validation
  - Tournament settings configuration
  - Role assignment interface

### Referee Interface

- `match.tsx`: Central match management
  - IRC command integration
  - Score tracking
  - Map pick/ban system
- `pre-match.tsx`: Pre-match preparation
  - Team setup
  - Map pool verification
  - Player readiness checks
- `post-match.tsx`: Match conclusion
  - Score submission
  - Results verification
  - Match statistics recording

### Mappool Management

- `mappool-selector.tsx`: Mappool configuration
  - Map selection interface
  - Category organization
  - Map verification with osu! API
- `map-card.tsx`: Detailed map information
  - Map metadata display
  - Difficulty statistics
  - Preview functionality
