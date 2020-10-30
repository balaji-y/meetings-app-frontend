<template>
    <div>

            <div class="row" v-if="status==='LOADING'">
                <div class="col-12">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>Teams Loading</strong> 
                    </div>
                </div>
            </div>

            <div class="row" v-if="status==='ERROR_LOADING'">
                <div class="col-12">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>{{error.message}}</strong>
                    </div>
                </div>
            </div>


    
            <div class="row my-5" v-if="status==='LOADED'">
                <div class="col-4 d-flex" v-for="(team,index) in teams" :key="team._id">
                    
                        <div class="card">
                            <div class="card-body">
                               
                                <h3 class="card-title">{{team.name}}</h3>
                                <div class="card-text">
                                    <div>
                                        <h5>@{{team.shortName}}</h5>
                                    </div>
                                    <div>
                                        <span>{{team.description}}</span>
                                    </div>
                                    <div class="my-2">
                                        <button type="button" class="btn btn-danger" @click="removeUserFromTeam(team._id,index)">Excuse yourself</button>
                                    </div>

                                    <hr />
                                    <b>Members:</b>
                                    <span v-for="user in team.members" :key="user._id">
                                        {{user.email}}
                                    </span>

                                     <div class = "row mx-2 my-2">
                                        <select id="userToAdd">
                                            <option>Select Member</option>
                                            <option v-for="userEmail in getRemainingUsers(team.members)" :key="userEmail" :value="userEmail">
                                                {{userEmail}}
                                            </option>
                                        </select>
                           
                            
                                        <button type="button" @click="addUserToTeam(team._id, $event, index)" class="btn btn-primary mx-2">
                                            Add
                                        </button>
                            
                                    </div>

                                </div>
                            </div>
                        </div>
                </div>
            </div>
    </div>
</template>

<script>
import { getTeamsForUser,removeUserFromTeam,addUserToTeam} from '../services/teams'
import { getUsers,getUserId } from '../services/meetings';
export default {
    name:'ViewTeams',
    data(){
        return {
            teams:[],
            status:'LOADING',
            users: []
        }
    },
    mounted(){
        getTeamsForUser()
        .then(teams =>{
            this.status = 'LOADED';
            this.teams = teams;
            console.log(teams);
        })
        .catch(error=>{
            this.status = 'ERROR_LOADING';
            this.error = error.message;
        });


        getUsers()
        .then(users => {
            this.users = users;
            //console.log(users);
        })
        .catch(error => {
            this.error = error;
        })
    },
    methods: {
        removeUserFromTeam(teamId,index)
        {
            removeUserFromTeam(teamId)
            .then(response => {
                console.log(response);
                // if(index === 0)
                //     this.teams = [...this.teams.slice(1)]
                // else
                this.teams = [...this.teams.slice(0,index),...this.teams.slice(index+1)]
            })
            .catch(error => {
                console.log(error);
            })
        },
        getRemainingUsers(members)
        {  
            const membersEmail = members.map(member => member.email);
           // console.log(membersEmail);
            const allUsersEmail = this.users.map(user => user.email);
           // console.log(allUsersEmail);
            const result = allUsersEmail.filter(x => !membersEmail.includes(x));
            return result;
        },
        addUserToTeam(teamId,event,index){
           // let email = document.querySelector('#userToAdd').value;
            let email = event.target.parentElement.children[0].value;
            if(email!='Select Member')
            {   
                let userId = ''
                getUserId(email)
                .then(response => {
                    userId = response._id;
                    const newUser = {userId,email};
                    addUserToTeam(teamId,newUser)
                    .then(response => {
                        console.log("response",response);
                        // if(index === 0)
                        //     this.teams = [response,...this.teams.slice(1)]
                        // else
                        this.teams = [...this.teams.slice(0,index),response,...this.teams.slice(index+1)]
                    })
                    .catch(error =>{
                        console.log(error);
                     })
                })

            }
            
        }

    }
}
</script>