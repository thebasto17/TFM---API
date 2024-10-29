import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import addressMappingRoutes from './routes/addressMappingRoutes';
import priceExchangeRoutes from "./routes/priceExchangeRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/address-mapping', addressMappingRoutes);
app.use('/price', priceExchangeRoutes);
app.get('/', (req, res) => {
  res.status(200).send('OK');
});
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export default app;
