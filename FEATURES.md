# Features

## Extra Features

- Spans multiple years
- Can download schedule for a specific year
- Not a 'discrete timescale' - minutes, months and years included!

## Considerations

- It was important to include the specific year to download given the fact that my app didn't have a discrete timescale
- It wasn't clear about "working hours", so each day is the entirity of the 24 hour period starting at 12am
- When downloading schedule, it will appear in the users home directory (OS specific), with a toast on success or failure
- In the example you gave for 2 day intervals, the time-frames were overlapping -> I decided to not have them overlap (each set of dates is inclusive)
  - eg. Day 1 - 2, Day 3 - 4