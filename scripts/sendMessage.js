// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require("aws-sdk");
const ses = new AWS.SES();

const sendMessage = async ({ email, message, subject }) => {
  const params = {
    Destination: { /* required */
    ToAddresses: [email]
    },
    Message: { /* required */
    Body: { /* required */
      Text: {
       Data: message
      }
     },
     Subject: {
      Data: subject
     }
    },
  Source: 'cscobal@gmail.com', /* required */
  };

  return ses.sendEmail(params).promise();
};


sendMessage({ email: process.env.EMAIL, message: 'Sending a message from SES!', subject: "yo"})
  .then(() => console.log('Sent message successfully'))
  .catch((error) => console.log('Error sending SNS: ', error.message))
