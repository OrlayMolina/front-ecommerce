import { Navigate, Route, Routes } from "react-router-dom";
import Home from '../components/pages/Home';
import Checkout from '../components/pages/Checkout';
import RegistroUsuario from '../components/pages/RegistroUsuario';
import Login from '../components/pages/Login';
import Perfil from '../components/pages/Perfil';
import ListaProductos from '../components/pages/ListaProductos';
import Producto from '../components/pages/Producto';

const NotFound = () => <h1>404: Not Found</h1>

function AppRouter() {
    return ( 
        <>
            <Routes>
                {/* Ruta default */}
                <Route path={"/"} element={<Home/>}/>
                {/* Comodin rutas no validas */}
                <Route path={"*"} element={<Navigate to={"/404"}/>}/>

                {/* Rutas disponibles */}
                <Route path="404" element={<NotFound />} />
                <Route path="home" element={<Home />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="signup" element={<RegistroUsuario />} />
                <Route path="login" element={<Login />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="productos" element={<ListaProductos />} />
                <Route path="producto/:id" element={<Producto />} />
            </Routes>
        </>
    );
}

export default AppRouter;