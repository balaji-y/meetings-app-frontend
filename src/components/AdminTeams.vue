<template>
    <div>
        <AdminNavbar />
         <div id="app">
            <v-app>
                <v-card>
                    <v-card-title>
                         <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            >
                        </v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="teams"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1"
                    ></v-data-table>
                </v-card>
            </v-app>
        </div>
    </div>
</template>

<script>
import { getAllTeams } from '../services/admin-teams'
import AdminNavbar from './AdminNavbar'
export default {
    name:'AdminTeams',
    components:{
        AdminNavbar
    },
    data(){
        return {
            search:'',
            headers:[
                {text:'Id',value:'_id'},
                {text:'Name',value:'name'},
                {text:'ShortName',value:'shortName'},
                {text:'Description',value:'description'}
            ],
            teams:[]
        }
    },
    mounted(){
        getAllTeams()
        .then(teams =>{
            this.teams = teams;
            console.log(this.teams);
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>