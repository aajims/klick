import * as getter from '../../getters-types'


export default {
    [getter.GET_DATA_CONTENT](state) {
        return state.dataContent
    },
    [getter.GET_DATA_TOC](state) {
        return state.dataToc
    },
    [getter.GET_DATA_PRIVACY](state) {
        return state.dataPrivacy
    },
    [getter.GET_DATA_CUSTOMER](state) {
        return state.dataCustomer
    },
    [getter.GET_PAGES_LIST](state) {
        return state.pagesList
    },
    [getter.GET_PAGES_DETAIL](state) {
        return state.pagesDetail
    },
    [getter.GET_PAGES_TOTAL](state) {
        return state.total
    },
    [getter.GET_PAGINATE_PAGES](state){
        return state.paginate
    },
};
