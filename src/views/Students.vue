<template>
  
    <div> 
      <form @submit.prevent="addUser">
        <div class="row">
          <div class="col m12">
            <div class="col m4 card-panel">
  
              <div class="col m4">
                <label>Name</label>
                <input type="text" v-model="name">
              </div>
              <div class="col m4">
                <label>Surname</label>
                <input type="text" v-model="surname">
              </div>
              <div class="col m3">
              <label>Age</label>
              <input type="number" v-model="age">
            </div>
            </div>
          </div>
        </div>  
  
        <div class="row">
          <div class="col m12">
            <button type="submit" class="btn indigo darken-4">Add user <i class="material-icons">add_circle</i></button>
          </div>
        </div>
      </form>
  
      <!-- Table -->
      <div class="row">
        <div class="col m12">
          <table class="table bordered striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" v-bind:key="user">
                <td>{{ user.name }}</td>
                <td>{{ user.surname }}</td>
                <td>{{ user.age }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import localforage from 'localforage';
  
  export default {
    name: 'Students',
    data(){
      return { 
        name: '',
        surname: '',
        age: 0,
        users: [
          {
            "name":"lucas",
            "surname":"maggio",
            "age":36
          },
          {
            "name":"inaia",
            "surname":"maggio",
            "age":13
          }
        ],
        books: []
      } 
    },
    mounted(){
      this.getBooks()
    },
    methods:{
      addUser(){
        let data = {
          name: this.name,
          surname: this.surname,
          age: this.age
        }
        this.users.push(data)
      },

      async getBooks () {
        const token = await localforage.getItem('token')

        const headers = {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const graphqlQuery = {
            "operationName": "getBooks",
            "query": `query getBooks { books(offset:0, limit:5, search: "ushuaia"){
              id
              title
            } }`,
            "variables": {}
        };

        const response = await axios({
          method: 'post',
          headers: headers,
          data: graphqlQuery
        });

        

        this.books = response.data.data.books

        //console.log(response.data.data.books); // data
      }
    },

    computed:{

    },


    
  }
  </script>
  
  <style>

  </style>
  
  