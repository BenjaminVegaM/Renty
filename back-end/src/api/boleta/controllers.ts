import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { validateIn } from '../functions';
import { CustomRequest } from '../middlewares';
import { StartQuery } from '../../main';

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secretkey';

async function isEmailRegistered(req: Request, res: Response): Promise<void>
{
  console.log("Checking if user exists");
  // Gets the email received
  const email = req.header('email');
  console.log("Email: ", email);
  
  // Checks if there is data missing
  if (!email) {
    res.status(401).send({
      message: 'Error: Missing data.',
    });
    return;
  }

  // Tries to get a user with the email
  const retData = await StartQuery("SELECT id FROM user WHERE email = '" + email + "';");
  const user = retData[0];
  console.log("User =", user);

  // If it doesn't find any, that means the email doesn't exists there
  if (!user) {
    res.status(200).send({
      message: 'The account does not exist.',
      response: false
    });
    return;
  }

  // If we reach this, that means the log in was successful, so we return true
  res.status(200).send({
    message: 'Account exists.',
    response: true
  });
}

async function getUserFromToken(req: Request, res: Response): Promise<void>
{
  console.log("Getting user from token");
  
  // Converts the token
  const token = req.header('token');
  console.log("Token: ", token);
  
  // Checks if there is data missing
  if (!token) {
    res.status(401).send({
      message: 'Error: Missing data.',
    });
    return;
  }

  // Tries to get the user using the token
  const retData = await StartQuery("SELECT user.id, user.name, user.email, user.run, user.region, user.commune FROM user JOIN tokens ON user.id = tokens.userID WHERE token = '" + token + "';");
  const user = retData[0];
  console.log("User ID =", user);

  // If it doesn't find any, that means the email doesn't exists there
  if (!user) {
    res.status(404).send({
      message: 'The e-mail and/or password are incorrect.',
    });
    return;
  }

  // Returns the user (if any)
  res.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      run: user.run,
      region: user.region,
      commune: user.commune
    },
  });
}

async function createAccount(req: Request, res: Response): Promise<void>
{
  console.log("Creating Account");
  console.log(req.body);

  // Checks if there is data missing
  if (!req.body || !req.body.name || !req.body.email || !req.body.password || !req.body.run || !req.body.region) {
    console.log("Error: Missing data");
    res.status(400).send({
      message: 'Error: Missing data.',
      response: false
    });
    return;
  }

  const { name, email, password, run, region, commune } = req.body;

  // Checks if the account already exist
  // Checks if the email is already registered
  // Tries to get a user with the email
  var retData = await StartQuery("SELECT id FROM user WHERE email = '" + email + "';");
  var user = retData[0];
  console.log("User =", user);

  // If it doesn't find any, that means the email doesn't exists there
  if (user) {
    console.log("This e-mail is already registered");
    res
      .status(400)
      .json({
        message: 'This e-mail is already registered.',
        response: false
      })
      .end();
    return;
  }

  // Encripts the password
  const hashedPass = bcrypt.hashSync(password, 10);

  // Creates the user using the values received
  retData = await StartQuery(`INSERT INTO user (name, email, password, run, region, commune) VALUES ('${name}', '${email}', '${hashedPass}', '${run}', '${region}', '${commune}');`);
  
  console.log("User inserted successfully");

  const idData = await StartQuery("SELECT id FROM user WHERE email = '" + email + "';");
  const idUser = idData[0].id;

  const token = jwt.sign(
    { name: email },
    SECRET_KEY,
    { expiresIn: '24h' },
  );

  const retDatatoken = await StartQuery("INSERT INTO tokens (token, userID) VALUES ('" + token + "', '" + idUser + "');");
  const tokenData = retDatatoken[0];
  console.log("Login Token SQL Return =", tokenData);

  res.status(201).send({
    message: 'Account created successfully.',
    token: {
      token,
      expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000).getTime(),
    },
    user: {
      name: name,
      email: email
    },
    response: true
  });
}

async function logIn(req: Request, res: Response): Promise<void>
{
  console.log("Logging In");

  console.log(req.body);

  // Checks if there is data missing
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: 'Error: Missing data.',
      response: false
    });
    return;
  }
  // Gets the email and password received
  const { email, password } = req.body;

  // Tries to get a user with the email
  const retData = await StartQuery("SELECT id, name, email, password FROM user WHERE email = '" + email + "';");
  const user = retData[0];
  console.log("User =", user);

  // If it doesn't find any, that means the email doesn't exists there
  if (!user) {
    res.status(404).send({
      message: 'The e-mail and/or password are incorrect.',
      response: false
    });
    return;
  }

  console.log("Password =", password);
  console.log("User.Password  =", user.password);

  /*
  const encryptedPassword = bcrypt.hashSync(user.name, 10);
  console.log("HashedPassword =", encryptedPassword);
  */

  // Checks if the password coincides with the encrypted password
  if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).send({
      message: 'The e-mail and/or password are incorrect.',
      response: false
    });
    return;
  }

  // Signs in and gets the token, I should probably use a boolean to extend the time
  // for example "Remember my account for 30 days (True/False)"
  const token = jwt.sign(
    { name: user.email },
    SECRET_KEY,
    { expiresIn: '24h' },
  );

  const retDatatoken = await StartQuery("INSERT INTO tokens (token, userID) VALUES ('" + token + "', '" + user.id + "');");
  const tokenData = retDatatoken[0];
  console.log("Login Token SQL Return =", tokenData);

  // If we reach this, that means the log in was successful, so we return
  // the token and info of the user
  res.status(200).send({
    message: 'Successfully logged in.',
    token: {
      token,
      expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000).getTime(),
    },
    user: {
      name: user.name
    },
    response: true
  });
}

async function modifyAccount(req: Request, res: Response): Promise<void>
{
  console.log("Modifying Account");

  // Converts the token
  var token = req.header('token');
  console.log("Token: ", token);

  // Checks if the token exists
  if (!token)
  {
    res.status(401).send({
      message: 'Error: You do not have access to this account.',
      response: false
    });
    return;
  }

  // Checks if there is data missing
  if (!req.body || !req.body.name || !req.body.email || !req.body.password || !req.body.run) {
    console.log("Error: Missing data");
    res.status(400).send({
      message: 'Error: Missing data.',
      response: false
    });
    return;
  }

  const { name, email, password, run } = req.body;

  // Checks if the account already exist
  // Checks if the email is already registered
  // Tries to get a user with the email
  var emailData = await StartQuery(`SELECT id FROM user WHERE email = '${email}' AND id <> ( SELECT userID FROM tokens WHERE token = '${token}' );`);
  var emailData0 = emailData[0];
  console.log("Email data =", emailData0);

  // If it doesn't find any, that means the email doesn't exists there
  if (emailData0) {
    console.log("This e-mail is already registered");
    res
      .status(400)
      .json({
        message: 'This e-mail is already registered.',
        response: false
      })
      .end();
    return;
  }

  // Encripts the password
  const hashedPass = bcrypt.hashSync(password, 10);

  // Tries to get the user using the token
  const updData = await StartQuery(`UPDATE user SET name = '${name}', email = '${email}', password = '${hashedPass}', run = '${run}' WHERE id = ( SELECT userID FROM tokens WHERE token = '${token}' );`);
  const user = updData[0];
  console.log("Update Data =", user);

  token = jwt.sign(
    { name: email },
    SECRET_KEY,
    { expiresIn: '24h' },
  );
  
  // If we reach this, that means the update was successful, so we return
  res.status(201).send({
    message: 'Account modified successfully.',
    token: {
      token,
      expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000).getTime(),
    },
    user: {
      name: name,
      email: email
    },
    response: true
  });
}

async function deleteAccount(req: Request, res: Response): Promise<void>
{
  console.log("Deleting Account");
  
  // Converts the token
  const token = req.header('token');
  console.log("Token: ", token);
  
  // Checks if there is data missing
  if (!token) {
    res.status(401).send({
      message: 'Error: You do not have access to this account.',
      response: false
    });
    return;
  }

  // Tries to get the user using the token
  const retData = await StartQuery("DELETE FROM user WHERE id IN ( SELECT userID FROM tokens WHERE token = '" + token + "' );");
  const user = retData[0];
  console.log("Ret Data =", user);

  // If we reach this, that means the deletion was successful, so we return
  res.status(200).send({
    message: 'Successfully deleted account.',
    response: true
  });
}

export default {
  isEmailRegistered,
  getUserFromToken,
  createAccount,
  logIn,
  modifyAccount,
  deleteAccount
};
