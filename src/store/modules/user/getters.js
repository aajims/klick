
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_USER](state) {
    return state.listUser
},
[getter.GET_PAGINATE_USER](state){
    return state.paginate
},
[getter.GET_USER_A_LIST](state) {
    return state.userAvList
},
[getter.GET_USER_TOTAL](state) {
    return state.userTotal
},
[getter.GET_DROPDOWN_USER](state){
    return state.dropDown
},
[getter.GET_USER_ROLES](state) {
    return state.userRoles
},
[getter.USER](state) {
    return state.detailUser
},
[getter.GET_USER_ASSIGNEE](state) {
    return state.userAssignee
},
[getter.GET_USER_ENTERPRISE](state) {
    return state.userEnterprise
},
[getter.GET_TOTAL_ACCOUNT_USER](state){
    return state.totalAccountD
}
};

