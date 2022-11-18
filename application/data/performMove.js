// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

const performMove = async ({ gameId, user, changedRow, changedCol }) => {
  
  if (changedRow < 1 || changedCol < 1) {
    throw new Error('Indices ' + changedRow + ', ' + changedCol + ' must be greater than 0')
  }
  if(!Number.isInteger(changedRow) || !Number.isInteger(changedCol)) {
    throw new Error('Cell indices ' + changedRow + ', ' + changedCol + ' must both be integers')
  }
  
  const attemptMove = [changedRow, changedCol]
 
  var newDiag = 0
  const diagVal = changedRow + changedCol
  if(changedRow == changedCol) {
    newDiag = "tttDiag[0] + currentValue[0][1][" + (changedRow - 1) + "]"
    
  } else {
    newDiag = "tttDiag[0]"
  }

  const firstDiag = "tttDiag[0]"
  
  const secondDiag = "tttDiag[1]"

  const calcDiag = "tttDiag[1] + diagSum[0][" + diagVal + "][" + (changedRow - 1) + "]"
  
  const rowInd = "tttRow[" + (changedRow - 1) + "]" 
  const colInd = "tttCol[" + (changedCol - 1) + "]"
  
  const rowVal = "currentValue[0][1][" + (changedCol - 1) + "]"
  const colVal = "currentValue[0][1][" + (changedRow - 1) + "]"
  
  const moveXCheck = [...attemptMove]
  
  const moveOCheck = [...attemptMove]
  
  
  moveXCheck.push('x')
  moveOCheck.push('o')
  
  const params = {
    TableName: 'tic-tac-toe-game',
    Key: { 
      gameId: gameId
    },
  
    UpdateExpression: `SET lastMoveBy = :user, ${rowInd} = ${rowInd} + ${rowVal}, ${colInd} = ${colInd} + ${colVal}, ${firstDiag} = ${newDiag}, ${secondDiag} = ${calcDiag}, currentValue[0] = currentValue[1], currentValue[1] = currentValue[0], currMove[0] = list_append(:newMove, currentValue[0][0]), previousMoves = list_append(previousMoves, currMove), diagSum[0] = diagSum[1], diagSum[1] = diagSum[0]`,
    ConditionExpression: `active = :one AND (user1 = :user OR user2 = :user) AND lastMoveBy <> :user AND (:absRow <= game_size AND :absCol <= game_size) AND NOT (:xCheck = currMove[0] OR :oCheck = currMove[0]) AND NOT (contains(previousMoves, :xCheck) OR contains(previousMoves, :oCheck))`,
    
    ExpressionAttributeValues: {
      ':user': user,
      ':absRow': changedRow,
      ':absCol': changedCol,
      ':newMove': attemptMove,
      ':xCheck': moveXCheck,
      ':oCheck': moveOCheck,
      ':one': 1
    },
    ReturnValues: 'ALL_NEW'
  }
  try {
    const resp = await documentClient.update(params).promise();
    return resp.Attributes;
  } catch (error) {
    console.log("Error updating item: ", error.message);
    throw new Error('Could not perform move')
  }
};

module.exports = performMove
