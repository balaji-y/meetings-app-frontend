<template>
    <div class="container">
        <div class="row my-5">
            <div class="col-4">
                <h2>Signup</h2>
            </div>
            <div class="col-4">
            </div>
            <div class="col-4">
                <router-link to="/login"><button class="btn btn-primary">Click here to Login</button></router-link>
            </div>
        </div>
        
        <button class="btn btn-success" disabled v-if="success">{{success}}</button>
        <form id="form" @submit="submitForm">
            <div class="form-group" v-if="error">
                <button class="btn btn-danger">{{error}}</button>
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control"
                       type="text" 
                       id="name"
                       v-model="name"
                       name="name"
                       placeholder="Enter your Name" 
                       required />
            </div>

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

            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input class="form-control"
                       id="confirmPassword"
                       type="password" 
                       v-model="confirmPassword"
                       placeholder="Enter your Password Again" 
                       name="confirmPassword" 
                       required />
            </div>

            <input type="submit" value="Signup" class="btn btn-primary" />

        </form>

        
    </div>
</template>

<script>
import { registerUser } from '../services/authenticate'
export default {
    name:'Signup',
    data(){
        return {
            error:'',
            success:'',
            name:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    },
    methods:{
        submitForm(e){
            e.preventDefault();
            if(this.password !== this.confirmPassword){
                this.error = 'Passwords Mismatch'
            }
            else{
                this.error = ''; 
                const user = {};
                user.name = this.name;
                user.email = this.email;
                user.password = this.password;
                //console.log(user);
                registerUser(user)
                    .then(response =>{
                        if(response.status === 204)
                        {
                            console.log(response.data);
                            this.success = 'Successfully Registered';
                            this.error = '';
                            this.name = '';
                            this.email = '';
                            this.password = '';
                            this.confirmPassword = '';
                            return;
                        }    
                    })
                    .catch(error => {
                        if(error.response.data.message.includes('duplicate key error'))
                        {
                            this.error = 'Email already exists! Try with another Email'
                        }
                    })    
            }
        }
    }
}
</script>