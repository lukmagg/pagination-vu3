<template>
  <nav class="light-blue darken-1">
    <div class="nav-wrapp">
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/students" v-if="isLogged">Students</router-link></li>
        <li><router-link to="/login" v-if="!isLogged">Login</router-link></li>
        <button @click="logout" v-if="isLogged">Logout</button>
      </ul>
    </div>
  </nav>

  <div>
    <h4>Skateboarding is not a crime!</h4>
  </div>
  
  <div class="container" style="margin-top: 30px;">
    <router-view></router-view>
  </div>

  
</template>


<script>
  import localforage from 'localforage';


  export default{
    name: 'App',
    methods:{
      async logout(){
        await localforage.removeItem('token');
        this.$store.commit('setIsLogged', false) 
        
      }
    },
    computed:{
      isLogged(){
        return this.$store.state.isLogged
      },

    },

    mounted() {

    } 

  }
  

</script>


<style>
  
</style>

