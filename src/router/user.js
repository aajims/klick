import ListUser from '../views/pages/user/list-user.vue'
import EditUser from '../views/pages/user/edit-user.vue'
import NewUser from '../views/pages/user/new-user.vue'
import DetailUser from '../views/pages/user/detail-user.vue'



import layouts from '../layout'

export default [{
        path: '/list-user',
        name: 'List User',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List User',
            tags: ['User']
        },
    },
    {
        path: '/new-user',
        name: 'NewUser',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New User',
            tags: ['User']
        },
    },
    {
        path: '/detail-user/:id',
        name: 'Detail User',
        component: DetailUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail User',
            tags: ['User']
        },
    },
    {
        path: '/edit-user/:id',
        name: 'Edit User',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit User',
            tags: ['User']
        },
    },




]