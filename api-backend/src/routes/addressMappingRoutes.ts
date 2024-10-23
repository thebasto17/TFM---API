import { Router } from 'express';
import {
  createMappingHandler,
  getMappingHandler,
  updateMappingHandler,
  deleteMappingHandler
} from '../controllers/addressMappingController';

import { getPrices, convertEthToXmr } from '../controllers/coingeckoMappingController';

const router = Router();

router.post('/', createMappingHandler);
router.get('/:randomNumber', getMappingHandler);
router.put('/:randomNumber', updateMappingHandler);
router.delete('/:randomNumber', deleteMappingHandler);
router.get('/price/prices', getPrices);
router.get('/price/convertEthToXmr/:ethPrice/:xmrPrice/:price', convertEthToXmr);

export default router;
