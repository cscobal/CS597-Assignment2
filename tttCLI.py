import requests
import json

site_url = "https://bpxmhcszk7.execute-api.us-west-2.amazonaws.com/prod/"

login = ""



inp = input("Please choose one of the following options by typing in the same text:\nregister \nlogin\n\n")
headers = {'Content-Type': 'application/json'}
if(inp == "register"):
    registering = True
    while(registering == True):
        username = input("Please enter in your username to register with\n")
        password = input("Please enter in the password for this account\n")
        email = input("Please provide an email to recieve notifications at\n")
        data = '{"username": "' + username + '", "password": "' + password + '", "email": "' + email + '"}'
        r = requests.post(site_url + "users", data = data, headers = headers)
        rJson = r.json()
        if('email' in rJson and 'username' in rJson):
            print("Sucessfully registered user " + username + " with email " + email)
            registering = False
        else:
            retry = input("Registration failed. Hit enter to try registering again, or type out the word quit to move onto logon process\n")
            if(retry == "quit"):
                registering = False
print("\n")

while(inp != "login"):
    
    inp = input("Please type out the following option:\nlogin\n\n")
    
logged = ""
logging = True
username = ""
while(logging == True):
    username = input("Please type out your username\n\n")
    password = input("Please type out your password\n\n")
    data = '{"username": "' + username + '", "password": "' + password + '" }'
    r = requests.post(site_url + "login", data=data, headers=headers)
    rJson = r.json()
    if('idToken' in rJson):
        logged = rJson['idToken']
        logging = False
    else:
        retry = input("Unsucessful logon. Hit enter to try logging on again, or type out the word quit to exit the application\n\n")
        if(retry == "quit"):
            logging = False
    print("\n")

if(logged != ""):
    print("Logged in successfully as user " + username + "\n\n")
    newHeaders = headers
    newHeaders.update({'Authorization': logged})
    choosing = True
    choice = ""
    while(choosing == True):
        choice = input("Please choose one of the following options by fully typing out the option:\ncreate\njoin\n\n")
        if(choice == "create" or choice == "join"):
            choosing = False
        else:
            retry = input("No option selected, hit enter to choose again, or type out the word quit to quit the application\n")
            if(retry == "quit"):
                choosing = False
    if(choice != ""):
        gameId = ""
        if(choice == "create"):
            opponent = input("Please enter in the full username of an opponent\n\n")
            size = input("Please input the desired size of row/columns for the game (i.e entering 3 gives a 3x3 board)\n\n")

            data = '{"opponent": "' + opponent + '", "size": ' + size + '}'
            r = requests.post(site_url + "games", data=data, headers=newHeaders)
            rJson = r.json()
            if('gameId' not in rJson):
                print("Incorrect parameters given for the game creation, exiting...\n")
            else: 
                gameId = rJson['gameId']
        elif(choice == "join"):
            gameId = input("Please enter in the gameId sent to your email address used in registration\n\n")
        r = requests.get(site_url + "games/" + gameId)
        rJson = r.json()
        turn = rJson['lastMoveBy']
        size = rJson['game_size']
        board = [["" for i in range(size)] for y in range(size)]
        opponent = rJson['user1']
        if(username == opponent):
            opponent = rJson['user2']

        if(rJson['user1'] == username or rJson['user2'] == username):
            playing = True
            while(playing):
                active = rJson['active']
                moves = rJson['previousMoves']
                
                for move in moves:
                    if(move[0] != -1):
                        board[move[0] - 1][move[1] - 1] = move[2]
                currMove = rJson['currMove'][0]
                
                if(currMove[0] != -1):
                    board[currMove[0] - 1][currMove[1] - 1] = currMove[2]
                print("Printing board of game " + gameId + " of user " + username + " against " + opponent + ":\n")
                for row in board:
                    print(row)
                print("\n")
                
                if(active == 0):
                    print("This game is no longer active\n")
                    if(turn == username):
                        print("Congratulations! You won against " + opponent + "!\n\n")
                    else:
                        print("You were beaten by " + opponent + "!\n\n")
                    playing = False
                else:
                    if(turn != username):
                        moving = True
                        while(moving):
                            rowInp = input("It is your turn! Please enter the row index (indexed starting from 1) for your desired row\n\n")
                            colInp = input("Now enter in the desired column index (starting from 1)\n\n")
                            type = rJson['currentValue'][0][0][0]
                            print("Attempting to place a " + type + " in cell (" + rowInp + ", " + colInp + ")\n\n")
                            data = '{"changedRow": ' + rowInp + ', "changedCol": ' + colInp + ' }'
                            rp = requests.post(site_url + "games/" + gameId, data=data, headers=newHeaders)
                            rpJson = rp.json()
                            if('currMove' in rpJson):
                                moving = False
                                board[int(rowInp) - 1][int(colInp) - 1] = type
                                r = requests.get(site_url + "games/" + gameId)
                                rJson = r.json()
                                turn = rJson['lastMoveBy']
                            else:
                                print("Could not place a " + type + " in cell (" + rowInp + ", " + colInp + ")\nPlease enter a valid row and column\n\n")
                            print("Printing board of game " + gameId + " of user " + username + " against " + opponent + ":\n")
                            for row in board:
                                print(row)
                            print("\n")
                            
                    else:
                        waiting = True
                        while(waiting):
                            wait = input("It is not your turn. You may type out the word refresh to check if the opponent has made a move, or the word quit to quit the program\n\n")
                            if(wait == "refresh"):
                                r = requests.get(site_url + "games/" + gameId)
                                rJson = r.json()
                                turn = rJson['lastMoveBy']
                                waiting = False
                            elif(wait == "quit"):
                                waiting = False
                                playing = False
                        
        else:
            print("You are not playing in this game")