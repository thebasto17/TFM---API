import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import addressMappingRoutes from './routes/addressMappingRoutes';
import priceExchangeRoutes from "./routes/priceExchangeRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/address-mapping', addressMappingRoutes);
apiRouter.use('/price', priceExchangeRoutes);
apiRouter.get('/', (req, res) => {
  res.status(200).send('OK');
});
apiRouter.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use('/api', apiRouter);

export default app;
