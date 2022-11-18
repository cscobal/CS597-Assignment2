// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

const fetchGame = async gameId => {
  const params = {
    TableName: "tic-tac-toe-game",
    Key: {
      gameId: gameId
    }
  };

  try {
    const game = await documentClient.get(params).promise();
    return game.Item;
  } catch (error) {
    console.log("Error fetching game: ", error.message);
    throw new Error("Could not fetch game");
  }
};

const performMove = async ({ gameId, user, changedRow, changedCol }) => {
  
  
  
  if (changedRow < 1 || changedCol < 1) {
    throw new Error('Indices ' + changedRow + ', ' + changedCol + ' must be greater than 0')
  }
  if(!Number.isInteger(changedRow) || !Number.isInteger(changedCol)) {
    throw new Error('Cell indices ' + changedRow + ', ' + changedCol + ' must both be integers')
  }
  
  const attemptMove = [changedRow, changedCol]

  
 
  /*
  const newRow = currGame.tttRow
  newRow[changedRow - 1] += scal * changedRow
  
  const newCol = currGame.tttCol
  newCol[changedCol - 1] += scal * changedCol
  
  const newDiag = currGame.tttDiag
  
  if(changedRow == changedCol) {
    newDiag[0] += scal * changedRow
    if(changedRow == (currGame.size + 1) / 2) {
      newDiag[1] += scal * changedRow
    }
  } else if (changedRow + changedCol == currGame.size + 1)
  {
    newDiag[1] += scal * changedRow
  }
  */
  
  const newRow = [changedRow, -changedRow]
  const newCol = [changedCol, -changedCol]
  

  const attemptMoveInv = [...attemptMove]
  attemptMove.push(1)
  attemptMoveInv.push(-1)
  
  
  
  const rowInd = "tttRow[" + (changedRow - 1) + "]" 
  const colInd = "tttCol[" + (changedCol - 1) + "]"
  
  const rowVal = "currentValue[0][1][" + (changedRow - 1) + "]"
  const colVal = "currentValue[0][1][" + (changedCol - 1) + "]"
  
  const moveXCheck = [...attemptMove]
  
  const moveOCheck = [...attemptMove]
  
  moveXCheck.push('x')
  moveOCheck.push('o')

  
  const mathHolder = "[currentValue[1], currentValue[0]]"
  
  const params = {
    TableName: 'tic-tac-toe-game',
    Key: { 
      gameId: gameId
    },
    
  
    
    //previousMoves = list_append(previousMoves, :newMoveAdd), 
    // AND NOT (contains(previousMoves, :newMove ) OR contains(previousMoves, :newMoveInv ))
    UpdateExpression: `SET lastMoveBy = :user, ${rowInd} = ${rowInd} + ${rowVal}, ${colInd} = ${colInd} + ${colVal}, currentValue[0] = currentValue[1], currentValue[1] = currentValue[0], currMove[0] = list_append(:newMove, currentValue[0][0]), previousMoves = list_append(previousMoves, currMove)`,
    ConditionExpression: `(user1 = :user OR user2 = :user) AND lastMoveBy <> :user AND (:absRow <= size AND :absCol <= size) AND NOT (:xCheck = currMove[0] OR :oCheck = currMove[0]) AND NOT (contains(previousMoves, :xCheck) OR contains(previousMoves, :oCheck))`,
    
    ExpressionAttributeValues: {
      ':user': user,
      ':absRow': changedRow,
      ':absCol': changedCol,
      ':newMove': attemptMove,
      ':xCheck': moveXCheck,
      ':oCheck': moveOCheck
      //':newMoveAdd': [attemptMove],
      //':newMove': attemptMove,
      //':newMoveInv': attemptMoveInv
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

performMove({ gameId: '5b5ee7d8', user: 'userx', changedRow: 1, changedCol: 3 })
