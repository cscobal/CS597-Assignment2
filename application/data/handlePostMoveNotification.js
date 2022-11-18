// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const sendMessage = require('./sendMessage')

const handlePostMoveNotification = async ({ game, mover, opponent }) => {
  // Handle when game is finished
  
  const win = false
  const winAmt = (game.size * (game.size + 1)) / 2;
  for(let i = 0; i < game.size; i++)
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
    const winnerMessage = `You beat ${mover.username} in a game of tic-tac-toe!`
    const loserMessage = `Ahh, you lost to ${opponent.username} in tic-tac-toe.`
    await Promise.all([
      sendMessage({ email: opponent.email, message: winnerMessage, subject: "losing" }),
      sendMessage({ email: mover.email, message: loserMessage, subject: "winning" })
    ])

    return
  }

  const message = `${mover.username} has moved. It's your turn next in Game ID ${game.gameId}!`
  await sendMessage({ email: opponent.email, message: message, subject: "your turn" })
};

module.exports = handlePostMoveNotification;
