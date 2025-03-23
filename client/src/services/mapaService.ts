import axios from 'axios';

export interface MapaData {
  _id?: string;
  municipio: string;
  localizacao: string;  // bairro
  atualizadoPor: string;
}

export async function fetchMapaData(): Promise<MapaData[]> {
  const response = await axios.get('/api/mapa-interativo');
  return response.data;
}

export async function createMapaData(payload: Omit<MapaData, '_id'>): Promise<MapaData> {
  const response = await axios.post('/api/mapa-interativo', payload);
  return response.data;
}
