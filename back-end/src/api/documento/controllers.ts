import { Request, Response } from 'express';

import { docRepo } from '../../data/functions/documentos';
import { usuariosRepo } from '../../data/functions/usuarios';
import { validateIn } from '../functions';
import { CustomRequest } from '../middlewares';
import { Usuario } from '../../data/entity/Usuario';

async function getDocs(req: Request, res: Response) {
  const docs = await docRepo.find();
  res.status(200).json({
    message: 'Lista de documentos',
    docs,
  });
}

async function addDocs(req: Request, res: Response) {
  if (!validateIn(req.body, ['masive'])) {
    res.status(400).json({
      message: 'Error: No se han recibido todos los datos necesarios',
    });
    return;
  }
  const docsReq: {titulo: string, contenido: string}[] = req.body.masive;
  const { username } = (req as CustomRequest).token;
  const user = await usuariosRepo.findOneBy({ username });
  const docs = docRepo.create(docsReq.map((doc) => ({...doc, usuario: user })));
  const savedDoc = await docRepo.save(docs);
  res.status(201).json({
    message: 'Documentos creados con éxito',
    doc: savedDoc.map(doc => ({...doc, usuario: user.username})),
  });
  return;
}

async function addDoc(req: Request, res: Response) {
  if (!validateIn(req.body, ['titulo', 'contenido'])) {
    res.status(400).json({
      message: 'Error: No se han recibido todos los datos necesarios',
    });
    return;
  }
  const { titulo, contenido } = req.body;
  const { username } = (req as CustomRequest).token;
  const doc = docRepo.create({ titulo, contenido, usuario: await usuariosRepo.findOneBy({ username })});
  const savedDoc = await docRepo.save(doc);
  res.status(201).json({
    message: 'Documento creado con éxito',
    doc: {
      ...savedDoc,
      usuario: username,
    },
  });
}

async function updateDoc(req: Request, res: Response) {
  if (!validateIn(req.body, ['id'])) {
    res.status(400).json({
      message: 'Error: No se han recibido todos los datos necesarios',
    });
    return;
  }
  const { id, titulo, contenido } = req.body;
  const doc = await docRepo.findOneBy({id});
  if (!doc) {
    res.status(404).json({
      message: 'Documento no encontrado',
    });
    return;
  }
  doc.titulo = titulo ?? doc.titulo;
  doc.contenido = contenido ?? doc.contenido;
  const savedDoc = await docRepo.save(doc);
  res.status(200).json({
    message: 'Documento actualizado con éxito',
    doc: savedDoc,
  });
}

async function deleteDoc(req: Request, res: Response) {
  if (!validateIn(req.body, ['id'])) {
    res.status(400).json({
      message: 'Error: No se han recibido todos los datos necesarios',
    });
    return;
  }
  const { id } = req.body;
  const doc = await docRepo.findOneBy({id});
  if (!doc) {
    res.status(404).json({
      message: 'Documento no encontrado',
    });
    return;
  }
  await docRepo.delete(id);
  res.status(200).json({
    message: 'Documento eliminado con éxito'
  });
}

export default { getDocs, addDocs, addDoc, updateDoc, deleteDoc};
