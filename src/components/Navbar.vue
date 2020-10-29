<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <ul class="nav navbar-nav">
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
    </nav>
</template>

<script>
export default {
    name:'Navbar'
}
</script>