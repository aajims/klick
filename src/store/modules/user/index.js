import mutations from './mutation'
import getters from './getters'
import actions from './action'

// import corporate from "../../../router/corporate";

const state = {
    listUser: null,
    dropDown: null,
    userAvList: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    userTotal: null,
    userRoles: null,
    detailUser: null,
    userAssignee: null,
    userEnterprise: null,
    totalAccountD: null
};


export default {
    state,
    mutations,
    actions,
    getters
}