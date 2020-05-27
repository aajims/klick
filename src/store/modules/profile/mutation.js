import * as mutation from '../../mutation-types'

export default {
    [mutation.SET_DATA_PROFILE](state, payload) {
        state.dataProfile = payload.data
    },
   
};