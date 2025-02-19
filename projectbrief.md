# Project Brief

This project contains a NextJS project called osu-tournament-manager. The project uses flowbite-react for UI.

The website/app will be the one stop shop for hosting osu! tournaments.

Hosts can create tournaments and manage registrations, schedules, mappools,brackets, and other tournament data with ease, without jumping through many complicated Google Sheets or Challonge Brackets or Google Forms. All their tournament information can be on this website at their tournament page. This unification of data will be very useful to both hosts and players.

The project uses supabase as the primary database. The supabase schema is located at (types/supabase/types.ts).

Users can login with their osu! accounts using OAuth.

A tournament can have multiple roles, each doing a different task for the tournament. These would be:

- Host (access to everything)
- Co-host (access to everything)
- Referee (can access match referee pages for the tournament, read #Referee Page for more info)
- Mappooler (can access mappooler pages for the tournament, read #Mappooler Page for more info)
  These roles can be assigned to any user by the host.

A Tournament Page will have these sections:

- Main (Landing Page)
- Mappool (mappools set by the mappoolers)
- Bracket
- Schedule
- Teams
- Statistics

# Referee Page

Referees use IRC to join the in-game lobby to oversee the matches. Some information will need to be tracked by the referees to make their lives easier. These include:

- Banned Maps
- Picked Maps
- Team Scores

The page should also have the IRC commands ready for copy paste. These are the available commands to the referee.

```
!mp make <name> - Creates a tournament room with the specified name. A maximum of 4 such rooms may be created.
!mp invite <username> - Invites a player to the room.
!mp size <size> - Sets the amount of available slots (1-16) in the room.
!mp set <teammode> [<scoremode>] [<size>] - Sets various room properties.
teammode - 0: Head To Head, 1: Tag Coop, 2: Team Vs, 3: Tag Team Vs
scoremode - 0: Score, 1: Accuracy, 2: Combo, 3: Score V2
!mp settings - Displays full room details.
!mp start 15 - Starts the match
!mp abort - Aborts the match.
!mp team <username> <colour> - Moves a player to the specified team.
colour - red, blue
!mp map <mapid> [<playmode>] - Changes the beatmap and playmode of the room.
playmode - 0: osu!, 1: Taiko, 2: Catch The Beat, 3: osu!Mania
!mp mods <mod> [<mod>] [<mod>] … - Removes all currently applied mods and applies these mods to the room.
Any amount of mods can be entered.
mod - HR, DT, FL, HD, FI, Freemod, None
!mp timer [<time>] - Begins a countdown timer.
!mp aborttimer - Stops the current timer (both normal timers and match start timer)
!mp addref <username> [<username>] … - Adds a referee to the room. A maximum of 8 referees may be added. Only the creator of the room can add a referee.
!mp close - Closes the room.
```

As referees use the referee page to update match scores, picks, bans, all these changes should be reflected live to the match page/other pages that need them.

# Mappooler Page

This is a page for mappoolers to suggest and finalize mappools for the tournament. Finalized mappools will be displayed on the tournament's "Mappools" page. It should contain a table of maps, with mappoolers being able to fill a cell called "Map ID", and we make a call to osu! api that would fill in the map data. The mappool size shall be set by the host of the tournament.
