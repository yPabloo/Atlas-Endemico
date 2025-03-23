import { Schema } from 'mongoose';
import { UsuarioModel, IUsuario } from './Usuario.model';
import { HistoricoDadosModel } from '../HistoricoDados.model';

export interface IAnalistaDeDados extends IUsuario {
  area_analise: string;
  consultarHistorico(): Promise<any>;
}

const AnalistaDeDadosSchema = new Schema<IAnalistaDeDados>({
  area_analise: { type: String, required: true }
});

AnalistaDeDadosSchema.methods.consultarHistorico = async function() {
  return HistoricoDadosModel.find({
    descricao: new RegExp(this.area_analise, 'i')
  }).exec();
};

export const AnalistaDeDadosModel = UsuarioModel.discriminator<IAnalistaDeDados>(
  'AnalistaDeDados',
  AnalistaDeDadosSchema
);