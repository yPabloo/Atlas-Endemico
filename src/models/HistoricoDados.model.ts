import { Document, Schema, model } from 'mongoose';

export interface IHistoricoDados extends Document {
  data: Date;
  localizacao: string;
  descricao: string;
  ferramentaAnalise?: Types.ObjectId;
}

const HistoricoDadosSchema = new Schema<IHistoricoDados>({
  data: { type: Date, default: Date.now },
  localizacao: { type: String, required: true },
  descricao: { type: String, required: true },
  ferramentaAnalise: { type: Schema.Types.ObjectId, ref: 'FerramentaAnalise' }
});

export const HistoricoDadosModel = model<IHistoricoDados>('HistoricoDados', HistoricoDadosSchema);