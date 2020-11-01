<template>
    <div>
    </div>
</template>

<script>
export default {
    name:'Home',
    mounted(){
        if(localStorage.getItem('token'))
        {
            this.$router.push('calendar');
        }
        else{
            this.$router.push('login');
        }
    }
}
</script>