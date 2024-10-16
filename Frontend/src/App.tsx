import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser, getUserById, getUserByAddress, getUserByTxProof, User } from './api';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [address, setAddress] = useState('');
  const [txProof, setTxProof] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateField, setUpdateField] = useState<'address' | 'txProof'>('address');
  const [updateValue, setUpdateValue] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [searchType, setSearchType] = useState<'id' | 'address' | 'txProof'>('id');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ address, txProof });
      setAddress('');
      setTxProof('');
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(updateId, { [updateField]: updateValue });
      setUpdateId('');
      setUpdateValue('');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteUser(deleteId);
      setDeleteId('');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let result;
      switch (searchType) {
        case 'id':
          result = await getUserById(searchValue);
          break;
        case 'address':
          result = await getUserByAddress(searchValue);
          break;
        case 'txProof':
          result = await getUserByTxProof(searchValue);
          break;
      }
      setSearchResult(result);
    } catch (error) {
      console.error('Error searching user:', error);
      setSearchResult(null);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tx Proof"
          value={txProof}
          onChange={(e) => setTxProof(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>

      <h2>Update User</h2>
      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          placeholder="User ID"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
        />
        <select value={updateField} onChange={(e) => setUpdateField(e.target.value as 'address' | 'txProof')}>
          <option value="address">Address</option>
          <option value="txProof">Tx Proof</option>
        </select>
        <input
          type="text"
          placeholder="New Value"
          value={updateValue}
          onChange={(e) => setUpdateValue(e.target.value)}
        />
        <button type="submit">Update User</button>
      </form>

      <h2>Delete User</h2>
      <form onSubmit={handleDeleteUser}>
        <input
          type="text"
          placeholder="User ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button type="submit">Delete User</button>
      </form>

      <h2>Search User</h2>
      <form onSubmit={handleSearchUser}>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value as 'id' | 'address' | 'txProof')}>
          <option value="id">ID</option>
          <option value="address">Address</option>
          <option value="txProof">Tx Proof</option>
        </select>
        <input
          type="text"
          placeholder="Search Value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search User</button>
      </form>
      {searchResult && (
        <div>
          <h3>Search Result:</h3>
          <p>ID: {searchResult._id}</p>
          <p>Address: {searchResult.address}</p>
          <p>Tx Proof: {searchResult.txProof}</p>
        </div>
      )}

      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            ID: {user._id}, Address: {user.address}, Tx Proof: {user.txProof}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;