// Classe base para os Usuários do sistema

import { Document, Schema, model } from 'mongoose';
import { MapaInterativoModel } from '../MapaInterativo.model';

export interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;
  role: string;
}

const UsuarioSchema = new Schema<IUsuario>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'profissional', 'autoridade', 'analista'] }
});

UsuarioSchema.methods.visualizarMapa = async function () {
  return MapaInterativoModel.find().exec();
}

export const UsuarioModel = model<IUsuario>('Usuario', UsuarioSchema);