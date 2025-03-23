import mongoose from 'mongoose';
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

import { AdministradorModel } from '../models/Usuario/Administrador.model';
import { ProfissionalSaudeModel } from '../models/Usuario/ProfissionalSaude.model';
import { AutoridadeSanitariaModel } from '../models/Usuario/AutoridadeSanitaria.model';
import { AnalistaDeDadosModel } from '../models/Usuario/AnalistaDeDados.model';
import { SistemaNotificacoesModel } from '../models/SistemaNotificacoes.model';
import { RegistroDeCasoModel } from '../models/RegistroDeCaso.model';
import { HistoricoDadosModel } from '../models/HistoricoDados.model';
import { MapaInterativoModel } from '../models/MapaInterativo.model';
import { FerramentaAnaliseModel } from '../models/FerramentaAnalise.model';
import connectDB from '../database';

beforeAll(async () => {
  await connectDB();
}, 30000);

afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Testes completos de integração', () => {
  test('Deve criar um Administrador e manter mapa', async () => {
    const adminData = {
      nome: 'Admin Teste',
      email: 'admin@test.com',
      senha: 'admin_hash',
      role: 'admin',
      assinaturaDigital: 'assinatura_admin_123'
    };

    const admin = new AdministradorModel(adminData);
    const savedAdmin = await admin.save();

    // Testar manutenção do mapa
    const novoMapa = await admin.manterMapa({
      municipio: 'Cidade Teste',
      localizacao: 'Ponto Admin'
    });

    expect(novoMapa).toHaveProperty('_id');
    expect(novoMapa.atualizadoPor).toEqual(savedAdmin._id);
  });

  test('Deve criar Profissional de Saúde e registrar caso', async () => {
    const profissionalData = {
      nome: 'Dr. Teste',
      email: 'medico@test.com',
      senha: 'medico_hash',
      role: 'profissional',
      especialidade: 'Epidemiologia'
    };

    const profissional = new ProfissionalSaudeModel(profissionalData);
    const savedProfissional = await profissional.save();

    const casoData = {
      localizacao: 'HUSE',
      descricao: 'Caso de teste',
      profissional: savedProfissional._id
    };

    const registroCaso = new RegistroDeCasoModel(casoData);
    const savedCaso = await registroCaso.save();

    const notificacao = await SistemaNotificacoesModel.findOne({
      detalhes: { $regex: 'Caso de teste' }
    });

    expect(notificacao).toBeTruthy();
    expect(notificacao?.bairro).toBe(casoData.localizacao);
  });

  test('Deve criar Autoridade Sanitária e acessar histórico', async () => {
    const autoridadeData = {
      nome: 'Autoridade Teste',
      email: 'autoridade@test.com',
      senha: 'auth_hash',
      role: 'autoridade',
      cargo: 'Fiscal Geral'
    };

    const autoridade = new AutoridadeSanitariaModel(autoridadeData);
    const savedAutoridade = await autoridade.save();

    await HistoricoDadosModel.create({
      localizacao: 'Zona de Fiscalização',
      descricao: 'Dados para autoridade'
    });

    const historico = await savedAutoridade.acessarHistorico();
    expect(historico.length).toBeGreaterThan(0);
  });

  test('Deve criar Analista e usar ferramenta de análise', async () => {
    const analistaData = {
      nome: 'Analista Teste',
      email: 'analista@test.com',
      senha: 'analista_hash',
      role: 'analista',
      area_analise: 'Estatística'
    };

    const analista = new AnalistaDeDadosModel(analistaData);
    const savedAnalista = await analista.save();

    // Criar ferramenta
    const ferramenta = await FerramentaAnaliseModel.create({
      municipio: 'Cidade Analise',
      localizacao: 'Centro'
    });

    // Consultar histórico
    const historico = await savedAnalista.consultarHistorico();
    expect(historico).toBeInstanceOf(Array);

    // Consultar mapa através da ferramenta
    await MapaInterativoModel.create({
      municipio: 'Cidade Analise',
      localizacao: 'Centro',
      atualizadoPor: savedAnalista._id
    });

    const mapas = await ferramenta.consultarMapa();
    expect(mapas.length).toBe(1);
  });

  test('Deve verificar relação Histórico -> Ferramenta', async () => {
    const ferramenta = await FerramentaAnaliseModel.create({
      municipio: 'Cidade Relacional',
      localizacao: 'Ponto X'
    });

    const historico = await HistoricoDadosModel.create({
      localizacao: 'Ponto X',
      descricao: 'Dados para ferramenta',
      ferramentaAnalise: ferramenta._id
    });

    const historicoPopulado = await HistoricoDadosModel.findById(historico._id)
      .populate('ferramentaAnalise')
      .exec();

    expect(historicoPopulado?.ferramentaAnalise).toHaveProperty('municipio', 'Cidade Relacional');
  });

  test('Deve testar herança de usuários', async () => {
    const users = [
      new AdministradorModel({
        nome: 'Admin 2',
        email: 'admin2@test.com',
        senha: 'hash',
        role: 'admin',
        assinaturaDigital: 'assinatura2'
      }),
      new ProfissionalSaudeModel({
        nome: 'Médico 2',
        email: 'medico2@test.com',
        senha: 'hash',
        role: 'profissional',
        especialidade: 'Cardiologia'
      })
    ];

    const savedUsers = await Promise.all(users.map(u => u.save()));

    // Verificar coleção única
    const count = await mongoose.connection.collection('usuarios').countDocuments();
    expect(count).toBe(2);

    // Verificar discriminators
    const adminFromDB = await AdministradorModel.findById(savedUsers[0]._id);
    expect(adminFromDB?.assinaturaDigital).toBe('assinatura2');
  });
});