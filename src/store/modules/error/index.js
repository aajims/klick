import localAxios from '../../../services/http/client'
import router from '../../../router'
import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import * as getter from '../../getters-types'
import * as typeS from "../../../services/path_service";
import swal from 'sweetalert2';

const state = {
    error           : null,
    buttonStatus    : false,
    loading         : false,
    clearInput      : false,
    errorMessage    : {
        "status" : false,
        "code" :    4200,
        "message": null,
        "debug": {}
    },
    buttonResendPIN : false,
    buttonSuspend   : false,
    buttonDelete    : false,
    buttonActive    : false,
    buttonEdit      : false,
    buttonResendPIN : false,
    buttonSearch    : false,
    buttonResActive : false
};

const mutations = {
    [mutation.SET_ERROR](state, payload){
        state.error = payload
    },
    [mutation.BUTTON_STATUS](state, payload){
        state.buttonStatus = payload
    },
    [mutation.SET_ERROR_MESSAGE](state, payload){
        state.errorMessage = payload
    },
    [mutation.CLEAR_INPUT](state, payload){
        state.clearInput = payload
    },
    [mutation.SET_LOADING](state, payload){
        state.loading = payload
    },
    [mutation.SET_RESEND_PIN_BUTTON](state, payload){
        state.buttonResendPIN = payload
    },
    [mutation.SET_BUTTON_SUSPEND](state, payload){
        state.buttonSuspend = payload
    },
    [mutation.SET_BUTTON_DELETE](state, payload){
        state.buttonDelete = payload
    },
    [mutation.SET_BUTTON_ACTIVE](state, payload){
        state.buttonActive = payload
    },
    [mutation.SET_BUTTON_EDIT](state, payload){
        state.buttonEdit = payload
    },
    [mutation.SET_SEARCH_BUTTON](state, payload){
        state.buttonSearch  = payload
    },
    [mutation.SET_BUTTON_RESEND_ACTIVE](state, payload){
        state.buttonResActive = payload
    }
};

const actions = {
    [action.DATA_ERROR]({commit, dispatch}, payload) {
        commit(mutation.SET_ERROR_MESSAGE, payload)
        commit(mutation.SET_ERROR, payload)
    },
    async [action.USER_ME_ERROR]({commit, dispatch},payload){
        try{
            let token = localStorage.getItem('token');
            let userProfile = await localAxios.get(typeS.user_profile,{
                headers: {'Authorization': 'Bearer '+token}
            })
        }catch (e) {
            if(e.response.status === 401){
                swal({
                    type: 'warning',
                    title: 'Your Current Session Has Been Expired, Please Login Again',
                    showConfirmButton: false,
                    timer: 3000
                });
                commit(mutation.CLEAR_AUTH_DATA);
                commit(mutation.CLEAR_NOTIF);
                localStorage.clear();
                router.replace('/login')
            }
        }
    }
};

const getters = {
    [getter.GET_ERROR](state) {
        return state.error
    },
    [getter.GET_BUTTON](state) {
        return state.buttonStatus
    },
    [getter.GET_ERROR_MESSAGE](state){
        return state.errorMessage
    },
    [getter.GET_CLEAR_INPUT](state){
        return state.clearInput
    },
    [getter.GET_LOADING](state){
        return state.loading
    },
    [getter.GET_BUTTON_RESEND_PIN](state){
        return state.buttonResendPIN
    },
    [getter.GET_BUTTON_SUSPEND](state){
        return state.buttonSuspend
    },
    [getter.GET_BUTTON_DELETE](state){
        return state.buttonDelete
    },
    [getter.GET_BUTTON_ACTIVE](state){
        return state.buttonActive
    },
    [getter.GET_BUTTON_EDIT](state){
        return state.buttonEdit
    },
    [getter.GET_SEARCH_BUTTON](state){
        return state.buttonSearch
    },
    [getter.GET_BUTTON_RESEND_ACTIVE](state){
        return state.buttonResActive
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}