import * as mutation from '../../mutation-types'

export default {
    /**
     * for list corporate need to next click and other
     * */
    [mutation.SET_FAQ_LIST](state, payload){
        state.listFAQ               = payload.dataList
        state.totalFAQ              = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_FAQ_DETAIL](state, payload) {
        state.detailFAQ = payload.data
    },

};