import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { validateIn } from '../functions';
import { CustomRequest } from '../middlewares';
import { StartQuery } from '../../main';

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secretkey';

async function getArriendo(req: Request, res: Response): Promise<void>
{
  console.log("Getting Arriendos");

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

   // Converts the id
   var id = req.header('arriendoID');
   console.log("id: ", id);
 
   // Checks if the token exists
   if (!token)
   {
     res.status(401).send({
       message: 'Error: The arriendo ID is missing.',
       response: false
     });
     return;
   }

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

  // Tries to get all Arriendos created by this user (using the token)
  var arrData = await StartQuery(`SELECT * FROM arriendo WHERE id_creador = ${ userID } AND id = ${id};`);
  console.log("arrData =", arrData[0]);

  // If it doesn't find any, that means the user doesn't have any yet
  if (!arrData) {
    console.log("That arriendo could not be found.");
    res
      .status(400)
      .json({
        message: 'That arriendo could not be found.',
        response: true
      })
      .end();
    return;
  }

  // return the list of arriendos
  res.status(200).send({
    message: "Returned arriendo.",
    response: true,
    arriendo: arrData[0]
  })
}

async function getListaArriendos(req: Request, res: Response): Promise<void>
{
  console.log("Getting Arriendos");

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

  // Tries to get all Arriendos created by this user (using the token)
  var arrData = await StartQuery(`SELECT * FROM arriendo WHERE id_creador = ${ userID };`);
  console.log("arrData =", arrData);

  // If it doesn't find any, that means the user doesn't have any yet
  if (!arrData) {
    console.log("The user does not have any arriendos registered.");
    res
      .status(400)
      .json({
        message: 'The user does not have any arriendos registered.',
        response: true
      })
      .end();
    return;
  }

  // return the list of arriendos
  res.status(200).send({
    message: "Returned arriendos.",
    response: true,
    arriendos: arrData
  })
}

async function crear(req: Request, res: Response): Promise<void>
{
  console.log("Creating Arriendo");

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

  console.log(req.body);

  // Checks if there is data missing
  if (!req.body || !req.body.name || !req.body.note ) {
    console.log("Error: Missing data");
    res.status(400).send({
      message: 'Error: Missing data.',
      response: false
    });
    return;
  }

  const { name, note } = req.body;

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
  await StartQuery(`INSERT INTO arriendo (nombre, nota, id_creador) VALUES ('${name}', '${note}', ${userID});`);
  
  console.log("Arriendo inserted successfully");

  res.status(201).send({
    message: 'Arriendo created successfully.',
    arriendo: {
      name: name,
      note: note,
      userID: userID
    },
    response: true
  });
}

async function modificar(req: Request, res: Response): Promise<void>
{

}

async function eliminar(req: Request, res: Response): Promise<void>
{

}

async function cambiarCliente(req: Request, res: Response): Promise<void>
{

}

async function verBoletas(req: Request, res: Response): Promise<void>
{

}

async function verCliente(req: Request, res: Response): Promise<void>
{

}

async function getDatosPagos(req: Request, res: Response): Promise<void>
{

}

export default {
  getArriendo,
  getListaArriendos,
  crear,
  modificar,
  eliminar,
  cambiarCliente,
  verBoletas,
  verCliente,
  getDatosPagos
};
