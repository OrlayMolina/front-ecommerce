import axios from "axios";
const WS_PATH = import.meta.env.VITE_API_URL;

const getProducts = async () => {
    console.log("Entró a login");
    const response = await axios.get(WS_PATH+'/api/products');
    return response;
}

const getProduct = async (id) => {
    const response = await axios.get(`${WS_PATH}/api/products?id=${id}`);
    return response.data;
};

export {getProducts, getProduct}