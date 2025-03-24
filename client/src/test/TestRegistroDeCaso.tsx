import React, { useState, useEffect, FormEvent } from 'react';
import {
  RegistroDeCaso,
  fetchRegistrosCaso,
  createRegistroCaso
} from '../services/registroCasoService';  

const BAIRROS = [
    "Soledade",
    "Dom Luciano",
    "Santos Dumont",
    "Bugio",
    "Cidade Nova",
    "Santo Antônio",
    "Palestina",
    "Dezoito do Forte",
    "José Conrado de Araújo",
    "Olaria",
    "Jardim Centenário",
    "Capucho",
    "Novo Paraíso",
    "América",
    "Siqueira Campos",
    "Getúlio Vargas",
    "Centro",
    "Industrial",
    "Porto Dantas",
    "Jabutiana",
    "Coroa do Meio",
    "Farolândia",
    "Jardins",
    "São Conrado",
    "Cirurgia",
    "Inácio Barbosa",
    "Ponto Novo",
    "Aeroporto",
    "Aruanda",
    "Areia Branca",
    "Coroa do Meio",
    "Atalaia",
    "Gameleira",
    "Matapoã",
    "Mosqueiro",
    "Areia Branca",
    "Santa Maria",
    "Robalo",
    "São José dos Náufragos"
];

const TestRegistroDeCaso: React.FC = () => {
  const [registros, setRegistros] = useState<RegistroDeCaso[]>([]);
  const [formData, setFormData] = useState<RegistroDeCaso>({
    localizacao: '',
    descricao: '',
    profissional: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData(); 
  }, []);

  /** Buscar registros do service */
  const fetchData = async () => {
    try {
      const data = await fetchRegistrosCaso();
      setRegistros(data);
      setError(null);
    } catch (err) {
      console.error('Erro ao obter registros:', err);
      setError('Não foi possível carregar os registros.');
    }
  };

  /** Submeter novo registro via service */
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const payload = {
        data: new Date().toISOString(),
        ...formData
      };
      const novoRegistro = await createRegistroCaso(payload);


      setRegistros((prev) => [...prev, novoRegistro]);
      setFormData({ localizacao: '', descricao: '', profissional: '' });
      setError(null);
    } catch (err) {
      console.error('Erro ao criar registro:', err);
      setError('Não foi possível criar o registro. Verifique se o ID do profissional é válido.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Testar RegistroDeCaso (Base no Seed)</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Bairro (localizacao):</label>
          <select
            required
            value={formData.localizacao}
            onChange={(e) =>
              setFormData({ ...formData, localizacao: e.target.value })
            }
          >
            <option value="">-- Selecione --</option>
            {BAIRROS.map((bairro) => (
              <option key={bairro} value={bairro}>
                {bairro}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Descrição:</label>
          <input
            type="text"
            required
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
          />
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ marginRight: '0.5rem' }}>ID do Profissional:</label>
          <input
            type="text"
            required
            placeholder="Exemplo: 64f3abc123..."
            value={formData.profissional}
            onChange={(e) =>
              setFormData({ ...formData, profissional: e.target.value })
            }
          />
          <p style={{ fontSize: '0.9rem', margin: '0.25rem 0' }}>
            (Digite o <em>_id</em> válido de um profissional criado pelo seed)
          </p>
        </div>

        <button type="submit">Criar Registro</button>
      </form>

      <h3>Registros existentes:</h3>
      {registros.length === 0 ? (
        <p>Nenhum registro encontrado.</p>
      ) : (
        <ul>
          {registros.map((r) => (
            <li key={r._id}>
              <strong>ID:</strong> {r._id} |{' '}
              <strong>Data:</strong> {r.data} |{' '}
              <strong>Localização:</strong> {r.localizacao} |{' '}
              <strong>Descrição:</strong> {r.descricao} |{' '}
              <strong>Profissional:</strong> {r.profissional}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestRegistroDeCaso;
