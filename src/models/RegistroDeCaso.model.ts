import { Document, Schema, model, Types } from 'mongoose';
import { SistemaNotificacoesModel } from './SistemaNotificacoes.model';

export interface IRegistroDeCaso extends Document {
  data: Date;
  localizacao: string;
  descricao: string;
  profissional: Types.ObjectId;
}

const RegistroDeCasaSchema = new Schema<IRegistroDeCaso>({
  data: { type: Date, default: Date.now },
  localizacao: { type: String, required: true },
  descricao: { type: String, required: true },
  profissional: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

// Middleware para alimentar notificações
RegistroDeCasaSchema.post('save', async function(doc) {
  await SistemaNotificacoesModel.create({
    detalhes: `Novo caso registrado: ${doc.descricao}`,
    bairro: doc.localizacao
  });
});

export const RegistroDeCasoModel = model<IRegistroDeCaso>('RegistroDeCaso', RegistroDeCasaSchema);