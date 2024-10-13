import AddressMapping, { IAddressMapping } from '../models/addressMapping';

export const createMapping = async (moneroAddress: string, ethereumAddress: string): Promise<IAddressMapping> => {
  const mapping = new AddressMapping({ moneroAddress, ethereumAddress });
  return await mapping.save();
};

export const getMapping = async (moneroAddress: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOne({ moneroAddress });
};

export const updateMapping = async (moneroAddress: string, ethereumAddress: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOneAndUpdate({ moneroAddress }, { ethereumAddress }, { new: true });
};

export const deleteMapping = async (moneroAddress: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOneAndDelete({ moneroAddress });
};