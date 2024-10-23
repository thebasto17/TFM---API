import { Request, Response } from 'express';
import { CoinGeckoResponse } from '../models/coingeckoMapping';
import axios from 'axios';

export const getPrices = async (req: Request, res: Response) => {
    try {
        const { assetPrice } = req.params;
        const price = parseFloat(assetPrice);
        const url = `${process.env.COINGECKO_API}${process.env.COINGECKO_PARAMS}`;
        const { data } = await axios.get<CoinGeckoResponse>(url);   
                  
        if (data && data.ethereum && data.ethereum.usd !== undefined && data.monero && data.monero.usd !== undefined ) {
            res.status(200).json({ eth: Number(data.ethereum.usd).toFixed(2), xmr: Number(data.monero.usd).toFixed(2)});
        } else {
            res.status(404).json({ error: 'Failed to convert price from ETH to XMR' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
  };

  export const convertEthToXmr = async (req: Request, res: Response) => {
    try {
        const { ethPrice, xmrPrice, price } = req.params;
        const priceToUsd = Number(price) * Number(ethPrice);
        res.status(200).json({ price: (priceToUsd / Number(xmrPrice)).toFixed(2) });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
  };