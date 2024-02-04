import axios from "axios";
const WS_PATH = import.meta.env.VITE_API_URL;

const loginService = async (data) => {
    //console.log("Entró a login");
    const response = await axios.post(WS_PATH+'/api/login', data);
    return response;
}

const signUpService = async (data) => {
    //console.log("Entró a signup");
    const response = await axios.post(WS_PATH+'/api/users', data);
    return response;
}

const profileService = async () => {
    //console.log("Entró a profile");
    const config = {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem(import.meta.env.VITE_TKN_NAME)}`
        }
    };
    const response = await axios.get(WS_PATH+'/api/users', config);
    return response;
}

const updateProfileService = async (data) => {
    //console.log("Entro a updateProfileService");
    const config = {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem(import.meta.env.VITE_TKN_NAME)}`
        }
    };
    const response = await axios.put(WS_PATH + '/api/users', data, config);
    return response;
};

export {
    loginService,
    signUpService,
    profileService,
    updateProfileService
}