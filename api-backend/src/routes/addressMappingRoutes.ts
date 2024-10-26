import { Router } from 'express';
import {
  createMappingHandler,
  getMappingHandler,
  updateMappingHandler,
  deleteMappingHandler, listMappingsHandler
} from '../controllers/addressMappingController';

const router = Router();

router.post('/', createMappingHandler);
router.get('/', listMappingsHandler);
router.get('/:randomNumber', getMappingHandler);
router.put('/:randomNumber', updateMappingHandler);
router.delete('/:randomNumber', deleteMappingHandler);

export default router;
