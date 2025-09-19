import { useContext } from 'react';
import { AuthContext } from '../auth/authContextInstance';

export const useAuth = () => useContext(AuthContext);