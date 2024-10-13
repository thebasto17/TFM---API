import AddressMapping, { IAddressMapping } from '../models/addressMapping';

export const createMapping = async (moneroTxKey: string, ethereumAddress: string, asset: string): Promise<IAddressMapping> => {
  const mapping = new AddressMapping({ moneroTxKey, ethereumAddress, asset });
  return await mapping.save();
};

export const listMappings = async (): Promise<IAddressMapping[]> => {
  return await AddressMapping.find();
}

export const getMapping = async (moneroTxKey: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOne({ moneroTxKey });
};

export const updateMapping = async (moneroTxKey: string, ethereumAddress: string, asset: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOneAndUpdate({ moneroTxKey }, { ethereumAddress, asset }, { new: true });
};

export const deleteMapping = async (moneroTxKey: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOneAndDelete({ moneroTxKey });
};