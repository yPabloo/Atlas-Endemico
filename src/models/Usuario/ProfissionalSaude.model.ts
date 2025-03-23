import { Schema } from 'mongoose';
import { UsuarioModel, IUsuario } from './Usuario.model';

export interface IProfissionalSaude extends IUsuario {
  especialidade: string;
}

const ProfissionalSaudeSchema = new Schema<IProfissionalSaude>({
  especialidade: { type: String, required: true }
});

export const ProfissionalSaudeModel = UsuarioModel.discriminator<IProfissionalSaude>(
  'ProfissionalSaude',
  ProfissionalSaudeSchema
);