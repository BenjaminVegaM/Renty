import { Request, Response } from 'express';
import { StartQuery } from '../../main';


async function crear(req: Request, res: Response): Promise<void>
{
  console.log("Creating Cobro");

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
  if (!req.body || !req.body.nombre || !req.body.valor || !req.body.boletaID ) {
    console.log("Error: Missing data");
    res.status(400).send({
      message: 'Error: Missing data.',
      response: false
    });
    return;
  }

  const { nombre, valor, boletaID } = req.body;

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
  await StartQuery(`INSERT INTO cobro (nombre, valor, pagado, id_creador, id_boleta) VALUES ('${nombre}', '${valor}', 0, ${userID}, ${boletaID});`);
  
  console.log("Cobro inserted successfully");

  res.status(201).send({
    message: 'Cobro created successfully.',
    cobro: {
      nombre,
      valor,
      boletaID,
      userID: userID
    },
    response: true
  });
}

async function getCobro(req: Request, res: Response): Promise<void>
{
  console.log("Getting Cobro");

  
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
   var id = req.header('cobroID');
   console.log("id: ", id);
 
   if (!id)
   {
     res.status(401).send({
       message: 'Error: The cobro ID is missing.',
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

  // Tries to get all Cobros from the Boleta created by this user (using the token)
  var cobrData = await StartQuery(`SELECT * FROM cobro WHERE id_creador = ${ userID } AND id = ${id};`);
  console.log("arrData =", cobrData[0]);

  // If it doesn't find any, that means the user doesn't have any yet
  if (!cobrData) {
    console.log("That cobro could not be found.");
    res
      .status(400)
      .json({
        message: 'That cobro could not be found.',
        response: true
      })
      .end();
    return;
  }

  // return the list of boletas
  res.status(200).send({
    message: "Returned cobro.",
    response: true,
    cobro: cobrData[0]
  })
}

async function getCobros(req: Request, res: Response): Promise<void>
{
  console.log("Getting Cobros");

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
   if (!id)
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

  // Tries to get all Cobros in the Boleta created by this user (using the token)
  var cobData = await StartQuery(`SELECT * FROM cobro WHERE id_creador = ${ userID } AND id_boleta = ${id};`);
  console.log("arrData =", cobData);

  // If it doesn't find any, that means the user doesn't have any yet
  if (!cobData) {
    console.log("That cobro could not be found.");
    res
      .status(400)
      .json({
        message: 'That cobro could not be found.',
        response: true
      })
      .end();
    return;
  }

  // return the list of cobros
  res.status(200).send({
    message: "Returned cobro.",
    response: true,
    cobros: cobData
  })
}

async function pagarCobro(req: Request, res: Response): Promise<void>
{
  console.log("Pagando Cobro");

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
   var id = req.header('cobroID');
   console.log("id: ", id);
 
   // Checks if the token exists
   if (!id)
   {
     res.status(401).send({
       message: 'Error: The cobro ID is missing.',
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

  // Tries to get all Cobros from the Boleta created by this user (using the token)
  var cobrData = await StartQuery(`UPDATE cobro SET pagado = 1 WHERE id_creador = ${ userID } AND id = ${id};`);
  console.log("arrData =", cobrData);

  // If it doesn't find any, that means the user doesn't have any yet
  if (!cobrData) {
    console.log("That cobro could not be found.");
    res
      .status(400)
      .json({
        message: 'That cobro could not be found.',
        response: true
      })
      .end();
    return;
  }

  // return the list of boletas
  res.status(200).send({
    message: "Cobro paid successfully.",
    response: true,
    cobro: cobrData[0]
  })
}

async function despagarCobro(req: Request, res: Response): Promise<void>
{
  console.log("Despagando Cobro");

  
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
   var id = req.header('cobroID');
   console.log("id: ", id);
 
   // Checks if the token exists
   if (!token)
   {
     res.status(401).send({
       message: 'Error: The cobro ID is missing.',
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

  // Tries to get all Cobros from the Boleta created by this user (using the token)
  var cobrData = await StartQuery(`UPDATE cobro SET pagado = 0 WHERE id_creador = ${ userID } AND id = ${id};`);
  console.log("arrData =", cobrData);

  // If it doesn't find any, that means the user doesn't have any yet
  if (!cobrData) {
    console.log("That cobro could not be found.");
    res
      .status(400)
      .json({
        message: 'That cobro could not be found.',
        response: true
      })
      .end();
    return;
  }

  // return the list of boletas
  res.status(200).send({
    message: "Cobro paid successfully.",
    response: true,
    cobro: cobrData[0]
  })
}

async function pagar(req: Request, res: Response): Promise<void>
{
  console.log("PAGANDO");

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
  if (!req.body || !req.body.nombre || !req.body.valor || !req.body.boletaID ) {
    console.log("Error: Missing data");
    res.status(400).send({
      message: 'Error: Missing data.',
      response: false
    });
    return;
  }

  const { nombre, valor, boletaID } = req.body;

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
  await StartQuery(`INSERT INTO cobro (nombre, valor, pagado, id_creador, id_boleta) VALUES ('${nombre}', '${valor}', 0, ${userID}, ${boletaID});`);
  
  console.log("Cobro inserted successfully");

  res.status(201).send({
    message: 'Cobro created successfully.',
    cobro: {
      nombre,
      valor,
      boletaID,
      userID: userID
    },
    response: true
  });
}

export default {
  crear,
  getCobros,
  getCobro,
  pagarCobro,
  despagarCobro
};
