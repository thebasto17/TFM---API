import mongoose, { Schema, Document } from 'mongoose';


export interface IAddressMapping extends Document {
  moneroAddress: string;
  ethereumAddress: string;
}

const AddressMappingSchema: Schema = new Schema({
  moneroAddress: { type: String, required: true, unique: true },
  ethereumAddress: { type: String, required: true }
});

AddressMappingSchema.index({ moneroAddress: 1 }, { unique: true });

export default mongoose.model<IAddressMapping>('AddressMapping', AddressMappingSchema);