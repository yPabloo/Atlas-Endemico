// server/src/routes/mapaInterativo.ts
import { Router } from 'express';
import { RegistroDeCasoModel } from '../models/RegistroDeCaso.model';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const pontos = await RegistroDeCasoModel.find();
    res.json(pontos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter Registros', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { data, localizacao, descricao, profissional } = req.body;
    const novoCaso = new RegistroDeCasoModel({
      data,
      localizacao,
      descricao,
      profissional,
    });
    const pontoSalvo = await novoCaso.save();
    res.status(201).json(pontoSalvo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar Registro de Caso', error });
  }
});

export default router;
