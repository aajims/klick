import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'

export default {
    async [action.DATA_PROFILE]({ commit, dispatch }) {
        try {
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get('uma/user/get', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            let objList = {
                data: data.data,
            }
            commit(mutation.SET_DATA_PROFILE, objList)

        } catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.EDIT_PROFILE_ADMIN]({ commit, dispatch }) {
        try {
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get('uma/user/get', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            let objList = {
                data: data.data,
            }
            commit(mutation.SET_DATA_PROFILE, objList)
            router.replace({ path: '/edit-profile' })

        } catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_PROFILE_ADMIN]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                name: payload.name,
                phonenumber: payload.phonenumber,
                email: payload.email,

            });

            let { data } = await localAxios.put('/user/' + payload.iduser,
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_PROFILE)
            router.replace({ path: '/profile' })
            swal(
                'Succes!',
                'If you change your email, please check your email',
                'success'
                )
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },

};