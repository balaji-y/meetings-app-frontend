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


        <div style="background-color:#1e809c">
            <h3 style="color:white" class="mx-3">Add a new meeting</h3>
            <hr />

            <form class="mx-4">
                <div class="form-group">
                    <label for="date">Date</label><br />
                    <input type="date"
                           id="date"  required/>
                </div>

                <div class="form-group">
                    <label for="startTime">Start Time (hh:mm)</label><br />
                    <select id="startTimeHours" required>
                        <option v-for="hour in 24" :value="hour-1" :key="hour">{{hour-1}}</option>
                    </select>
                    :
                    <select id="startTimeMinutes" required>
                        <option v-for="minutes in 60" :value="minutes-1" :key="minutes">{{minutes-1}}</option>
                    </select>
                </div>

                 <div class="form-group">
                    <label for="endTime">End Time (hh:mm)</label><br />
                    <select id="endTimeHours" required>
                        <option v-for="hour in 24" :value="hour-1" :key="hour">{{hour-1}}</option>
                    </select>
                    :
                    <select id="endTimeMinutes" required>
                        <option v-for="minutes in 60" :value="minutes-1" :key="minutes">{{minutes-1}}</option>
                    </select>
                </div>

                 <div class="form-group">
                    <label for="Name">Name of the Meeting</label>
                    <input class="form-control" type="text" id="name" required />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" />
                </div>

                <div class="form-group">
                    <label for="attendees">Email Ids of Attendees or team's short name</label>
                    <input class="form-control" type="text" id="attendees" />
                </div>

                <button type="button" class="btn btn-primary my-2" @click="addMeeting">Add Meeting</button>
            </form>
        </div>
    </div>
</template>

<script>
import { addNewMeeting } from '../services/meetings'
export default {
    name:'AddMeeting',
    data(){
        return {
            status: ''
        }
    },
    methods:{
        addMeeting(){
            const meeting = {}
            meeting.name = document.querySelector('#name').value;
            meeting.description = document.querySelector('#description').value;
            meeting.startTime = {};
            meeting.startTime.hours = +document.querySelector('#startTimeHours').value;
            meeting.startTime.minutes = +document.querySelector('#startTimeMinutes').value;
            meeting.endTime = {};
            meeting.endTime.hours = +document.querySelector('#endTimeHours').value;
            meeting.endTime.minutes = +document.querySelector('#endTimeMinutes').value;
            meeting.date = document.querySelector('#date').value;
            meeting.attendeesEmail = [];

            meeting.attendeesEmail = document.querySelector('#attendees').value;
            console.log("meeting",meeting);
            addNewMeeting(meeting)
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

<style>

</style>