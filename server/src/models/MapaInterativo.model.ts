// models/MapaInterativo.model.ts
import { Document, Schema, model, Types } from 'mongoose';
import { IUsuario } from './Usuario/Usuario.model';


export interface IMapaInterativo extends Document {
  municipio: string;
  localizacao: string;
  atualizadoPor: IUsuario | Types.ObjectId;
}

const MapaInterativoSchema = new Schema<IMapaInterativo>({
  municipio: { type: String, required: true },
  localizacao: { type: String, required: true },
  atualizadoPor: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

export const MapaInterativoModel = model<IMapaInterativo>('MapaInterativo', MapaInterativoSchema);