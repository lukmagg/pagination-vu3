import { createWebHistory, createRouter } from "vue-router";
import Students from './../views/Students.vue';
import Login from './../views/Login.vue';



const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/students',
        name: 'Students',
        component: Students
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;