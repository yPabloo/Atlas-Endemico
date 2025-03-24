import { Schema, Model } from 'mongoose';
import { UsuarioModel, IUsuario } from './Usuario.model';
import { RegistroDeCasoModel } from '../RegistroDeCaso.model';
import { bairros } from '../../config';

export interface IProfissionalSaude extends IUsuario {
  especialidade: string;
  registrarCaso(descricao: string, bairro: string): Promise<any>;
}

const ProfissionalSaudeSchema = new Schema<IProfissionalSaude>(
  {
    especialidade: { type: String, required: true }
  },
  { discriminatorKey: 'role' }
) as Schema<IProfissionalSaude, Model<IProfissionalSaude>>;

/**
 * Método de instância para registrar um novo caso:
 * - Só é chamado em documentos com role="ProfissionalSaude"
 * - Valida se o bairro está na lista de bairros
 * - Cria um RegistroDeCaso associando 'this._id' como o profissional
 */
ProfissionalSaudeSchema.methods.registrarCaso = async function(
  descricao: string,
  bairro: string
) {
  if (!bairros.includes(bairro)) {
    throw new Error(`Bairro inválido: ${bairro}. Escolha um entre: ${bairros.join(', ')}`);
  }

  const novoCaso = await RegistroDeCasoModel.create({
    data: new Date(),
    localizacao: bairro,
    descricao,
    profissional: this._id
  });

  return novoCaso;
};

export const ProfissionalSaudeModel: Model<IProfissionalSaude> =
  UsuarioModel.discriminator<IProfissionalSaude>(
    'ProfissionalSaude',
    ProfissionalSaudeSchema
  );