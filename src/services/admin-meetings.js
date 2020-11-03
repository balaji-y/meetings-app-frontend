import axios from 'axios';
export async function getAllMeetings(){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }
    try{
        const response = await axios.get('http://localhost:3000/api/meetings/getAllMeetings',{headers:headers});
        return response.data
    }
    catch(error){
        console.log(error);
        throw error;
    }
}