import axios from 'axios';
export async function getAllTeams(){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }
    try{
        const response = await axios.get('http://localhost:3000/api/teams/getAllTeams',{headers:headers});
        return response.data
    }
    catch(error){
        console.log(error);
        throw error;
    }
}