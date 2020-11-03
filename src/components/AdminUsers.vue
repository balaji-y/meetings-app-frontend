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
                    :items="users"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1"
                    >
                     <template v-slot:item.actions="{ item }">
                        <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                        >
                        mdi-pencil
                        </v-icon>
                        <v-icon
                        small
                        @click="deleteItem(item)"
                        >
                        mdi-delete
                        </v-icon>
                    </template>
                    
                    </v-data-table>
                </v-card>
            </v-app>
        </div>
         
    </div>
</template>

<script>
import AdminNavbar from './AdminNavbar'
import { getAllUsers } from '../services/admin-users'
export default {
    name:'AdminUsers',
    components:{
        AdminNavbar
    },
    data(){
        return {
            search:'',
            headers:[
                {text:'Id',value:'_id'},
                {text:'Name',value:'name'},
                {text:'Email',value:'email'},
                {text:'Action',value:'actions'}
            ],
            users:[]
        }
    },
    mounted(){
        getAllUsers()
        .then(users =>{
            this.users = users;
            console.log(this.users);
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>