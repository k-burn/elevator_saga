# elevator_saga
first attempt at elevator saga game: http://play.elevatorsaga.com/

## Notes on Strategy
Not knowing how many levels there were, I was eager to move on to the next level, even if I knew there were improvements I could make to my code, in terms of refactoring things and improving the efficiency of the elevator even further.

## What I'd do differently
I wasted some time trying to do some things that didn't pay dividends in terms of efficiency. I spent a solid chunk of time trying to make the elevator up and down indicators work, but I found that it didn't improve the ability transport passengers quickly, so I scrapped it. I wonder if in a later level there will be a challenge to reduce the time passengers spend in the elevator? That is integral to a real-life elevator experience, but wasn't relevant to the task-at-hand.

With the time saved from not trying to get the indicators to work, I think I would have focused on two things:

- Ensuring multiple elevators don't respond to the same request
- Optimizing which elevator responds to which requests by proximity


