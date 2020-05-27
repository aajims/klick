import mutations from './mutation'
import getters from './getters'
import actions from './action'

// import enterprise from "../../../router/enterprise";

const state = {
    listFAQ: null,
    detailFAQ: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    totalFAQ          : null
};


export default {
    state,
    mutations,
    actions,
    getters
}