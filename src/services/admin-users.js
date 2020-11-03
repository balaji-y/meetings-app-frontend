import axios from 'axios';
export async function getAllUsers(){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }
    try{
        const response = await axios.get('http://localhost:3000/api/users/getAllUsers',{headers:headers});
        return response.data
    }
    catch(error){
        console.log(error);
        throw error;
    }
}