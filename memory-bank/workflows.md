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
   4. Assign tournament staff
      - Co-hosts
      - Referees
      - Mappoolers
   5. Create initial mappool
   6. Set up tournament schedule
   ```

2. Staff Assignment Flow
   ```
   1. Host accesses tournament settings
   2. Adds staff members by osu! username
   3. Assigns appropriate roles
   4. Staff members receive access to role-specific features
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
   5. Invite players
   6. Set match settings
      - Team mode
      - Score mode
      - Match size
   ```

2. In-match Referee Flow

   ```
   1. Track map bans and picks
   2. Use IRC commands for map changes
   3. Monitor scores
   4. Handle player substitutions
   5. Manage match progression
   ```

3. Post-match Flow
   ```
   1. Record final scores
   2. Submit match results
   3. Update tournament brackets
   4. Generate match statistics
   ```

## Team Management

1. Team Registration

   ```
   1. Team captain creates team
   2. Enters team details
      - Team name
      - Player roster
   3. System verifies player ranks
   4. Players confirm participation
   5. Team is registered for tournament
   ```

2. Player Management
   ```
   1. Captain accesses team management
   2. Can add/remove players
   3. Assign roles within team
   4. Update player information
   ```

## Tournament Progress

1. Match Scheduling

   ```
   1. Access tournament schedule
   2. Create match slots
   3. Assign teams to matches
   4. Assign referees
   5. Teams confirm availability
   ```

2. Tournament Progression
   ```
   1. Track completed matches
   2. Update brackets
   3. Generate statistics
   4. Advance teams to next round
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
