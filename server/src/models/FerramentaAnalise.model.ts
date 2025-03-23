import { Document, Schema, model, Types } from 'mongoose';
import { IMapaInterativo, MapaInterativoModel } from './MapaInterativo.model';

export interface IFerramentaAnalise extends Document {
  municipio: string;
  localizacao: string;
  consultarMapa(): Promise<IMapaInterativo[]>;
}

const FerramentaAnaliseSchema = new Schema<IFerramentaAnalise>({
  municipio: { type: String, required: true },
  localizacao: { type: String, required: true }
});


FerramentaAnaliseSchema.methods.consultarMapa = async function() {
  return MapaInterativoModel.find({
    municipio: this.municipio,
    localizacao: this.localizacao
  }).exec();
};

export const FerramentaAnaliseModel = model<IFerramentaAnalise>(
  'FerramentaAnalise',
  FerramentaAnaliseSchema
);