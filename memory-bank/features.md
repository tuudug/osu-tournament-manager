# Features

## Authentication

- osu! OAuth integration for user login
- Role-based access control
- Session management

## Tournament Management

### Creation and Setup

- Tournament creation with customizable settings
  - Name and acronym
  - Team size configuration
  - Rank limits
  - Description and rules
  - Start and end dates
  - Registration control
- Role assignment system
  - Host (full access)
  - Co-host (full access)
  - Referee (match management)
  - Mappooler (mappool management)
- Tournament lifecycle management
  - Status tracking (upcoming, ongoing, completed)
  - Registration period control
  - Schedule management

### Tournament Organization

- Tournament information page
  - Basic tournament details
  - Rules and guidelines
  - Schedule and important dates
  - Current status and phase
- Team registration and management
  - Solo player registration
  - Team creation and invitation system
  - Team status tracking (pending/confirmed)
  - Player roster management
  - Captain designation
- Schedule management
  - Match scheduling with time slots
  - Tournament timeline visualization
  - Conflict detection
  - Round management
- Bracket system
  - Multiple stage support
  - Stage progression tracking
  - Match organization

## Mappool System

### Mappool Management

- Multiple mappools per tournament
- Map categorization and organization
- Map verification through osu! API
- Collaborative pooling system
  - Multiple mappoolers per tournament
  - Map suggestions and reviews
  - Map metadata display

### Map Selection

- Map difficulty tracking
- Map category organization
- Map preview functionality
- Map status tracking

## Match System

### Referee Tools

- IRC command integration
  - Pre-made command templates
  - Quick command access
  - Custom command support
  - Room ID tracking
  - One-click player invite commands
- Match state management
  - Three distinct states: Pre-match, In-match, Post-match
  - Visual state indicators
  - State transition controls
  - State persistence
- Room setup tools
  - MP Link management
  - First pick/ban team selection
  - WBD handling
  - Tournament acronym integration
- Map management
  - Ban/Pick phase tracking
  - Ban order tracking
  - Map winner selection
  - Score tracking per map
  - Map pool visualization
- Team management
  - Team score tracking
  - Player list with invite commands
  - Team color coding (red/blue)
  - Ready status indicators
- Tournament info display
  - Forum post links
  - Main sheet links
  - Late procedures
  - Double pick/ban rules
  - Freemod rules

### Match Management

- Pre-match preparation
  - Team verification
  - Player readiness checks
  - Map pool availability
  - Room setup tracking
  - First pick/ban team selection
  - MP Link validation
- In-match tools
  - Score tracking per team
  - Map pick/ban system with history
  - IRC command integration
  - Real-time status updates
  - Manual match completion control
  - Back to setup option
- Post-match processing
  - Match result display
  - Final score presentation
  - Winner announcement
  - Back to match option
  - Result submission (planned)

## Team Management

### Team Organization

- Team registration system
  - Single player registration (team_size = 1)
  - Multi-player team registration
  - Invitation system for team formation
- Team status management
  - Pending/Confirmed states
  - Team completion tracking
  - Registration validation based on team_size
- Player roster management
- Team captain designation
- Team statistics tracking

### Player Management

- Player rank verification
- Player participation tracking
- Role assignment within teams
- Invitation response handling

## Statistics and Analytics

### Tournament Statistics

- Match history with detailed scores
- Team performance metrics
  - Matches played/won
  - Maps played/won
  - Total score tracking
- Player statistics
- Map pick/ban rates
- Historical data tracking

### Reporting

- Match results with map details
- Tournament progress tracking
- Team performance analytics
- Map statistics and trends
- Player performance metrics

## Integration Features

### osu! Integration

- OAuth authentication
- Beatmap data retrieval
- Player data verification
- Rank checking

### IRC Integration

- Match lobby management
- Command automation
- Match result tracking
- Room ID management

## User Interface

### Responsive Design

- Mobile-friendly interface
- Adaptive layouts
- Accessible design

### Real-time Updates

- Match status updates
- Tournament progress tracking
- Team and player updates
- Registration status tracking
- Invitation notifications

### Toast Notifications

- Global toast provider
- Success notifications with check icon
- Auto-dismiss after 3 seconds
- Dark mode support
- Multiple toast stacking
- useToast hook for easy integration
- Consistent styling across app
- Accessible notifications
