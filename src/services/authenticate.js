import axios from 'axios';
export async function generateToken(email,password){
    try{
        const response = await axios.post('http://localhost:3000/api/auth/login',{email,password});
        console.log(response.data);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('email',response.data.email);
    }
    catch(error){
        console.log(error);
    }
    
    
 

}