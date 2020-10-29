<template>
    <div class="m-3">

        <div style="background-color:#1e809c">
            <h3 style="color:white" class="mx-3">Search for Meetings</h3>
            <hr />

            <form>
                <div class="form-group m-4">
                    <label for="date">Date</label>
                    <select id="dateSelected" 
                            class="form-control"
                            required>
                        <option>TODAY</option>
                        <option>PAST</option>
                        <option>ALL</option>
                        <option>UPCOMING</option>
                    </select>
                </div>

                <div class="form-group m-4">
                    <label for="searchTerm">Search for</label>
                    <input type="text" 
                           class="form-control"
                           placeholder="Search for words describing the meeting"
                           name="searchTerm"
                           id="searchTerm"
                    />
                </div>

                <button type="button" class="btn btn-primary m-4" @click="searchMeetings">Submit</button>
            </form>
        </div>
        

        <div class="row" v-if="status==='LOADING'">
                <div class="col-12">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>Meetings Loading</strong> 
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


        <div class="row" v-if="status==='LOADED' && meetings.length ===0">
                <div class="col-12">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>No Meetings Found for your Search</strong>
                    </div>
                </div>
        </div>



        <div class="row mx-3 my-4" v-if="status==='LOADED' && meetings.length >0">
            <div class="col-12">
                <div class="row">
                    <h2>Meeting Matching your filter</h2>
                </div>
            </div>
          <hr style="width:100%;text-align:left;margin-left:0">
            <div class="col-12">
                <div class="row meeting-style" v-for="(meeting,index) in meetings" :key="meeting._id">
                    
                    <div class="col-11">
                        <div class="row">
                            <div class="col-4">
                                <h6>{{meeting.date}} </h6>
                            </div>
                            <div class="col-4">
                                <p>{{meeting.startTime.hours}}:{{meeting.startTime.minutes}} - {{meeting.endTime.hours}}:{{meeting.endTime.minutes}}</p>
                            </div>
                            
                        </div>
                        <p style="font-weight:bold">{{meeting.name}}</p>

                        <button class="btn btn-danger" type="button" @click="excuseYourself(meeting._id,index)">Excuse Yourself</button>

                        <hr />
                        <span>Attendees:</span>
                        <span v-for="attendee in meeting.attendees" :key="attendee._id">
                            {{attendee.email}}
                        </span>

                        <div class = "row mx-2 my-2">
                                <select id="userToAdd">
                                    <option>Select Member</option>
                                    <option v-for="userEmail in getRemainingUsers(meeting.attendees)" :key="userEmail" :value="userEmail">
                                        {{userEmail}}
                                    </option>
                                </select>
                           
                            
                                <button type="button" @click="addUserToMeeting(meeting._id, $event, index)" class="btn btn-primary mx-2">
                                    Add
                                </button>
                            
                        </div>  

                    </div>
                </div>
            </div>               
        </div>
    </div>
</template>

<script>

import { fetchMeetingsForDay,getUsers,deleteUserFromMeeting,getUserId,addUserToSpecificMeeting } from '../services/meetings';
const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';
export default {
    name:'FilterMeetings',
    components:{
        
    },
    data() {
        return {
            meetings: [],
            status :'none'
        }
    },
    methods:{
        excuseYourself(meetingId,index){
            //console.log(meetingId);
            deleteUserFromMeeting(meetingId)
            .then(response => {
                console.log(response);
                console.log(index);
                if(index === 0)
                    this.meetings = [...this.meetings.slice(1)]
                else
                    this.meetings = [...this.meetings.slice(0,index),...this.meetings.slice(index)]
            })
            .catch(error => {
                console.log(error);
            })
        },

        addUserToMeeting(meetingId,event,index){
           // let email = document.querySelector('#userToAdd').value;
            let email = event.target.parentElement.children[0].value;
            if(email!='Select Member')
            {   
                let userId = ''
                getUserId(email)
                .then(response => {
                    userId = response._id;
                    const newUser = {userId,email};
                    addUserToSpecificMeeting(meetingId,newUser)
                    .then(response => {
                        console.log("response",response);
                        if(index === 0)
                            this.meetings = [response,...this.meetings.slice(1)]
                        else
                            this.meetings = [...this.meetings.slice(0,index),response,...this.meetings.slice(index)]
                    })
                    .catch(error =>{
                        console.log(error);
                     })
                })

            }
            
        },

        getRemainingUsers(attendees)
        {  
            const attendeesEmail = attendees.map(attendee => attendee.email);
            const allUsersEmail = this.users.map(user => user.email);
           
            const result = allUsersEmail.filter(x => !attendeesEmail.includes(x));
            return result;
        },

        getDate(date){
            let modifiedDate = date.getDate()+'-'+date.getMonth()+'-'+date.getYear();
            return modifiedDate;
        },
        
        searchMeetings(){
            this.status = LOADING;
            const date = document.querySelector('#dateSelected').value;
            const searchTerm = document.querySelector('#searchTerm').value;
            fetchMeetingsForDay(date,searchTerm)
            .then(meetings => {
                this.status = LOADED;
                this.meetings = meetings;
                //console.log(this.meetings);
            })
            .catch(error => {
                this.status = ERROR_LOADING;
                this.error = error;
                console.log(error);
            })
        }
    },
    mounted(){
        getUsers()
        .then(users => {
            this.users = users;
        })
        .catch(error => {
            this.error = error;
        })
    }
}
</script>

<style>
.meeting-style{
    border: 1px solid black;
    border-radius: 10px;
    padding:5px;
    margin-top:20px;
}
</style>