import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Survey from "../views/Survey.vue";
import store from "../store/index.js";
import AuthLayout from "../components/AuthLayout.vue";
import SurveyView from "../views/SurveyView.vue";


const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: DefaultLayout,
    meta: {requiresAuth: true},
    children: [
      {path: '/dashboard', name: 'Dashboard', component: Dashboard},
      {path: '/surveys', name: 'Survey', component: Survey},
      {path: '/surveys/create', name: 'SurveyCreate', component: SurveyView},
      {path: '/surveys/:id', name: 'SurveyView', component: SurveyView},
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/login',
    component: AuthLayout,
    meta: {isGuest: true},
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      }, {
        path: '/register',
        name: 'Register',
        component: Register
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'Login'})
  } else if (store.state.user.token && (to.meta.isGuest)) {
     next({name: 'Dashboard'})
  } else {
    next();
  }
})
export default router;
