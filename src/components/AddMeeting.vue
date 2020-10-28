<template>
     <div class="m-3">

        <div style="background-color:#1e809c">
            <h3 style="color:white">Add a new meeting</h3>
            <hr />

            <form class="mx-4">
                <div class="form-group">
                    <label for="date">Date</label><br />
                    <input type="date"
                           id="date" />
                </div>

                <div class="form-group">
                    <label for="startTime">Start Time (hh:mm)</label><br />
                    <select id="startTimeHours">
                        <option v-for="hour in 24" :value="hour-1" :key="hour">{{hour-1}}</option>
                    </select>
                    :
                    <select id="startTimeMinutes">
                        <option v-for="minutes in 60" :value="minutes-1" :key="minutes">{{minutes-1}}</option>
                    </select>
                </div>

                 <div class="form-group">
                    <label for="endTime">End Time (hh:mm)</label><br />
                    <select id="endTimeHours">
                        <option v-for="hour in 24" :value="hour-1" :key="hour">{{hour-1}}</option>
                    </select>
                    :
                    <select id="endTimeMinutes">
                        <option v-for="minutes in 60" :value="minutes-1" :key="minutes">{{minutes-1}}</option>
                    </select>
                </div>

                 <div class="form-group">
                    <label for="Name">Name of the Meeting</label>
                    <input class="form-control" type="text" id="name" />
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
import { addNewMeeting, getUserId } from '../services/meetings'
export default {
    name:'AddMeeting',
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
            meeting.attendees = [];

            const attendeesList = document.querySelector('#attendees').value.split(',');

            attendeesList.forEach(attendeeEmail => {
                getUserId(attendeeEmail)
                .then(response => {
                    let user = {email:attendeeEmail,userId:response._id};
                    meeting.attendees.push(user);
                })
                .catch(error => {
                    console.log(error);
                })  
            });

            console.log('meeting',meeting);

            addNewMeeting(meeting)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })

        }
    }
}
</script>

<style>

</style>