import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { validateIn } from '../functions';
import { CustomRequest } from '../middlewares';
import { StartQuery } from '../../main';

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secretkey';


async function crear(req: Request, res: Response): Promise<void>
{
  console.log("Creating Boleta");

  // Converts the token
  var token = req.header('token');
  console.log("Token: ", token);
  //var arriendoID = req.header('arriendoID');
  //console.log("arriendoID: ", arriendoID);

  // Checks if the token exists
  if (!token)
  {
    res.status(401).send({
      message: 'Error: You do not have access to this account.',
      response: false
    });
    return;
  }

  console.log(req.body);

  // Checks if there is data missing
  if (!req.body || !req.body.date || !req.body.arriendoID ) {
    console.log("Error: Missing data");
    res.status(400).send({
      message: 'Error: Missing data.',
      response: false
    });
    return;
  }

  const { date, arriendoID } = req.body;

  // Checks if the token is valid
  var userData = await StartQuery(`SELECT id FROM usuario WHERE id = ( SELECT id_cuenta FROM tokens WHERE token = '${token}' );`);
  var userID = userData[0].id;
  console.log("User ID from Token =", userID);

   // If it doesn't find any, that means the token is not valid
   if (!userID) {
    console.log("Token invalid.");
    res
      .status(400)
      .json({
        message: 'This token is invalid.',
        response: false
      })
      .end();
    return;
  }

  // Creates the user using the values received
  await StartQuery(`INSERT INTO boleta (fecha, id_creador, id_arriendo) VALUES ('${date}', ${userID}, ${arriendoID});`);
  
  console.log("Boleta inserted successfully");

  res.status(201).send({
    message: 'Boleta created successfully.',
    boleta: {
      date: date,
      userID: userID
    },
    response: true
  });
}

export default {
  crear
};
