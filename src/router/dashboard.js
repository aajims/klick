import Dashboard from '../views/pages/dashboard/dashboard'


import layouts from '../layout'
export default [{
    path: '/',
    alias: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
        auth: true,
        layout: layouts.navLeft,
        searchable: false,
        tags: ['app']
    },
}, ]