<template>
    <div class="m-3">
         <div class="row" v-if="status==='CREATED'">
                <div class="col-12">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert"> 
                        <strong>Team Created</strong> 
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


        <div style="background-color:#1e809c">
            <h3 style="color:white" class="mx-3">Add a new Team</h3>
            <hr />

            <form class="mx-4" @submit="addTeam">
                <div class="form-group">
                    <label for="name">Name</label><br />
                    <input type="text" id="name" class="form-control" v-model="name" required/>
                </div>


                 <div class="form-group">
                    <label for="shortName">Short Name</label>
                    <input class="form-control" type="text" id="shortName" v-model="shortName" required />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description" v-model="description" required />
                </div>

                <div class="form-group">
                    <label for="attendees">Email Ids of Members</label>
                    <input class="form-control" type="text" v-model="membersEmail" id="members" />
                </div>

                <input type="submit" class="btn btn-primary my-2" value="Add Team"/>
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
            status:'',
            name:'',
            shortName:'',
            description:'',
            membersEmail:''
        }
    },
    methods:{
        addTeam(e){
            e.preventDefault();
            const team = {}

            team.name = this.name;
            team.shortName = this.shortName;
            team.description = this.description;
            team.membersEmail = [];
            team.membersEmail = this.membersEmail.split(',')

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