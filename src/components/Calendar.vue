<template>
    <div>
        <Navbar />
        <div class="container my-2">
            <div class="row">
                <div class="col-12 clearfix">
                    <h1>
                        Calendar
                        <div class="float-right">

                        </div>
                    </h1>
                    <hr />
                    <div class="row">
                        <div class="col-4">
                            <h3>{{selectedDate}}</h3>
                        </div>
                        <div class="col-4">
                        </div>
                        <div class="col-4">
                            <input type="date" 
                                   @change="dateChangeHandler( $event )" 
                                   :value="selectedDate"  />
                        </div>
                    </div>
                </div>
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

            <div class="row" v-if="meetings.length===0">
                <div class="col-12">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>No Meetings for the day</strong> 
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


    
            <div class="row" v-if="status==='LOADED'">
                
                <div class="col-12 my-2" v-for="meeting in meetings" :key="meeting._id">
                        <div class="card">
                            <div class="card-body">
                                
                                <h4 class="card-title">{{meeting.name}}</h4>
                                <div class="card-text">
                                     <div>
                                        {{meeting.startTime.hours}}:{{meeting.startTime.minutes}}  -  {{meeting.endTime.hours}}:{{meeting.endTime.minutes}}
                                    </div>
                                    <div>
                                        <span>{{meeting.description}}</span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
    
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar';
import { fetchMeetingsForDay } from '../services/meetings';
const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';

export default {
    name:'Calendar',
    components:{
        Navbar
    },
    data(){
        return {
            status:LOADING,
            selectedDate:(new Date()).toISOString().substr(0,10),
            meetings: []

        }
    },
    methods:{
        dateChangeHandler( event ){
            this.selectedDate = event.target.value;
            this.fetchMeetingsForDay();
        },
        fetchMeetingsForDay(){
            fetchMeetingsForDay(this.selectedDate)
            .then(meetings => {
                this.status = LOADED;
                this.meetings = meetings;
            })
            .catch(error => {
                this.status = ERROR_LOADING;
                this.error = error;
            })
        }
    },

    mounted(){
        if(localStorage.getItem('token'))
        {
            this.fetchMeetingsForDay();
        }
        else{
            this.$router.push('/login');
        }
        
    }
}
</script>

<style>

</style>