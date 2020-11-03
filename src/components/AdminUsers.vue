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
                     <template v-slot:top>
                        <v-toolbar
                        flat
                        >
                       
                       
                        
                        <v-dialog
                            v-model="dialog"
                            max-width="500px"
                        >
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Edit User</span>
                                </v-card-title>
                
                            <v-card-text>
                                <v-container>
                                <v-row>
                                    <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    >
                                    <v-text-field
                                        v-model="editedItem._id"
                                        label="Id"
                                        :disabled =true
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    >
                                    <v-text-field
                                        v-model="editedItem.name"
                                        label="Name"
                                    ></v-text-field>
                                    </v-col>
                                    
                                    
                                </v-row>
                                </v-container>
                            </v-card-text>
                
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                                >
                                Cancel
                                </v-btn>
                                <v-btn
                                color="blue darken-1"
                                text
                                @click="save"
                                >
                                Save
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        </v-toolbar>
                    </template>
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
import { getAllUsers,deleteUser, updateUser } from '../services/admin-users'
export default {
    name:'AdminUsers',
    components:{
        AdminNavbar
    },
    data(){
        return {
            dialog:false,
            dialogDelete:false,
            editedIndex:-1,
            editedItem:{
                name:'',
            },
            defaultItem:{
                name:'',
            },
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
    methods:{
        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            //console.log(item);
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.users.splice(this.editedIndex, 1)
            //console.log(this.editedItem);
            deleteUser(this.editedItem._id)
            .then(response => {
                console.log(response);
                console.log('deleted');
                this.closeDelete()
            })
            .catch(error=>{
                console.log(error);
            })
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        save () {
            if (this.editedIndex > -1) {
                console.log(this.editedItem)
                Object.assign(this.users[this.editedIndex], this.editedItem)
                updateUser(this.editedItem)
                .then(response => {
                    console.log(response);
                    console.log('updated');
                    this.close();
                })
                .catch(error => {
                    console.log(error);
                })
            } else {
                this.users.push(this.editedItem);
                this.close();
            }
            
        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
      })
    },
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