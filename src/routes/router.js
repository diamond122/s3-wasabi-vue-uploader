import Router from 'vue-router';
import Upload from '../components/Pages/Upload';

const routes = [
  {
    path: '/hash',
    name: 'hash',
    component: Upload,
    props: { type: 'hash' }
  },
  {
    path: '/sign',
    name: 'sign',
    component: Upload,
    props: { type: 'sign' }
  },
  {
    path: '/push',
    name: 'push',
    component: Upload,
    props: { type: 'push' }
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload,
    props: { type: 'upload' }
  },
  {
    path: '/hash-upload',
    name: 'hash-upload',
    component: Upload,
    props: { type: 'hash and upload' },
  },
  {
    path: '/',
    redirect: {
      name: 'hash',
    },
  },
];

export default new Router({
  routes,
});