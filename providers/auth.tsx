"use client"
import { auth, provider } from '@/firebase/config';
import { BASE_URL } from '@/lib/constants';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { isNull } from 'lodash';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation'
// Define types for user information
interface UserInfo {
  name: string;
  email: string;
  picture: string,
  role: string,
  isPremium: boolean
}

// Define types for authentication context
interface AuthContextType {
  userInfo: UserInfo | null;
  token: string | null;
  login: (userInfo: UserInfo, token: string) => void;
  logout: () => void;
  googleAuthenticate:  () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Auth context is not used correctly!');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter()
  // Simulated login check on component mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedToken = localStorage.getItem('token');
    if (storedUserInfo && storedToken) {
      setUserInfo(JSON.parse(storedUserInfo));
      setToken(storedToken);
    }
  }, []);

  const login = (userInfo: UserInfo, token: string) => {
    if (!userInfo || !token) return;
    setUserInfo(userInfo);
    if(userInfo.role == 'admin') {
      router.push('/dashboard')
    }
    setToken(token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUserInfo(null);
    setToken(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
  };

  const googleAuthenticate = async () => 
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const googleToken = credential?.accessToken
        console.log(googleToken)
        if (googleToken) {
          const response = await fetch(`${BASE_URL}/auth/login/google`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: googleToken })
          })
            .then(response => response.json())
          console.log("login response", response)
          login(response?.userInfo, response?.token)
        }
      }).catch((error) => {
        console.log(error)
      });

  return (
    <AuthContext.Provider value={{ userInfo, token, login, logout, googleAuthenticate }}>
      {children}
    </AuthContext.Provider>
  );
};