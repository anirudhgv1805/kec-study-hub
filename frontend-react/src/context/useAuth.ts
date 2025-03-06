import { AuthContext , AuthContextType } from './AuthContext.ts'
import { useContext } from 'react';


export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth must be used within the AuthProvider');
    return context;
};