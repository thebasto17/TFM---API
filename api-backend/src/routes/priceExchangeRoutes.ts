import {convertEthToXmr, getPrices} from "../controllers/coingeckoMappingController";
import {Router} from "express";

const router = Router();

router.get('/prices', getPrices);
router.get('/convertEthToXmr/:ethPrice/:xmrPrice/:price', convertEthToXmr);

export default router;