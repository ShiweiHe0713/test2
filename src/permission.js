import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'
import { ACCESS_TOKEN } from '@/store/mutation-types'


NProgress.configure({ showSpinner: false })

const whiteList = ['/login', 'register', 'registerResult']
router.beforeEach((to, from, next) => {
 NProgress.start()
 next()
 if (whiteList.includes(to.path)) {
  storage.set(ACCESS_TOKEN, "")
  next()
 } else {
  if (storage.get(ACCESS_TOKEN)) {
   next()
  } else {
   next({ path: "/login" })
  }

 }

})

router.afterEach(() => {
 NProgress.done() // finish progress bar
})
