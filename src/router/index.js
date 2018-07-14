import Vue from 'vue';
import Router from 'vue-router';
import TaskManager from '@/components/TaskManager';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TaskManager',
      component: TaskManager,
    },
    {
      path: '/hello-world',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
