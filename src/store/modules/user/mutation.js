import * as mutation from '../../mutation-types'
export default {
    [mutation.SET_DROPDOWN_USER](state, payload){
        state.dropDown  = payload.dataList
    },
    [mutation.SET_USER_D_AVAILABLE](state, payload){
        state.userAvList  = payload.dataList
    },
    [mutation.SET_LIST_USER](state, payload){
        state.listUser              = payload.dataList
        state.userTotal             = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_USER_ROLES](state, payload){
        state.userRoles  = payload.dataList
    },
    [mutation.SET_USER_DETAIL](state, payload){
        state.detailUser  = payload.forUser
    },
    [mutation.SET_USER_RES](state, payload){
        state.user               = payload.userdata
       
    },
    [mutation.SET_USER_ASSIGNEE](state, payload){
        state.userAssignee         = payload.dataList
       
    },
    [mutation.SET_USER_ENTERPRISE](state, payload){
        state.userEnterprise         = payload.dataList
    },
    [mutation.SET_TOTAL_ACCOUNT_USER](state, payload){
        state.totalAccountD = payload
    }
};