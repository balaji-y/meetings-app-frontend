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

export async function deleteUser(id){
    const headers = {
        'Authorization' : localStorage.getItem('token')
    }
    try{
        const response = await axios.delete(`http://localhost:3000/api/users/deleteUser?id=${id}`,{headers:headers});
        return response.data
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function updateUser(user){
    console.log("check",user._id);
    const headers = {
        'Authorization' : localStorage.getItem('token')
    }
    try{
        const response = await axios.patch('http://localhost:3000/api/users/updateUser',{user:user},{headers:headers});
        return response.data
    }
    catch(error){
        console.log(error);
        throw error;
    }
}