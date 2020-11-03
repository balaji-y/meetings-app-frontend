import Vue from 'vue';
import Router from 'vue-router';
import {isAuthenticated} from '../services/authenticate'

Vue.use(Router);

const router =  new Router({
    mode:'history',
    routes: [
        {
            name:'Home',
            path:'/',
            component: () => import('@/components/Home')
        },
        {
            name:'Login',
            path:'/login',
            component: () => import('@/components/Login')
        },
        {
            name:'Signup',
            path:'/signup',
            component: () => import('@/components/Signup')
        },
        {
            name:'Calendar',
            path:'/calendar',
            component: () => import('@/components/Calendar')
        },
        {
            name: 'meetings',
            path: "/meetings",
            component: () => import( '@/components/Meetings' ),
            children: [
                {
                    name: "search-meeting",
                    path: "",
                    component: () => import("@/components/FilterMeetings")
                },
                {
                    name: "add-meeting",
                    path: "add",
                    component: () => import("@/components/AddMeeting")
                }
            ]
        },
        {
            name:'Teams',
            path:'/teams',
            component: () => import('@/components/Teams'),
            children: [
                {
                    name: "view-teams",
                    path: "",
                    component: () => import("@/components/ViewTeams")
                },
                {
                    name: "add-team",
                    path: "add",
                    component: () => import("@/components/AddTeam")
                }
            ]
        },
        {
            name:'Logout',
            path:'/logout',
            component: ()=> import('@/components/Logout')
        },
        {
            name:'admin-users',
            path:'/admin-users',
            component: () => import('@/components/AdminUsers')
        },
        {
            name:'admin-meetings',
            path:'/admin-meetings',
            component: () => import('@/components/AdminMeetings')
        },
        {
            name:'admin-teams',
            path:'/admin-teams',
            component: () => import('@/components/AdminTeams')
        },
    ]
});

router.beforeEach((to,from,next) => {
    if(to.name!=='Login' && to.name!=='Signup' && !isAuthenticated()){
        next({name:'Login'})
    } 
    else{
        next()
    }
})

export default router;