import { IUser } from '@/types/user';
import { useState, useEffect } from 'react';

function userLocalStorage<T>(key: string) {
  const [users, setUsers] = useState<IUser[]>(() => {
    if (typeof window === 'undefined') {
      // Retorna um array vazio ou algum valor inicial adequado para o servidor
      return [] as unknown as T;
    }
    const storedUsers = localStorage.getItem(key);
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(users));
    }
  }, [users, key]);

  const addUsers = (newUser: IUser) => {
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser: IUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const loginUser = (email: string, password: string) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    localStorage.removeItem('loggedInUser');
  };

  // const isUserLoggedIn = () => !!localStorage.getItem('loggedInUser');

  const userLoggedIn = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  };

  return {
    users,
    addUsers,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    // isUserLoggedIn,
    userLoggedIn,
  };
};

export default userLocalStorage;