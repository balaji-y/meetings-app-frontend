import axios from 'axios';

export async function fetchMeetingsForDay(date,description=''){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }
    try{
        const response = await axios.get(`http://localhost:3000/api/meetings?date=${date}&searchTerm=${description}`,{headers:headers});
        return response.data
    }
    catch(error)
    {
        return error;
    }  
}

export async function getUsers(){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }
    try{
        const response = await axios.get(`http://localhost:3000/api/users`,{headers:headers})
        return response.data
    }
    catch(error)
    {
        return error
    }
}

export async function getUserId(email){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }
    try{
        const response = await axios.get(`http://localhost:3000/api/users/getUserId?email=${email}`,{headers:headers})
        return response.data
    }
    catch(error)
    {
        return error
    }
}

export async function deleteUserFromMeeting(meetingId){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }
    try{
        const response = await axios.delete(`http://localhost:3000/api/meetings/${meetingId}/user`,{headers:headers})
        return response.data
    }
    catch(error)
    {
        return error;
    }
}


export async function addUserToSpecificMeeting(meetingId,user){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }

    try{
        const response = await axios.post(`http://localhost:3000/api/meetings/${meetingId}/users`,{userIds:user},{headers:headers})
        return response.data;
    }
    catch(error)
    {
        return error;
    }
   
}