import MyGeneral from '../views/pages/document/mydocument/general.vue';



import layouts from '../layout'

export default [{
    path: '/mydocument/general',
    name: 'mydocument',
    component: MyGeneral,
    meta: {
        auth: true,
        layout: layouts.navLeft,
        searchable: false,
        title: 'General',
        tags: ['Document']
    },
}, ]