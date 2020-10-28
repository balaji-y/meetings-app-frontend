import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
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
        }
    ]
})