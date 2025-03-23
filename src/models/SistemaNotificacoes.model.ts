import { Document, Schema, model } from 'mongoose';

export interface ISistemaNotificacoes extends Document {
  detalhes: string;
  bairro: string;
}

const SistemaNotificacoesSchema = new Schema<ISistemaNotificacoes>({
  detalhes: { type: String, required: true },
  bairro: { type: String, required: true }
});

export const SistemaNotificacoesModel = model<ISistemaNotificacoes>(
  'SistemaNotificacoes',
  SistemaNotificacoesSchema
);