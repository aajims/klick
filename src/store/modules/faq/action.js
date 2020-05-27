import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'

export default {
    async [action.LIST_FAQ]({ commit, dispatch }, payload) {
        if (payload.idrole == 99) {
            try {
                let token = localStorage.getItem('token')
                let { data } = await localAxios.get('/faq/?limit=99', {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                let objList = {
                    dataList: data.data.data,
                    total: data.data.total,
                    nextC: data.data.next_page_url,
                    prevC: data.data.prev_page_url,
                    firstP: data.data.first_page_url,
                    fromPA: data.data.from
                }
                commit(mutation.SET_FAQ_LIST, objList)
            } catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
        }else if(payload.idrole===2 || payload.idrole===3) {
            try {
                let token = localStorage.getItem('token')
                let { data } = await localAxios.get('/faq/?page=' + payload.page + '&idrole=' + payload.idrole, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                let objList = {
                    dataList: data.data.data,
                    total: data.data.total,
                    nextC: data.data.next_page_url,
                    prevC: data.data.prev_page_url,
                    firstP: data.data.first_page_url,
                    fromPA: data.data.from
                }
                commit(mutation.SET_FAQ_LIST, objList)
            } catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
        }else if(payload.idrole===0) {
            try {
                let token = localStorage.getItem('token')
                let { data } = await localAxios.get('/faq/?page=' + payload.page, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                let objList = {
                    dataList: data.data.data,
                    total: data.data.total,
                    nextC: data.data.next_page_url,
                    prevC: data.data.prev_page_url,
                    firstP: data.data.first_page_url,
                    fromPA: data.data.from
                }
                commit(mutation.SET_FAQ_LIST, objList)
            } catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
        }
    },
    async [action.CREATE_FAQ]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                question: payload.question,
                answer: payload.answer,
                idrole: payload.idrole,
            });

            let { data } = await localAxios.post('/faq',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_FAQ, payload)
            router.replace({ path: '/manage-faq' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DETAIL_FAQ]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get('/faq/' + payload,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })

            commit(mutation.SET_FAQ_DETAIL, {
                data: data.data,

            })
            router.replace({ path: '/manage-faq/' + payload })
            return data

        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_FAQ]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                question: payload.question,
                answer: payload.answer,
                idrole: payload.idrole,

            });

            let { data } = await localAxios.put('/faq/' + payload.idfaq,
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_FAQ, payload)
            router.replace({ path: '/manage-faq' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_FAQ]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('/faq/' + payload.idfaq, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            const foo = ({
                page: 1,
                idrole: payload.idrole
            });
            dispatch(action.LIST_FAQ, foo)
            router.replace('/manage-faq')
        } catch (err) {

        }
    },

};