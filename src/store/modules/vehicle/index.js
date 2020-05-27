import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import * as getter from '../../getters-types'
import localAxios from "../../../services/http/client";
import * as typeS from '../../../services/path_service'

const state = {
    vehicleType : null
};

const mutations = {
    [mutation.SET_VEHICLE_TYPE](state, payload){
        let vehicleType = payload.map(function(item){
            return {value: item[Object.keys(item)[1]], id: item.id};
        })
        state.vehicleType = vehicleType
    }
};

const actions = {
    async [action.VEHICLE_BRAND]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(`${typeS.vehicle}brand`,
                { headers: {'Authorization': 'Bearer '+token }
                })
            return data.data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.VEHICLE_TYPE]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(`${typeS.vehicle}type?idbrand=${payload}&dropdown=1&limit=999`,
                { headers: {'Authorization': 'Bearer '+token }
                })
            commit(mutation.SET_VEHICLE_TYPE, data.data)
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
};

const getters = {
    [getter.GET_VEHICLE_TYPE](state){
        return state.vehicleType
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}