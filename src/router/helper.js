import Privacy from '../views/pages/helper/privacy'
import TOC from '../views/pages/helper/toc'
import Static from '../views/pages/helper/list-pages.vue'
import DetailContent from '../views/pages/helper/edit-content.vue'
import Customer from '../views/pages/helper/customer.vue'

import layouts from '../layout'

export default [{
        path: '/pages/privacy',
        name: 'Privacy',
        component: Privacy,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Privacy',
            tags: ['static']
        },
    },
    {
        path: '/pages/terms-and-condition',
        name: 'TOC',
        component: TOC,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'TOC',
            tags: ['static']
        },
    },
    {
        path: '/pages/customer-service',
        name: 'Customer',
        component: Customer,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Customer',
            tags: ['static']
        },
    },
    {
        path: '/pages',
        name: 'Static Content',
        component: Static,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Static Content',
            tags: ['static']
        },
    },
    {
        path: '/detail-pages/:id',
        name: 'Detail Content',
        component: DetailContent,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail Content',
            tags: ['static']
        },
    },
]