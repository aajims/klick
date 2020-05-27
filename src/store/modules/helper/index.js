import mutations from './mutation'
import getters from './getters'
import actions from './action'

// import enterprise from "../../../router/enterprise";

const state = {
    dataContent: null,
    dataPrivacy: null,
    dataToc: null,
    dataCustomer: null,
    pagesList: null,
    pagesDetail: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    total: null,
};


export default {
    state,
    mutations,
    actions,
    getters
}