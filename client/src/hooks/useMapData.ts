// client/src/hooks/useMapData.ts
import { useState, useEffect } from 'react';
import { fetchRegistrosCaso, RegistroDeCaso } from '../services/registroCasoService';

interface MapPoint {
  data?: string;
  localizacao: string;
  atualizadoPor: {
    _id?: string;
    nome: string;
    role: string;
  };
}

export const useMapData = () => {
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setLoading(true);

        // Buscar os registros de caso via service
        const registros: RegistroDeCaso[] = await fetchRegistrosCaso();

        // Converter para o formato que o HeatMap espera
        const formattedData: MapPoint[] = registros.map((item) => ({
          data: item.data,
          localizacao: item.localizacao,
          // Se você não tem "nome" nem "role" no retorno, defina algo default.
          // Aqui usamos o profissional como _id e definimos "Sistema"/"Automático" arbitrariamente.
          atualizadoPor: {
            _id: item.profissional,
            nome: 'Sistema',
            role: 'Automático',
          },
        }));

        setMapPoints(formattedData);
        setError(null);
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError('Não foi possível carregar os dados do mapa');
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  return { mapPoints, loading, error };
};
