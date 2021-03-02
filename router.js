import Vue from 'vue'
import Router from 'vue-router'
import routes from '~/routes';
// import Landing from '@/pages/autosuggest'

Vue.use(Router)

// const Landing = () => import('~/pages/autosuggest').then(m => m.default || m)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes
  })
}
