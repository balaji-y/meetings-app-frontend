import axios from "axios";
export async function getTeamsForUser(){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }
    try{
        const response = await axios.get('http://localhost:3000/api/teams/getTeams',{headers:headers});
        return response.data;
    }
    catch(error)
    {
        return error;
    }
}

export async function addNewTeam(team){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }
    try{
        const response = await axios.post(`http://localhost:3000/api/teams/add`,{team:team},{headers});
        return response.data;
    }
    catch(error){
        return error;
    }

}

export async function removeUserFromTeam(teamId){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }

    try{
        const response = await axios.delete(`http://localhost:3000/api/teams/${teamId}/user`,{headers:headers});
        return response.data;
    }
    catch(error)
    {
        return error;
    }
}

export async function addUserToTeam(teamId,users){
    const headers = {
        'Authorization': localStorage.getItem('token')
    }

    try{
        const response = await axios.post(`http://localhost:3000/api/teams/${teamId}/users`,{users:users},{headers:headers})
        return response.data;
    }
    catch(error)
    {
        return error;
    }
   
}