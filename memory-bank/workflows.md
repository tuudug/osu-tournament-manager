# Common Workflows

## Tournament Creation and Setup

1. Tournament Host Flow

   ```
   1. Login with osu! account
   2. Navigate to tournament creation page
   3. Fill in tournament details
      - Name and acronym
      - Team size settings
      - Rank limits
      - Tournament description
      - Start and end dates
      - Registration settings
   4. Assign tournament staff
      - Co-hosts
      - Referees
      - Mappoolers
   5. Create initial mappool
   6. Set up tournament schedule
   7. Configure tournament stages/brackets
   ```

2. Staff Assignment Flow
   ```
   1. Host accesses tournament settings
   2. Adds staff members by osu! username
   3. Assigns appropriate roles
   4. Staff members receive access to role-specific features
   ```

## Tournament Lifecycle

1. Pre-tournament Phase

   ```
   1. Tournament created with 'upcoming' status
   2. Registration period opened
   3. Teams/players register
   4. Mappools prepared
   5. Schedule finalized
   ```

2. Active Tournament Phase

   ```
   1. Tournament status changes to 'ongoing'
   2. Registration closes
   3. Brackets generated
   4. Matches scheduled and played
   5. Statistics tracked
   ```

3. Post-tournament Phase
   ```
   1. Tournament status changes to 'completed'
   2. Final statistics generated
   3. Results archived
   4. Winners announced
   ```

## Mappool Management

1. Mappooler Workflow

   ```
   1. Login to mappooler interface
   2. Access assigned tournament's mappool
   3. Add maps to pool
      - Enter map ID
      - System fetches map data from osu! API
      - Assign map to category
      - Add any specific comments
   4. Review and finalize mappool
   ```

2. Map Selection Process
   ```
   1. Access tournament mappool
   2. Filter maps by category
   3. Review map details
   4. Add maps to selection
   5. Organize maps by difficulty
   6. Finalize map order
   ```

## Match Management

1. Referee Pre-match Flow

   ```
   1. Access referee interface
   2. Select scheduled match
   3. Verify teams and players
   4. Create match lobby using IRC commands
   5. Record room ID
   6. Invite players
   7. Set match settings
      - Team mode
      - Score mode
      - Match size
   ```

2. In-match Referee Flow

   ```
   1. Track map bans and picks
      - Record which team banned/picked each map
      - Update map status (banned/picked/played)
   2. Use IRC commands for map changes
   3. Monitor and record scores per map
   4. Handle player substitutions
   5. Manage match progression
   6. Update match status (ongoing)
   ```

3. Post-match Flow
   ```
   1. Record final scores
      - Overall match score
      - Individual map scores
   2. Designate winner
   3. Submit match results
   4. Update match status to completed
   5. Update tournament brackets
   6. Generate match statistics
   ```

## Team Management

1. Solo Tournament Registration

   ```
   1. Player accesses tournament registration
   2. Creates team entry (team_size = 1)
      - Status automatically set to 'confirmed'
   3. System verifies player rank
   4. Registration complete
   ```

2. Team Tournament Registration

   ```
   1. Team captain creates team
      - Status set to 'pending'
   2. Enters team details
      - Team name
      - Invites players
   3. System sends invitations
   4. Players accept/decline invitations
   5. System tracks invitation responses
   6. When all required players accept:
      - Team status changes to 'confirmed'
      - Team is fully registered
   ```

3. Team Captain Management
   ```
   1. Captain accesses team management
   2. Can send new invitations
   3. Track invitation status
   4. Manage confirmed players
   5. Update team information
   ```

## Tournament Progress

1. Match Scheduling

   ```
   1. Access tournament schedule
   2. Create match slots with times
   3. Assign teams to matches
   4. Assign referees
   5. Teams confirm availability
   6. System tracks match status
   ```

2. Tournament Progression
   ```
   1. Track completed matches
   2. Update brackets and stages
   3. Generate ongoing statistics
   4. Advance teams to next round
   5. Update tournament status as needed
   ```

## IRC Command Reference

Common IRC Commands for Referees:

```
1. Room Creation
   !mp make <name>
   !mp size <size>
   !mp set <teammode> [<scoremode>]

2. Player Management
   !mp invite <username>
   !mp team <username> <colour>

3. Match Control
   !mp start <countdown>
   !mp abort
   !mp map <mapid>
   !mp mods <mod> [<mod>]

4. Room Management
   !mp timer [<time>]
   !mp aborttimer
   !mp addref <username>
   !mp close
```
