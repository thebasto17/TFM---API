import mongoose, { Schema, Document } from 'mongoose';


export interface IAddressMapping extends Document {
  moneroTxKey: string;
  ethereumAddress: string;
  asset: string;
}

const AddressMappingSchema: Schema = new Schema({
  moneroTxKey: { type: String, required: true, unique: true },
  ethereumAddress: { type: String, required: true },
  asset: { type: String, required: true },
});

AddressMappingSchema.index({ moneroTxKey: 1 }, { unique: true });

export default mongoose.model<IAddressMapping>('AddressMapping', AddressMappingSchema);