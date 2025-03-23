import { Schema } from 'mongoose';
import { UsuarioModel, IUsuario } from './Usuario.model';
import { MapaInterativoModel } from '../MapaInterativo.model';

export interface IAdministrador extends IUsuario {
  manterMapa(novoMapa: any): Promise<any>;
}

const AdministradorSchema = new Schema<IAdministrador>({
  assinaturaDigital: { type: String, required: true }
});

// Método para manutenção do mapa
AdministradorSchema.methods.manterMapa = async function(novoMapa: any) {
  novoMapa.atualizadoPor = this._id;
  return MapaInterativoModel.create(novoMapa);
};

export const AdministradorModel = UsuarioModel.discriminator<IAdministrador>(
  'Administrador',
  AdministradorSchema
);