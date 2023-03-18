<template>
  <nav class="light-blue darken-1">
    <div class="nav-wrapp">
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/Students">Students</router-link></li>
        <li><router-link to="/Login">Login</router-link></li>
        <button @click="logout">Logout</button>
      </ul>
    </div>
  </nav>

  <div class="container" style="margin-top: 30px;">
    <router-view></router-view>
  </div>

</template>


<script>

  export default{
    name: 'App',
    methods:{
      async logout(){
        await localforage.removeItem('token');
      }
    }
  }
  

</script>


<style>
  
</style>

