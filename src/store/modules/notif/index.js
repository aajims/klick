import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import * as getter from '../../getters-types'
import localAxios from "../../../services/http/client";
import * as typeS from '../../../services/path_service'

const state = {
    totalNotif : null,
    intervalTime: null
};

const mutations = {
    [mutation.SET_NOTIF](state, payload){
        let token = localStorage.getItem('token');
         state.intervalTime = setInterval( async ()=> {
             let {data}  = await localAxios.get(typeS.notification,
                 { headers: {'Authorization': 'Bearer '+token}
                 });
             state.totalNotif = data.data.total
        }, payload)
    },
    [mutation.CLEAR_NOTIF](state){
        clearInterval(state.intervalTime)
    },
    [mutation.SET_NOTIF_TO_NOL](state, payload){
        state.totalNotif = payload
    }
};

const actions = {
     [action.NOTIFICATION]({commit, dispatch}, payload) {
         commit(mutation.SET_NOTIF, process.env.VUE_APP_INTERVAL_TIME);
    },
    async [action.MARK_AS_READ]({commit, dispatch}) {
        try {
            let token = localStorage.getItem('token'), foo;
            let {data}  = await localAxios.post(`${typeS.notification}markasread`,
                foo,
                    { headers: {'Authorization': 'Bearer '+token}
                    });
            commit(mutation.SET_NOTIF_TO_NOL, null);
        } catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
};

const getters = {
    [getter.GET_NOTIF](state){
        return state.totalNotif
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}