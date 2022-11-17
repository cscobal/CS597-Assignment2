// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const sendMessage = require('./sendMessage')

const handlePostMoveNotification = async ({ game, mover, opponent }) => {
  // Handle when game is finished
  
  const win = false
  const winAmt = (game.size * (game.size + 1)) / 2;
  for(let i = 0; i < game.size; i++)
  {
    if(!win && (Math.abs(game.row[i]) == winAmt || Math.abs(game.col[i]) == winAmt))
    {
      win = true
    }
  }
  for(let i = 0; i < 2; i++)
  {
    if(!win && Math.abs(game.diag[i]) == winAmt)
    {
      win = true
    }
  }
  if (win) {
    const winnerMessage = `You beat ${mover.username} in a game of tic-tac-toe!`
    const loserMessage = `Ahh, you lost to ${opponent.username} in tic-tac-toe.`
    await Promise.all([
      sendMessage({ phoneNumber: opponent.phoneNumber, message: winnerMessage }),
      sendMessage({ phoneNumber: mover.phoneNumber, message: loserMessage })
    ])

    return
  }

  const message = `${mover.username} has moved. It's your turn next in Game ID ${game.gameId}!`
  await sendMessage({ phoneNumber: opponent.phoneNumber, message })
};

module.exports = handlePostMoveNotification;