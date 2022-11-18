// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const sendMessage = require('./sendMessage')

const handlePostMoveNotification = async ({ game, mover, opponent }) => {
  // Handle when game is finished
  
  var win = false
  const winAmt = (game.game_size * (game.game_size + 1)) / 2;
  for(let i = 0; i < game.game_size; i++)
  {
    if(!win && (Math.abs(game.tttRow[i]) == winAmt || Math.abs(game.tttCol[i]) == winAmt))
    {
      win = true
    }
  }
  for(let i = 0; i < 2; i++)
  {
    if(!win && Math.abs(game.tttDiag[i]) == winAmt)
    {
      win = true
    }
  }
  if (win) {
    const AWS = require('aws-sdk')
    const documentClient = new AWS.DynamoDB.DocumentClient()
    const winnerMessage = `You beat ${mover.username} in a game of tic-tac-toe!`
    const loserMessage = `Ahh, you lost to ${opponent.username} in tic-tac-toe.`

    
    const params = {
      TableName: 'tic-tac-toe-game',
      Key: { 
        gameId: game.gameId
      },
    
      UpdateExpression: `SET active = :zero`,
      ConditionExpression: `gameId = :id`,
      ExpressionAttributeValues: {
        ':id': game.gameId,
        ':zero': 0
      },
      ReturnValues: 'ALL_NEW'
    }
    try {
      await documentClient.update(params).promise();
    } catch (error) {
      console.log("Error ending game: ", error.message);
      throw new Error("Error deactivating game");
    }
    await Promise.all([
      sendMessage({ email: mover.email, message: winnerMessage, subject: "winning" }),
      sendMessage({ email: opponent.email, message: loserMessage, subject: "losing" })
    ])
    return;
  }

  const message = `${mover.username} has moved. It's your turn next in Game ID ${game.gameId}!`
  await sendMessage({ email: opponent.email, message: message, subject: "your turn" })
};

module.exports = handlePostMoveNotification;
