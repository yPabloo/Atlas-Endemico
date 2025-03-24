import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('A variável de ambiente MONGODB_URI não está definida');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    console.error('Erro na conexão com MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;