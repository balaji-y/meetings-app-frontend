<template>
    <div class="row mx-2 my-4" >
            <div class="col-12">
                <div class="row">
                    <h2>Meetings Matching Search criteria</h2>
                </div>
            </div>
          <hr style="width:100%;text-align:left;margin-left:0">
          <p>{{meetings[9]}}</p>
                        
    </div>
</template>

<script>
export default {
    name:'MeetingsList',
    props:['meetings'],
    data() {
        return {

        }
    },
    mounted(){

    }
}
</script>

,<style lang="stylus" scoped>

</style>