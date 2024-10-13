import { Router } from 'express';
import {
  createMappingHandler,
  getMappingHandler,
  updateMappingHandler,
  deleteMappingHandler
} from '../controllers/addressMappingController';

const router = Router();

router.post('/', createMappingHandler);
router.get('/:moneroTxKey', getMappingHandler);
router.put('/:moneroTxKey', updateMappingHandler);
router.delete('/:moneroTxKey', deleteMappingHandler);

export default router;
