// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require("uuid/v4");
const sendMessage = require("./sendMessage");


const createGame = async ({ creator, opponent, size }) => {
  const vals = Array.from(Array(size), (_, i) => i + 1)

  const dSum = [Array.from(Array((size * 2) + 1), () => new Array(size).fill(0)), Array.from(Array((size * 2) + 1), () => new Array(size).fill(0))]
  dSum[0][size + 1] = vals 
  dSum[1][size + 1] = Array.from(vals, i => -i)

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
      diagSum: dSum,
      currentValue: [[['x'], vals], [['o'], Array.from(vals, i => -i)]],
      currMove: [[-1, -1, '=']]
    }
  };

  try {
    await documentClient.put(params).promise();
  } catch (error) {
    console.log("Error creating game: ", error.message);
    throw new Error("Could not create game");
  }

  const message = `Hi ${opponent.username}. Your friend ${creator} has invited you to a new game! Your game ID is ${params.Item.gameId}`;
  try {
    await sendMessage({ phoneNumber: opponent.phoneNumber, message });
  } catch (error) {
    console.log("Error sending message: ", error.message);
    throw new Error("Could not send message to user");
  }

  return params.Item;
};

module.exports = createGame;
