import axios from 'axios';
export async function generateToken(email,password){
    try{
        const response = await axios.post('http://localhost:3000/api/auth/login',{email,password});
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function registerUser(user){
    try{
        console.log(user);
        const response = await axios.post('http://localhost:3000/api/auth/signup',user);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
