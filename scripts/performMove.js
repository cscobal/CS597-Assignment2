// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()
const fetchGame = require("./fetchGame");

const performMove = async ({ gameId, user, changedRow, changedCol }) => {
  const currGame = fetchGame(gameId)
  
  const legalMoves = Array.from(Array(size), (_, i) => i + 1);
  if (!legalMoves.contains(changedRow) || !legalMoves.contains(changedCol)  ) {
    throw new Error('Indices ' + changedRow + ', ' + changedCol + ' are not valid')
  }
  
  const size = currGame.size
  const prevMoves = currGame.previousMoves
  
  const attemptMove = [changedRow, changedCol]
  
  if(prevMoves.contains(attemptMove.push(1)) || prevMoves.contains(attemptMove.push(-1)))
  {
    throw new Error('Cell ' + changedRow + ', ' + changedCol + ' has already been taken')
  }
  const scal = -1
  if(currGame.user1 == user) {
    scal = 1
  }
  const newRow = currGame.row
  newRow[changedRow - 1] += scal * changedRow
  
  const newCol = currGame.col
  newCol[changedCol - 1] += scal * changedCol
  
  const newDiag = currGame.diag
  
  if(changedRow == changedCol) {
    newDiag[0] += scal * changedRow
    if(changedRow == (size + 1) / 2) {
      newDiag[1] += scal * changedRow
    }
  } else if (changedRow + changedCol == size + 1)
  {
    newDiag[1] += scal * changedRow
  }

  prevMoves.push(attemptMove.push(scal))
  
  newRow
  const params = {
    TableName: 'tic-tac-toe-game',
    Key: { 
      gameId: gameId
    },
    UpdateExpression: `SET lastMoveBy = :user, row = :newRow, col = :newCol, diag = :newDiag, previousMoves = :prevMoves`,
    ConditionExpression: `(user1 = :user OR user2 = :user) AND lastMoveBy <> :user`,
    ExpressionAttributeValues: {
      ':user': user,
      ':newRow': newRow,
      ':newCol': newCol,
      ':newDiag': newDiag,
      ':prevMoves': prevMoves
    },
    ReturnValues: 'ALL_NEW'
  }
  try {
    const resp = await documentClient.update(params).promise()
    console.log('Updated game: ', resp.Attributes)
  } catch (error) {
    console.log('Error updating item: ', error.message)
  }
};

performMove({ gameId: '5b5ee7d8', user: 'userx', changedHeap: 1, changedCol: 1 })
