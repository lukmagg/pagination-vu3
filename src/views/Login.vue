<template>
        <div class="row">
            <div class="col m12 card-panel">
                <form @submit.prevent="login">
                    <div class="row">
                        <div class="col m4">
                            <label>Email</label>
                            <input type="email" v-model="email">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col m4">
                            <label>Password</label>
                            <input type="password" v-model="password">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col m4">
                            <button type="submit" class="btn deep-orange darken-1">Login<i class="material-icons right">security</i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
</template>


<script>
import axios from 'axios';
import localforage from 'localforage';


export default{
    name: 'Login',
    data(){
        return {
            email: '',
            password: '',
        }
    },
    methods:{

        async login(){
            const payload = {
                email: this.email,
                password: this.password
            }

            const headers = {
                "content-type": "application/json",                
            };

            const graphqlQuery = {
                "operationName": "getToken",
                    "query": `mutation getToken($email: String!, $password: String!) { 
                        signin(signinInput: { email: $email, password: $password })
                        {
                            token
                        } 
                    }`,
                    "variables": {
                        email:payload.email,
                        password:payload.password
                    }
            };
            
            const response = await axios({
                method: 'post',
                headers: headers,
                data: graphqlQuery
            });

            if(response.data.data === null){
                console.log('error')
            } else {
                await localforage.setItem('token', response.data.data.signin.token); 

                this.$store.commit('setIsLogged', true)         
                
                this.$router.push('/')
            }        
        }
    },

    mounted() {

    } 


}
</script>

<style>

</style>