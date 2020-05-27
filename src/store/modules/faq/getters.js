
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_FAQ](state) {
    return state.listFAQ
},
[getter.GET_PAGINATE_FAQ](state){
    return state.paginate
},
[getter.GET_FAQ_TOTAL](state) {
    return state.totalFAQ
},
[getter.GET_FAQ_DETAIL](state) {
    return state.detailFAQ
},
};

