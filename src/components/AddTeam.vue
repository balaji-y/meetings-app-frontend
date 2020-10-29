<template>
    <div class="m-3">
         <div class="row" v-if="status==='CREATED'">
                <div class="col-12">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert"> 
                        <strong>Meeting Created</strong> 
                    </div>
                </div>
        </div>

        <div class="row" v-if="status==='ERROR_CREATING'">
                <div class="col-12">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{{error.message}}</strong>
                    </div>
                </div>
        </div>


        <div>
            <h3 style="color:black" class="mx-3">Add a new Team</h3>
            <hr />

            <form class="mx-4">
                <div class="form-group">
                    <label for="name">Name</label><br />
                    <input type="text" id="name" class="form-control"  required/>
                </div>


                 <div class="form-group">
                    <label for="shortName">Short Name</label>
                    <input class="form-control" type="text" id="shortName" required />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description" required />
                </div>

                <div class="form-group">
                    <label for="attendees">Email Ids of Members</label>
                    <input class="form-control" type="text" id="members" />
                </div>

                <button type="button" class="btn btn-primary my-2" @click="addTeam">Add Team</button>
            </form>
        </div>
    </div>
</template>

<script>
import { addNewTeam } from '../services/teams'
export default {
    name:'AddTeam',
    data() {
        return {
            status:''
        }
    },
    methods:{
        addTeam(){
            const team = {}
            team.name = document.querySelector('#name').value;
            team.shortName = document.querySelector('#shortName').value;
            team.description = document.querySelector('#description').value;
            team.membersEmail = [];
            team.membersEmail = document.querySelector('#members').value.split(',');
            console.log("team",team);
            addNewTeam(team)
            .then(response => {
                this.status = 'CREATED'
                console.log(response)
            })
            .catch(error => {
                this.error = error;
                this.status = 'ERROR_CREATING'
                console.log(error);
            })

        }
    }
}
</script>

<style scoped>

</style>