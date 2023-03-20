<template>
  
    <div> 
 
      <!-- Table Books-->
      <div class="row">
        <div class="col m12">
          <table class="table bordered striped" v-show="!isLoading">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" v-bind:key="book">
                <td>{{ book.id }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
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
    name: 'Books',
    data(){
      return { 
        name: '',
        surname: '',
        age: 0,
        books: [],
      } 
    },
    mounted(){
      this.isLoading = true;
      this.getBooks()
    },
    methods:{

      async getBooks () {
        const token = await localforage.getItem('token')
        const headers = {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const graphqlQuery = {
            "operationName": "getBooks",
            "query": `query getBooks { books(offset:0, limit:10){
              id
              title
              author
            } }`,
            "variables": {}
        };
        const response = await axios({
          method: 'post',
          headers: headers,
          data: graphqlQuery
        });
        this.books = response.data.data.books     
        
        this.isLoading = false
      }
    },

    computed:{

    },


    
  }
  </script>
  
  <style>

  </style>
  
  