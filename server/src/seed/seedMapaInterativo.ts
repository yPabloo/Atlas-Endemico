// server/src/seed/seedMapaInterativo.ts

import mongoose from 'mongoose';
import connectDB from '../database';
import { MapaInterativoModel } from '../models/MapaInterativo.model';
import { RegistroDeCasoModel } from '../models/RegistroDeCaso.model';
import { ProfissionalSaudeModel } from '../models/Usuario/ProfissionalSaude.model';
import dotenv from 'dotenv'

dotenv.config();

// Função principal de seed
async function seedMapaInterativo() {
  try {
    // 1. Conectar ao banco
    await connectDB();
    console.log('Banco de dados conectado com sucesso!');

    // 2. Limpar coleções (opcional, caso queira resetar tudo)
    await MapaInterativoModel.deleteMany({});
    await RegistroDeCasoModel.deleteMany({});
    await ProfissionalSaudeModel.deleteMany({});
    console.log('Coleções limpas.');

    // 3. Criar alguns profissionais
    const profissionais = await ProfissionalSaudeModel.insertMany([
      {
        nome: 'João da Silva',
        email: 'joao@example.com',
        senha: '123456',
        especialidade: 'Enfermeiro',
        role:"profissional",
      },
      {
        nome: 'Maria Oliveira',
        email: 'maria@example.com',
        senha: '123456',
        especialidade: 'Médica',
        role:"profissional",
      }
    ]);
    console.log(`Profissionais criados: ${profissionais.length}`);

    // Pegar um ID para usar como "atualizadoPor" e em RegistroDeCaso
    const profissional1 = profissionais[0];

    // 4. Criar alguns registros de caso


    await RegistroDeCasoModel.insertMany([
      {
        localizacao: 'Siqueira Campos',
        descricao: 'Paciente com sintomas leves de dengue',
        profissional: profissional1._id
      },
      {
        localizacao: 'Bugio',
        descricao: 'Paciente apresentou quadro febril persistente',
        profissional: profissional1._id
      }
    ]);
    console.log('Registros de caso criados.');


    await MapaInterativoModel.insertMany([
      {
        municipio: 'Aracaju',
        localizacao: 'Bugio',
        atualizadoPor: profissional1._id
      },
      {
        municipio: 'Aracaju',
        localizacao: 'Siqueira Campos',
        atualizadoPor: profissional1._id
      },
      {
        municipio: 'Aracaju',
        localizacao: 'Centro',
        atualizadoPor: profissional1._id
      }
    ]);
    console.log('Pontos do mapa criados.');

  } catch (err) {
    console.error('Erro no seed:', err);
  } finally {
    // 6. Fechar conexão
    await mongoose.connection.close();
    console.log('Conexão com banco fechada.');
  }
}

// Executar se este arquivo for chamado diretamente via Node
if (require.main === module) {
  seedMapaInterativo();
}

// Se quiser exportar a função:
export { seedMapaInterativo };
