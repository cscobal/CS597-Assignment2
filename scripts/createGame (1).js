// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const size = 3

const params = {
  TableName: 'turn-based-game',
  Item: {
    gameId: '5b5ee7d8',
    user1: 'userx',
    user2: 'usero',
    row: Array(size).fill(0),
    col: Array(size).fill(0),
    diag: Array(2).fill(0),
    previousMoves: [],
    lastMoveBy: 'userx'
  }
}

documentClient.put(params).promise()
  .then(() => console.log('Game added successfully!'))
  .catch((error) => console.log('Error adding game', error))
