<template>
    <div>
        <div class="row">
            <div class="col-4">
                <h2>Login</h2>
            </div>
            <div class="col-4">
            </div>
            <div class="col-4">
                <router-link to="/signup"><button class="btn btn-primary">Create a New Account</button></router-link>
            </div>
        </div>
        <form id="form" @submit="submitForm">
            
            <div class="form-group">
                <label for="email">Email</label>
                <input class="form-control"
                       type="email" 
                       id="email"
                       v-model="email"
                       name="email"
                       placeholder="Enter your Email Id" 
                       required />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input class="form-control"
                       id="password"
                       type="password" 
                       v-model="password"
                       placeholder="Enter your Password" 
                       name="password" 
                       required />
            </div>

            <input type="submit" value="Login" class="btn btn-primary" />

        </form>

        
    </div>
</template>

<script>
import { generateToken } from '../services/authenticate'
export default {
    name:'Login',
    data(){
        return {
            error:'',
            email:'',
            password:''
        }
    },
    mounted(){
        /*if(localStorage.getItem('token'))
        {
            this.$router.push('calendar');
        }*/
    },
    methods:{

        submitForm(e){
           e.preventDefault();
           generateToken(this.email,this.password)
           .then(response => {
               //console.log(response.status);
               localStorage.setItem('token',response.data.token);
               localStorage.setItem('email',response.data.email);
           })
           .catch(error=> {
               this.error = error;
           })
        }
    }
        
}
</script>