Chris Stovall

API Gateway URL
https://6f06x9c5di.execute-api.us-west-2.amazonaws.com/prod

CLI Instructions will be added when completed

The most challenging part of this assignment so far has been trying to wrestle with DynamoDB querying due to its limited functionality, alongside general troubleshooting for the various bugs. I wasted a lot of time trying to make my vision for the program work, and failing to properly fix issues.


The entire backend functionality of the project should be entirely sound, as in data is properly stored in the database, the games function exactly as a tic-tac-toe game should (even with larger sizes possible), and some of the messaging works.
However, there are many, many buggy parts that simply stopped working close to the deadline. Messages aren't sent when players start a game, moves cannot be validated even when they contain all necessary components, and the CLI interface is entirely missing. None of this should take much time to fix or add, but clearly I've run out of time to do this before the due date.


Although my system for storing the game data is very neat, both in the structure and how it functions without needing to fetch the game during updates, if I had instead just done the simple 3x3 array implementation I'm certain I would have completed all this on time.


1:45AM Update:
As I expected entirely fixing all of the bugs didn't take too much time, small things here and there that caused issues. Implementing in the activity for games ended up taking roughly half the time. Everything but the CLI is now 100% functional

Will add functionality for CLI shortly
