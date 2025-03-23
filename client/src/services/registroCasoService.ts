import axios from 'axios';

export interface RegistroDeCaso {
  _id?: string;
  data?: string;
  localizacao: string; // bairro
  descricao: string;
  profissional: string; // _id do profissional
}

export async function fetchRegistrosCaso(): Promise<RegistroDeCaso[]> {
  const response = await axios.get('/api/registro-caso');
  return response.data;
}

export async function createRegistroCaso(
  payload: Omit<RegistroDeCaso, '_id'>
): Promise<RegistroDeCaso> {
  const response = await axios.post('/api/registro-caso', payload);
  return response.data;
}
