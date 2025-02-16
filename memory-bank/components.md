# Key Components

## Layout Components

- `/app/components/layout/header.tsx` - Main navigation header
- `/app/components/common/avatar.tsx` - User avatar component
- `/app/components/common/toast.tsx` - Global toast notification system
  - ToastProvider for app-wide notifications
  - useToast hook for component integration
  - Success toast with check icon
  - Auto-dismiss functionality
  - Dark mode support

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
- `/app/tournament/[id]/components/status-badge.tsx` - Tournament status indicator
- `/app/tournament/[id]/components/registration-control.tsx` - Registration open/close control

### Team Components

- `/app/tournament/[id]/teams/components/teams-list.tsx` - List of tournament teams
- `/app/tournament/[id]/teams/components/team-card.tsx` - Team information display
- `/app/tournament/[id]/teams/components/team-form.tsx` - Team creation/editing form
- `/app/tournament/[id]/teams/components/invitation-list.tsx` - Team invitations management
- `/app/tournament/[id]/teams/components/invitation-card.tsx` - Individual invitation display
- `/app/tournament/[id]/teams/components/team-status-badge.tsx` - Team status indicator

### Mappool Components

- `/app/tournament/[id]/mappool/components/map-card.tsx` - Detailed map display
- `/app/tournament/[id]/mappool/components/map-card-compact.tsx` - Compact map display
- `/app/tournament/[id]/mappool/components/mappool-selector.tsx` - Mappool selection interface

### Match Components

- `/app/tournament/[id]/match/components/match-card.tsx` - Match information display
- `/app/tournament/[id]/match/components/match-schedule.tsx` - Match scheduling interface
- `/app/tournament/[id]/match/components/map-picker.tsx` - Map pick/ban interface
- `/app/tournament/[id]/match/components/score-tracker.tsx` - Match score tracking

### Bracket Components

- `/app/tournament/[id]/bracket/components/bracket-view.tsx` - Tournament bracket display
- `/app/tournament/[id]/bracket/components/stage-selector.tsx` - Tournament stage selection
- `/app/tournament/[id]/bracket/components/match-connector.tsx` - Bracket match connection lines

### Statistics Components

- `/app/tournament/[id]/stats/components/team-stats.tsx` - Team statistics display
- `/app/tournament/[id]/stats/components/match-stats.tsx` - Match statistics display
- `/app/tournament/[id]/stats/components/map-stats.tsx` - Map statistics display

### Referee Components

- `/app/tournament/[id]/match/[matchId]/referee/components/RoomSetup.tsx` - Pre-match room setup
  - MP Link management
  - First pick/ban selection
  - WBD handling
  - Tournament acronym integration
- `/app/tournament/[id]/match/[matchId]/referee/components/TeamScore.tsx` - Team score and player management
  - Score display
  - Player list with invite commands
  - Team color theming
  - Toast notifications for actions
- `/app/tournament/[id]/match/[matchId]/referee/components/MapPool.tsx` - Map pool management
  - Ban/Pick interface
  - Ban order tracking
  - Map winner selection
  - Score tracking
- `/app/tournament/[id]/match/[matchId]/referee/components/Commands.tsx` - IRC command management
  - Pre-made commands
  - Quick access buttons
  - Command templates
- `/app/tournament/[id]/match/[matchId]/referee/components/MiscInfo.tsx` - Tournament information display
  - Forum post links
  - Main sheet links
  - Late procedures
  - Double pick/ban rules
  - Freemod rules
- `/app/tournament/[id]/match/[matchId]/referee/components/PostMatch.tsx` - Post-match interface
  - Match result display
  - Winner announcement
  - Final scores
  - Navigation controls

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
    ├── StatusBadge
    ├── RegistrationControl
    ├── UpcomingCard
    ├── Teams
    │   ├── TeamsList
    │   ├── TeamCard
    │   ├── TeamForm
    │   ├── InvitationList
    │   ├── InvitationCard
    │   └── TeamStatusBadge
    ├── Mappool
    │   ├── MapCard
    │   ├── MapCardCompact
    │   └── MappoolSelector
    ├── Match
    │   ├── MatchCard
    │   ├── MatchSchedule
    │   ├── MapPicker
    │   └── ScoreTracker
    ├── Bracket
    │   ├── BracketView
    │   ├── StageSelector
    │   └── MatchConnector
    └── Statistics
        ├── TeamStats
        ├── MatchStats
        └── MapStats

Referee
└── Match
    ├── PreMatch
    ├── PostMatch
    ├── Sidebar
    ├── MapStatus
    └── ScoreInput
```

## Component Responsibilities

### Tournament Management

- `tournament-form.tsx`: Handles tournament creation and editing
  - Form validation
  - Tournament settings configuration
  - Role assignment interface
  - Tournament lifecycle settings

### Team Management

- `team-form.tsx`: Team creation and editing
  - Team details configuration
  - Player invitation interface (for team_size > 1)
  - Team validation against tournament settings
- `invitation-list.tsx`: Invitation management
  - Display pending invitations
  - Invitation status tracking
  - Accept/decline actions

### Match Management

- `match-card.tsx`: Match information display
  - Teams and schedule display
  - Match status tracking
  - Score display
- `map-picker.tsx`: Map pick/ban interface
  - Pick/ban phase management
  - Map status tracking
  - Team turn management

### Bracket Management

- `bracket-view.tsx`: Tournament progression
  - Stage visualization
  - Match connections
  - Progress tracking
- `stage-selector.tsx`: Tournament stages
  - Stage navigation
  - Stage status display

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
- `map-status.tsx`: Map management
  - Pick/ban tracking
  - Map order management
  - Score recording

### Mappool Management

- `mappool-selector.tsx`: Mappool configuration
  - Map selection interface
  - Category organization
  - Map verification with osu! API
- `map-card.tsx`: Detailed map information
  - Map metadata display
  - Difficulty statistics
  - Preview functionality

### Statistics Display

- `team-stats.tsx`: Team performance
  - Match history
  - Win/loss records
  - Score aggregation
- `map-stats.tsx`: Map analytics
  - Pick/ban rates
  - Score distributions
  - Usage patterns
