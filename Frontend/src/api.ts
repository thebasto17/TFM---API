import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface User {
  _id: string;
  address: string;
  newAddress: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const getUserByAddress = async (address: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${address}`);
  return response.data;
};

export const getUserByNewAddress = async (newAddress: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${newAddress}`);
  return response.data;
};

export const createUser = async (user: Omit<User, '_id'>): Promise<User> => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const response = await axios.put(`${API_URL}/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/users/${id}`);
};