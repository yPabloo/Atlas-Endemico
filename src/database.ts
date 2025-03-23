import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    console.error('Erro na conexão com MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;