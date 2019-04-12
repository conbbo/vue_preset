import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router =  new Router({
  mode: 'history',
  routes: [

  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {//如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})
export default router