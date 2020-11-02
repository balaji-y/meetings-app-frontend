<template>
     <div class="m-3">
         <div class="row" v-if="status==='CREATED'">
                <div class="col-12">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert"> 
                        <strong>Meeting Created!!</strong> 
                        <strong> You will get an official confirmation soon through mail</strong> 
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

            <form class="mx-4" @submit="addMeeting">
                <div class="form-group">
                    <label for="date">Date</label><br />
                    <input type="date"
                           id="date"  
                           v-model="date"
                           required/>
                </div>

                 <div class="form-group">
                    <label for="Name">Name of the Meeting</label>
                    <input class="form-control"
                           type="text" 
                           id="name" 
                           v-model="name"
                           required />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control"
                              id="description" 
                              v-model="description"
                              required/>
                </div>

                <div class="form-group">
                    <label for="startTime">Start Time (hh:mm)</label><br />
                    <select id="startTimeHours" required v-model="startTimeHours">
                        <option v-for="hour in 24" :value="hour-1" :key="hour">{{hour-1}}</option>
                    </select>
                    :
                    <select id="startTimeMinutes" required v-model="startTimeMinutes">
                        <option v-for="minutes in 60" :value="minutes-1" :key="minutes">{{minutes-1}}</option>
                    </select>
                </div>

                 <div class="form-group">
                    <label for="endTime">End Time (hh:mm)</label><br />
                    <select id="endTimeHours" required v-model="endTimeHours">
                        <option v-for="hour in 24" :value="hour-1" :key="hour">{{hour-1}}</option>
                    </select>
                    :
                    <select id="endTimeMinutes" required v-model="endTimeMinutes">
                        <option v-for="minutes in 60" :value="minutes-1" :key="minutes">{{minutes-1}}</option>
                    </select>
                </div>

                

                <div class="form-group">
                    <label for="attendees">Email Ids of Attendees or team's short name</label>
                    <input class="form-control" 
                           type="text" 
                           id="attendees" 
                           v-model="attendees"/>
                </div>

                <input type="submit" class="btn btn-primary my-2" value="Add Meeting" />
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
            status: '',
            name:'',
            description:'',
            startTimeHours:'',
            startTimeMinutes:'',
            endTimeHours:'',
            endTimeMinutes:'',
            attendees:'',
            date:''
        }
    },
    methods:{
        addMeeting(e){
            e.preventDefault();
            const meeting = {}
            
            meeting.name = this.name;
            meeting.description = this.description;
            meeting.startTime = {};
            meeting.startTime.hours = +this.startTimeHours;
            meeting.startTime.minutes = +this.startTimeMinutes;
            meeting.endTime = {};
            meeting.endTime.hours = +this.endTimeHours;
            meeting.endTime.minutes = +this.endTimeMinutes;
            meeting.date = this.date;
            meeting.attendeesEmail = this.attendees;

            console.log("meeting",meeting);
            addNewMeeting(meeting)
            .then(response => {
                this.status = 'CREATED';
                this.name='';
                this.description='';
                this.startTimeMinutes='';
                this.startTimeHours='';
                this.endTimeMinutes='';
                this.endTimeHours='';
                this.date='';
                this.attendees='';
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