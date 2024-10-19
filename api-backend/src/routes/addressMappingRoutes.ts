import { Router } from 'express';
import {
  createMappingHandler,
  getMappingHandler,
  updateMappingHandler,
  deleteMappingHandler
} from '../controllers/addressMappingController';

import { getMoneroPrice } from '../controllers/coingeckoMappingController';

const router = Router();

router.post('/', createMappingHandler);
router.get('/:moneroTxId/:moneroTxKey', getMappingHandler);
router.put('/:moneroTxId/:moneroTxKey', updateMappingHandler);
router.delete('/:moneroTxId/:moneroTxKey', deleteMappingHandler);
router.get('/monero-price', getMoneroPrice);

export default router;
