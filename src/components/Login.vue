<template>
    <div>
        <h2>Login Page</h2>
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input class="form-control"
                       type="email" 
                       id="email"
                       placeholder="Enter your Email Id" 
                       name="email" 
                       required />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input class="form-control"
                       id="password"
                       type="password" 
                       placeholder="Enter your Password" 
                       name="password" 
                       required />
            </div>

            <button type="button" class="btn btn-primary" @click="submitDetails">Login</button>

        </form>
    </div>
</template>

<script>
import { generateToken } from '../services/authenticate'
export default {
    name:'Login',
    data(){
        return {

        }
    },
    mounted(){
        /*if(localStorage.getItem('token'))
        {
            this.$router.push('calendar');
        }*/
    },
    methods:{
        submitDetails(){
            const email = document.querySelectorAll('#email')[0].value;
            const password = document.querySelectorAll('#password')[0].value;

            generateToken(email,password)
            .then(data => {
                localStorage.setItem('token',data.token);
                localStorage.setItem('email',data.email);
            })
            .catch(error => {
                console.log(error);
            })
            
        }
    }
}
</script>