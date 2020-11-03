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
                    :items="meetings"
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
import { getAllMeetings } from '../services/admin-meetings'
import AdminNavbar from './AdminNavbar'
export default {
    name:'AdminMeetings',
    components:{
        AdminNavbar
    },
    data(){
        return {
            search:'',
            headers:[
                {text:'Id',value:'_id'},
                {text:'Name',value:'name'},
                {text:'Description',value:'description'},
                {text:'Date',value:'date'},
                {text:'StartTime',value:'startTime.hours'},
                {value:'startTime.minutes'},
                {text:'EndTime',value:'endTime.hours'},
                {value:'endTime.minutes'}
            ],
            meetings:[]
        }
    },
    mounted(){
        getAllMeetings()
        .then(meetings =>{
            this.meetings = meetings;
            console.log(this.meetings);
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>