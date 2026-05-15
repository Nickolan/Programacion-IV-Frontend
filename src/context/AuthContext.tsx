import { Usuario } from "../models/Usuario";
import { createContext, useContext, useState, type ReactNode } from "react";
import axios from "axios";

interface ContextType {
    usuario: Usuario | null;
    error: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    getUsuarioFromToken: (token: string) => void;
}

const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/token', { username, password });
            console.log(response.data);
            localStorage.setItem('token', response.data.access_token);
            setUsuario(response.data.usuario);
            return true;
        } catch (error) {
            setError('Error al iniciar sesión. Verifique sus credenciales.');
            console.error('Error during login:', error);
            return false;
        }
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('token');
    };

    const getUsuarioFromToken = async (token: string) => {
        if (!token) return null;
        console.log(token);
        
        try {
            const response = await axios.get('http://localhost:8000/api/v1/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsuario(response.data);
        } catch (error) {
            console.error('Error fetching user from token:', error);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, error, getUsuarioFromToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}