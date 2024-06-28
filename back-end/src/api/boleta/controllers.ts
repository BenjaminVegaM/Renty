import { Request, Response } from 'express';
import { StartQuery } from '../../main';


async function crear(req: Request, res: Response): Promise<void>
{
  console.log("Creating Boleta");

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

async function getBoleta(req: Request, res: Response): Promise<void>
{
  console.log("Getting Boleta");

  
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
   var id = req.header('boletaID');
   console.log("id: ", id);
 
   // Checks if the token exists
   if (!token)
   {
     res.status(401).send({
       message: 'Error: The boleta ID is missing.',
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

  // Tries to get all Boletas from the Arriendo created by this user (using the token)
  var arrData = await StartQuery(`SELECT * FROM boleta WHERE id_creador = ${ userID } AND id = ${id};`);
  console.log("arrData =", arrData[0]);

  // If it doesn't find any, that means the user doesn't have any yet
  if (!arrData) {
    console.log("That boleta could not be found.");
    res
      .status(400)
      .json({
        message: 'That boleta could not be found.',
        response: true
      })
      .end();
    return;
  }

  // return the list of arriendos
  res.status(200).send({
    message: "Returned boleta.",
    response: true,
    boleta: arrData[0]
  })
}

async function getBoletas(req: Request, res: Response): Promise<void>
{
  console.log("Getting Boletas");

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

  // Tries to get all Boletas in the Arriendo created by this user (using the token)
  var bolData = await StartQuery(`SELECT * FROM boleta WHERE id_creador = ${ userID } AND id_arriendo = ${id};`);
  console.log("arrData =", bolData);

  // If it doesn't find any, that means the user doesn't have any yet
  if (!bolData) {
    console.log("That boleta could not be found.");
    res
      .status(400)
      .json({
        message: 'That boleta could not be found.',
        response: true
      })
      .end();
    return;
  }

  // return the list of boletas
  res.status(200).send({
    message: "Returned boleta.",
    response: true,
    boletas: bolData
  })
}

export default {
  crear,
  getBoletas,
  getBoleta
};
