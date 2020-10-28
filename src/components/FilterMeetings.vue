<template>
    <div class="m-3">

        <div style="background-color:#1e809c">
            <h3 style="color:white">Search for Meetings</h3>
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
        
        <div class="row mx-3 my-4">
            <div class="col-12">
                <div class="row">
                    <h2>Meeting Matching your filter</h2>
                </div>
            </div>
          <hr style="width:100%;text-align:left;margin-left:0">
            <div class="col-12">
                <div class="row meeting-style" v-for="meeting in meetings" :key="meeting._id">
                    
                    <div class="col-11">
                        <div class="row">
                            <div class="col-4">
                                <h6>{{meeting.date}} </h6>
                            </div>
                            <div class="col-4">
                                <p>{{meeting.startTime.hours}}:{{meeting.startTime.minutes}} - {{meeting.endTime.hours}}:{{meeting.endTime.minutes}}</p>
                            </div>
                            
                        </div>
                        <p style="font-weight:bold">by {{meeting.name}}</p>

                        <button class="btn btn-danger" type="button" @click="excuseYourself(meeting._id)">Excuse Yourself</button>

                        <hr />
                        <span>Attendees:</span>
                        <span v-for="attendee in meeting.attendees" :key="attendee._id">
                            {{attendee.email}}
                        </span>

                        <div class = "row">
                            <div class="col-3 m-2">
                                <select id="userToAdd">
                                    <option>Select Member</option>
                                    <option v-for="user in users" :key="user._id" :value="user.email">
                                        {{user.email}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-4">
                                <button type="button" @click="addUserToMeeting(meeting._id)" class="btn btn-primary">
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

import { fetchMeetingsForDay,getUsers,deleteUserFromMeeting,getUserId,addUserToSpecificMeeting } from '../services/meetings';
export default {
    name:'FilterMeetings',
    components:{
        
    },
    data() {
        return {
            meetings: []
        }
    },
    methods:{
        excuseYourself(meetingId){
            //console.log(meetingId);
            deleteUserFromMeeting(meetingId)
            .then(response => {
                console.log(response.data);
                this.searchMeetings();
            })
            .catch(error => {
                console.log(error);
            })
        },

        addUserToMeeting(meetingId){
            let email = document.querySelector('#userToAdd').value;
            let userId = ''
            getUserId(email)
            .then(response => {
                userId = response._id;
                const newUser = {userId,email};
                addUserToSpecificMeeting(meetingId,newUser)
                .then(response => {
                    console.log(response.data);
                    this.searchMeetings();
                })
                .catch(error =>{
                    console.log(error);
                })
            })
            .catch(error=> {
                console.log(error);
            });
 
        },

        getDate(date){
            let modifiedDate = date.getDate()+'-'+date.getMonth()+'-'+date.getYear();
            return modifiedDate;
        },
        
        searchMeetings(){
            const date = document.querySelector('#dateSelected').value;
            const searchTerm = document.querySelector('#searchTerm').value;
            fetchMeetingsForDay(date,searchTerm)
            .then(meetings => {
                this.meetings = meetings;
                console.log(this.meetings);
            })
            .catch(error => {
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