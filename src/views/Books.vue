<template>
  
    <div> 
 
      <!-- Table Books-->
      <div class="row">
        <div class="col m12">
          <table class="table bordered striped">
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

          <ul class="pagination">
            <li v-for="page in pages" v-bind:key="page"><a href="#!"></a></li>
          </ul>
        </div>
      </div>
    </div>
    <button @click="prevPage" v-show="currentPage > 1">Prev</button>
    <button @click="nextPage" v-show="currentPage < totalPages ">Next</button>
    <p>currentPage:{{ currentPage }}</p>
    <p>totalPages:{{ totalPages }}</p>
    <p>offset:{{ offset }}</p>
    <p>Circle CI</p>
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
        offset:0,
        limit:10,
        totalBooks:0,
        totalPages:0,
        currentPage:1,
      } 
    },
    async mounted(){
      this.initBooks();
      await this.countBooks();
      this.totalPages = this.totalBooks / this.limit;
    },
    methods:{
      
      async countBooks(){
        const token = await localforage.getItem('token')
        const headers = {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const graphqlQuery = {
            "operationName": "countTotalBooks",
            "query": `query countTotalBooks { count }`,
            "variables": {}
        };
        const response = await axios({
          method: 'post',
          headers: headers,
          data: graphqlQuery
        });

        this.totalBooks = response.data.data.count
      },
      async initBooks () {
        const token = await localforage.getItem('token')
        const headers = {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const graphqlQuery = {
            "operationName": "nextPage",
            "query": `query nextPage { books(offset:${this.offset}, limit:${this.limit}){
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
      },
      async nextPage () {
        this.offset += this.limit;
        this.currentPage++;
        const token = await localforage.getItem('token')
        const headers = {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const graphqlQuery = {
            "operationName": "nextPage",
            "query": `query nextPage { books(offset:${this.offset}, limit:${this.limit}){
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
               
      },

      async prevPage () {
        this.offset -= this.limit; 
        this.currentPage--;
        const token = await localforage.getItem('token')
        const headers = {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const graphqlQuery = {
            "operationName": "prevPage",
            "query": `query prevPage { books(offset:${this.offset}, limit:${this.limit}){
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
               
      },


    },

    computed:{
      firstPage(){
        return this.firstPage
      }
    },


    
  }
  </script>
  
  <style>

  </style>
  
  