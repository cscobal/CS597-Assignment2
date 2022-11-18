// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require("aws-sdk");
const ses = new AWS.SES();
console.log('test')

const sendMessage = async ({ email, message, subject }) => {
  var params = {
  Destination: { /* required */
    CcAddresses: [
        email
    ],
    ToAddresses: [
      email
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: "HTML_FORMAT_BODY"
      },
      Text: {
       Charset: "UTF-8",
       Data: message
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: subject
     }
    },
  Source: 'cscobal@gmail.com', /* required */
};

  return ses.sendEmail(params).promise();
};

module.exports = sendMessage;
