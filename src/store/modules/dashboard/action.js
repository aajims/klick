import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'

export default {
    async [action.LIST_DASHBOARD]({ commit, dispatch }, payload) {
        try {

            let param;
            if (payload !== undefined) {
                param = `/dashboard?order_today=${payload.order_today}&task_today=${payload.task_today}&order_week=${payload.order_week}&task_week=${payload.task_week}
                &order_month=${payload.order_month}&task_month=${payload.task_month}`
            } else {
                param = '/dashboard';
            };
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(param, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let objList = {
                dataList: data.data,
            };

            commit(mutation.SET_DASHBOARD_LIST, objList)

        } catch (err) {
            // //console.log('ada d mana', err);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.GRAFIK_DASHBOARD]({ commit, dispatch }) {
        try {
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get('/dashboard/grafik', {
                headers: { 'Authorization': 'Bearer ' + token }
            });

            commit(mutation.SET_DASHBOARD_GRAFIK, data.data)

        } catch (err) {
            // //console.log('error d mana gan', err)
            dispatch(action.DATA_ERROR, err)
        }
    },
};