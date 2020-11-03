<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <ul class="nav navbar-nav mr-auto">
            <li class="nav-item">
                <router-link class="nav-link" to="/admin-users">Users</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin-meetings">Meetings</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin-teams">Teams</router-link>
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
    name:'AdminNavbar',
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