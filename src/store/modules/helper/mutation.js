import * as mutation from '../../mutation-types'

export default {
    [mutation.SET_PAGES](state, payload) {
        state.pagesList              = payload.dataList
        state.total                 = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_PAGES_DETAIL](state, payload) {
        state.pagesDetail = payload.data
    },
 
    [mutation.SET_DATA_TOC](state, payload) {
        state.dataToc = payload.data
    },
    [mutation.SET_DATA_PRIVACY](state, payload) {
        state.dataPrivacy = payload.data
    },
    [mutation.SET_DATA_CUSTOMER](state, payload) {
        state.dataCustomer = payload.data
    },
    [mutation.SET_DATA_CONTENT](state, payload){
        state.dataContent = payload.data
    }

};