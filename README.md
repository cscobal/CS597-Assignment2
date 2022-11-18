To run the tic-tac-toe game, follow the printed instructions given when running the python program in the command line. It will oftentimes list out several options and ask you to type them out, in this case make sure that you type out the word exactly the same as shown. Other times, you will be giving the program input based on your username/email/password/gameId, in these cases also type out the input with no formatting

General program flow is first checking whether the user wants to register, running registering code until success or the user chooses to stop, transisitioning to logon code, which will run until success or user decides to exit the program. Finally, the user will choose between creating/joining a game, it is assumed here that the provided options for either will be correct. Either way, the user will load into the game state, where they can view the state of board, take a turn if it is their turn, or periodically refresh the board state if they are waiting. Upon a winning move, the winner will be notified and the game closed, the loser will need to refresh to see that they lost. Inactive games can still be viewed by the participating players, but a player not playing in a game cannot view it at all

Last note is to specify piece placement by the row & column number, so placing in the middle of a 3x3 board would mean inputting 2 and 2 for row & column. Different size boards can also be played if desired.
