<template>
    <div>
        <Navbar />
        <div class="container my-2">
            <div class="row">
                <div class="col-12 clearfix">
                    <div class="clearfix">
                        <h1>Teams</h1>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 clearfix">
                    <router-link :to="{ name: 'view-teams'}" class="mr-3">
                        View Teams
                    </router-link>
                    <router-link :to="{ name: 'add-team' }">
                        Add a Team
                    </router-link>
                </div>
            </div>

            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
export default {
    name:"Teams",
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