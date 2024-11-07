import mongoose, { Schema, Document } from 'mongoose';

export interface IAddressMapping extends Document {
  ethereumAddress: string;
  randomNumber: string;
  erc20Address: string;
  assetAddress: string;
  assetPrice: string;
  amountToTransfer: string;
  ethereumUsd: string;
  moneroUsd: string;
  minted: boolean;
}

// todo: afegir validaciones per eth addresses y monero tx key
const AddressMappingSchema: Schema = new Schema({
  ethereumAddress: { type: String, required: true },
  randomNumber: { type: String, required: true, unique: true },
  erc20Address: { type: String, required: true },
  assetAddress: { type: String, required: true },
  assetPrice: { type: String, required: true },
  amountToTransfer: { type: String, required: true },
  ethereumUsd: { type: String, required: true },
  moneroUsd: { type: String, required: true },
  minted: { type: Boolean, required: true, default: false }, // flag to indicate whether the datatoken has already been minted
});

AddressMappingSchema.index({ randomNumber: 1 }, { unique: true });

export default mongoose.model<IAddressMapping>('AddressMapping', AddressMappingSchema);