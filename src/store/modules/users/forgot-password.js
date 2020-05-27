import localAxios from '../../../services/http/client'
import router from '../../../router'
import Swal from 'sweetalert2'
import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import * as getter from '../../getters-types'
import * as typeS from '../../../services/path_service'

const state = {
    token: null,
    statusEmail: null
};

const getters = {
    [getter.GET_STATUS_EMAIL](state) {
        return state.statusEmail
    }
};

const actions = {
    async [action.SEND_EMAIL]({ commit, dispatch }, payload) {
        try {
            let { data } = await localAxios.post(typeS.create_password, JSON.stringify({
                emailOrUsername: payload.email
            }));
            commit(mutation.SET_STATUS_EMAIL, data.status)
            commit(mutation.BUTTON_STATUS, false)
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CHANGE_PASSWORD]({ commit, dispatch }, payload) {
        try {
            const formData = JSON.stringify({
                password: payload.password,
                password_confirmation: payload.confirmPassword,
                token: payload.token
            });
            let { data } = await localAxios.post(typeS.reset_password,
                formData);
            if (data.status) {
                Swal(
                    'create password successfully',
                    '',
                    'success'
                );
                commit(mutation.BUTTON_STATUS, false)
                setTimeout(() => {
                    router.replace('/login')
                }, 2000)
            }
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CHANGES_PASSWORD]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const formData = JSON.stringify({
                old_password: payload.oldPassword,
                password: payload.password,
                password_confirmation: payload.confirmPassword,
            });
            let { data } = await localAxios.put(typeS.change_password,
                formData, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
            if (data.status) {
                Swal(
                    'password changed successfully',
                    '',
                    'success'
                );
                commit(mutation.BUTTON_STATUS, false)
                localStorage.clear()
                // dispatch('setError', null);
                setTimeout(() => {
                    router.replace('/login')
                }, 2000)
            }
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    }
};

const mutations = {
    [mutation.SET_STATUS_EMAIL](state, payload) {
        state.statusEmail = payload
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}