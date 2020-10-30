import axios from 'axios';
export async function generateToken(email,password){
    try{
        const response = await axios.post('http://localhost:3000/api/auth/login',{email,password});
        return response;
    }
    catch(error){
        //console.log(error);
        return error;
    }
}

export async function registerUser(user){
    try{
        console.log(user);
        const response = await axios.post('http://localhost:3000/api/auth/signup',user);
        return response;
    }
    catch(error){
        return error;
    }
}

export async function checkUser(email){
    try{
        const response = await axios.get(`http://localhost:3000/api/auth/check?email=${email}`);
        if(response.status === 400)
            return false;
        else
            return true;
    }
    catch(error)
    {
        return error;
    }
    
}