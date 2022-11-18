Chris Stovall

API Gateway URL
https://bpxmhcszk7.execute-api.us-west-2.amazonaws.com/prod/

CLI Instructions will be added when completed

The most challenging part of this assignment so far has been trying to wrestle with DynamoDB querying due to its limited functionality, alongside general troubleshooting for the various bugs. I wasted a lot of time trying to make my vision for the program work, and failing to properly fix issues.


The entire backend functionality of the project should be entirely sound, as in data is properly stored in the database, the games function exactly as a tic-tac-toe game should (even with larger sizes possible), and some of the messaging works.
However, there are many, many buggy parts that simply stopped working close to the deadline. Messages aren't sent when players start a game, moves cannot be validated even when they contain all necessary components, and the CLI interface is entirely missing. None of this should take much time to fix or add, but clearly I've run out of time to do this before the due date.


Although my system for storing the game data is very neat, both in the structure and how it functions without needing to fetch the game during updates, if I had instead just done the simple 3x3 array implementation I'm certain I would have completed all this on time.


1:45AM Update:
As I expected entirely fixing all of the bugs didn't take too much time, small things here and there that caused issues. Implementing in the activity for games ended up taking roughly half the time. Everything but the CLI is now 100% functional

Will add functionality for CLI shortly


4:30AM Update:
Added in full functionality for CLI, project is now 100% fully functional with all areas completed and (probably?? 90% sure) bug free. The only thing that I'd still kind of want to do is go back and provide comments for large sections of the code, especially in the application scripts. With the unique way I set things up, it's probably pretty hard to understand (but I can confirm that it 100% works)

It'd be nice, but I don't really expect anything for the things finished after 12:00AM. I put myself in that situation when I decided to waste 4 hours today on the overly complicated solution for representing a tic-tac-toe game, and in any case I'm happy that I feel like it was actually very educational to stick through and finish things out here. The only thing I'd say is that although what I had done at midnight was rather buggy and not very functional, this was only due to a couple errors on the same magnitude as off-by-1 errors, the large majority of the code worked perfectly fine.
