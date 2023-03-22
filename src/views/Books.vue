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
            <li v-for="page in totalPages" 
              :key="page" 
              :class="{active: page === currentPage }"
            >
              <a @click="nextPage(page)">{{ page }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button @click="nextPage(currentPage - 1)" v-show="currentPage > 1">Prev</button>
    <button @click="nextPage(currentPage + 1)" v-show="currentPage < totalPages ">Next</button>
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
        books: [],
        offset:0,
        limit:4,
        totalBooks:0,
        totalPages:0,
        currentPage:1,
        token:'',
        headers:{}
      } 
    },
    async mounted(){
      await this.initAuthentication();
      await this.nextPage(1);
      await this.countBooks();
      this.totalPages = Math.ceil(this.totalBooks / this.limit);
    },
    methods:{
      async initAuthentication(){
        this.token = await localforage.getItem('token');
        this.headers = {
          "content-type": "application/json",
          "Authorization": `Bearer ${this.token}`
        };
      },
      async countBooks(){
        const graphqlQuery = {
            "operationName": "countTotalBooks",
            "query": `query countTotalBooks { count }`,
            "variables": {}
        };
        const response = await axios({
          method: 'post',
          headers: this.headers,
          data: graphqlQuery
        });
        this.totalBooks = response.data.data.count
      },
      async nextPage(page) {
      
          this.offset = (page - 1) * this.limit;

          this.currentPage = page;

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
          headers: this.headers,
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
  
  