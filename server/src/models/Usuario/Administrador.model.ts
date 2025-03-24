import { Schema, Model } from 'mongoose';
import { UsuarioModel, IUsuario } from './Usuario.model';

export interface IAdministrador extends IUsuario {
  assinaturaDigital: string;
  manterMapa(novoMapa: any): Promise<any>;
}

const AdministradorSchema = new Schema<IAdministrador>(
  {
    assinaturaDigital: { type: String, required: true }
  },
  { discriminatorKey: 'role' }
) as Schema<IAdministrador, Model<IAdministrador>>;


export const AdministradorModel: Model<IAdministrador> = UsuarioModel.discriminator<IAdministrador>(
  'Administrador',
  AdministradorSchema
);