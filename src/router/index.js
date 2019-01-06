import Vue from 'vue'
import Router from 'vue-router'
import VueLazyload from 'vue-lazyload'
import Movie from '../view/Movie'
import Hot from '../components/Movie/Hot'
import Soon from '../components/Movie/Soon'
import Cinema from "../view/Cinema"
import Mine from "../view/Mine"
import Buy from "../components/Buy/Buy.vue"
import Login from "../view/Login.vue"
import store from '../store'

Vue.use(Router)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/img/taopp-max.png',
  loading: '../static/img/taopp-max.png',
  attempt: 1
})

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/movie'
    },
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: '/',
          component: Hot
        },
        {
          path: 'soon',
          component: Soon
        }
      ]
    },
    {
      path: '/cinema',
      component: Cinema
    },
    {
      path: '/buy',
      component: Buy,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.isLogin) {
      next()
    } else {
      next("/login")
    }
  } else {
    next()
  }
});

export default router
