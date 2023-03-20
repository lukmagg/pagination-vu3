import { createWebHistory, createRouter } from "vue-router";
import Books from '../views/Books.vue';
import Login from './../views/Login.vue';



const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Books',
        name: 'Books',
        component: Books
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;