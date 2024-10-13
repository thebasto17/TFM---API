import { Router } from 'express';
import {
  createMappingHandler,
  getMappingHandler,
  updateMappingHandler,
  deleteMappingHandler
} from '../controllers/addressMappingController';

const router = Router();

// Crear una nueva asociación
router.post('/', createMappingHandler);

// Obtener una asociación por moneroAddress
router.get('/:moneroTxKey', getMappingHandler);

// Actualizar una asociación existente
router.put('/:moneroTxKey', updateMappingHandler);

// Eliminar una asociación
router.delete('/:moneroTxKey', deleteMappingHandler);

export default router;
