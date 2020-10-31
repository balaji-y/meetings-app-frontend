<template>
    <div>
        <Navbar />
        <div class="container my-2">
            <div class="row">
                <div class="col-12 clearfix">
                    <div class="clearfix">
                        <h1>Meetings</h1>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 clearfix">
                    <router-link :to="{ name: 'search-meeting'}" class="mr-3">
                        Filter / Search meetings
                    </router-link>
                    <router-link :to="{ name: 'add-meeting' }">
                        Add a meeting
                    </router-link>
                </div>
            </div>

            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar';
export default {
    name:'Meetings',
    components:{
        Navbar
    },
    mounted(){
        if(!localStorage.getItem('token'))
        {
            this.$router.push('/login');
        }
    }
}
</script>