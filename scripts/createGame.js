// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const size = 3
const vals = Array.from(Array(size), (_, i) => i + 1)

const params = {
  TableName: 'tic-tac-toe-game',
  Item: {
    gameId: '5b5ee7d8',
    user1: 'userx',
    user2: 'usero',
    size: size,
    tttRow: Array(size).fill(0),
    tttCol: Array(size).fill(0),
    tttDiag: Array(2).fill(0),
    previousMoves: [],
    lastMoveBy: 'usero',
    currentValue: [[['x'], vals], [['o'], Array.from(vals, i => -i)]],
    currMove: [[-1, -1, '=']]
  }
}

documentClient.put(params).promise()
  .then((error) => console.log('Game added successfully!'))
  .catch((error) => console.log('Error adding game', error))
