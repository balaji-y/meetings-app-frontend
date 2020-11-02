<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <ul class="nav navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link class="nav-link" to="/calendar">Calendar</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/meetings">Meetings</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/teams">Teams</router-link>
            </li>
            
        </ul>
        <div style="color:white">
                Hello {{email}}
        </div> 
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" to="/logout">Logout</router-link>
            </li>
        </ul>
         
    </nav>
</template>

<script>
export default {
    name:'Navbar',
    data(){
        return {
            email:localStorage.getItem('email')
        }
    }
}
</script>

<style scoped>
div{
    margin-left: 880px;
}

</style>