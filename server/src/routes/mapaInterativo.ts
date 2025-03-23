// server/src/routes/mapaInterativo.ts
import { Router } from 'express';
import mongoose from 'mongoose';
import { MapaInterativoModel } from '../models/MapaInterativo.model';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const pontos = await MapaInterativoModel.find();
    res.json(pontos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter pontos do mapa', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { municipio, localizacao, atualizadoPor } = req.body;
    const novoPonto = new MapaInterativoModel({
      municipio,
      localizacao,
      atualizadoPor: new mongoose.Types.ObjectId(atualizadoPor)
    });
    const pontoSalvo = await novoPonto.save();
    res.status(201).json(pontoSalvo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar ponto ao mapa', error });
  }
});

export default router;
