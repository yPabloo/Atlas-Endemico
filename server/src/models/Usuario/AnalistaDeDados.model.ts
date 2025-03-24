import { Schema, Model } from 'mongoose';
import { UsuarioModel, IUsuario } from './Usuario.model';

export interface IAnalistaDeDados extends IUsuario {
  area_analise: string;
  consultarHistorico(): Promise<any>;
}

const AnalistaDeDadosSchema = new Schema<IAnalistaDeDados>(
  {
    area_analise: { type: String, required: true }
  },
  { discriminatorKey: 'role' }
) as Schema<IAnalistaDeDados, Model<IAnalistaDeDados>>;

export const AnalistaDeDadosModel: Model<IAnalistaDeDados> = UsuarioModel.discriminator<IAnalistaDeDados>(
  'AnalistaDeDados',
  AnalistaDeDadosSchema
);