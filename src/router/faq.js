import Admin from '../views/pages/faq/list-faq-admin.vue';
import Edit from '../views/pages/faq/edit-faq.vue';
import FAQ from '../views/pages/faq/list-faq.vue';
import New from '../views/pages/faq/new-faq.vue';


import layouts from '../layout'

export default [{
        path: '/faq',
        name: 'faq',
        component: FAQ,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Faq',
            tags: ['FAQ']
        },
    },
    {
        path: '/manage-faq',
        name: 'AdminFAQ',
        component: Admin,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Admin FAQ',
            tags: ['FAQ']
        },
    },
    {
        path: '/manage-faq/new-faq',
        name: 'NewFAQ',
        component: New,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Create FAQ',
            tags: ['FAQ']
        },
    },
    {
        path: '/manage-faq/:id',
        name: 'EditFAQ',
        component: Edit,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit FAQ',
            tags: ['FAQ']
        },
    },
]