import axios from "axios";
const WS_PATH = import.meta.env.VITE_API_URL;

const loginService = async (data) => {
    console.log("Entró a login");
    const response = await axios.post(WS_PATH+'/api/login', data);
    return response;
}

export {loginService}