import { Document, Schema, model } from 'mongoose';

export interface IMapaInterativo extends Document {
  municipio: string;
  localizacao: string;
  atualizadoPor: Types.ObjectId;
}

const MapaInterativoSchema = new Schema<IMapaInterativo>({
  municipio: { type: String, required: true },
  localizacao: { type: String, required: true },
  atualizadoPor: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

export const MapaInterativoModel = model<IMapaInterativo>('MapaInterativo', MapaInterativoSchema);