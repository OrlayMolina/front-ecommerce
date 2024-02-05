import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({
        full_name: '',
        email: ''
    });

    const loginFn = (token) => {
        const tokenDecoded = jwtDecode(token);
        if(tokenDecoded){
            setIsLogged(true);
            setUser(tokenDecoded);
            window.localStorage.setItem(import.meta.env.VITE_TKN_NAME, token);
        }
    }

    const logoutFn = () => {
        setIsLogged(false);
        setUser({
            full_name: '',
            email: '',
        });
        window.localStorage.removeItem(import.meta.env.VITE_TKN_NAME);
        
    }

    useEffect( () => {
        console.log("Requerimos hacer algo para determinar si ya hay sesion activa...");
        const tknFromStorage = window.localStorage.getItem(import.meta.env.VITE_TKN_NAME);
        if (tknFromStorage) {
            console.log("hay una sesion!!!!");
            loginFn(tknFromStorage);
        } else {
            console.log("no hay sesion!!!");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ 
            isLogged,
            user,
            setUser,
            loginFn,
            logoutFn
         }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider };

export default AuthContext;