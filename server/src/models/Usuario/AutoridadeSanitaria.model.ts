import { Schema } from 'mongoose';
import { UsuarioModel, IUsuario } from './Usuario.model';
import { HistoricoDadosModel } from '../HistoricoDados.model';

export interface IAutoridadeSanitaria extends IUsuario {
  cargo: string;
  acessarHistorico(): Promise<any>;
}

const AutoridadeSanitariaSchema = new Schema<IAutoridadeSanitaria>({
  cargo: { type: String, required: true }
});

AutoridadeSanitariaSchema.methods.acessarHistorico = async function() {
  return HistoricoDadosModel.find().exec();
};

export const AutoridadeSanitariaModel = UsuarioModel.discriminator<IAutoridadeSanitaria>(
  'AutoridadeSanitaria',
  AutoridadeSanitariaSchema
);