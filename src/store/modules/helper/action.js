import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'




export default {
    async [action.DATA_CONTENT]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get( '/pages/'+payload,
                { headers: {'Authorization': 'Bearer '+token }
                })

            commit(mutation.SET_DATA_CONTENT, {
                data : data.data,
                
            })
            router.replace({ path: '/detail-pages/'+payload})
            return data
            
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DATA_TOC]({commit, dispatch}) {
        try{
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get('/pages/terms-and-condition', {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                data : data.data,
            }
            commit(mutation.SET_DATA_TOC, objList )
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DATA_PRIVACY]({commit, dispatch}) {
        try{
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get('/pages/privacy', {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                data : data.data,
            }
            commit(mutation.SET_DATA_PRIVACY, objList )
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DATA_CUSTOMER]({commit, dispatch}) {
        try{
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get('/pages/customer-service', {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                data : data.data,
            }
            commit(mutation.SET_DATA_CUSTOMER, objList )
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_PAGES]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/pages/?idrole='+payload.idrole, {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList    : data.data.data,
                total       : data.data.total,
                nextC       : data.data.next_page_url,
                prevC       : data.data.prev_page_url,
                firstP      : data.data.first_page_url,
                fromPA      : data.data.from
            }
            commit(mutation.SET_PAGES , objList )
        
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DETAIL_PAGES]({commit, dispatch}, payload) {
            try {
                let token = localStorage.getItem('token');
                let { data } = await localAxios.get( '/pages/'+payload,
                    { headers: {'Authorization': 'Bearer '+token }
                    })
    
                commit(mutation.SET_PAGES_DETAIL, {
                    data : data.data,
                    
                })
                router.replace({ path: '/detail-pages/'+payload})
                return data
                
            }
            catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
        },
    async [action.UPDATE_PAGES]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                name                : payload.name,
                description         : payload.description,
                content             : payload.content
        
            });
    
            let { data } = await localAxios.put('/pages/'+payload.idcontent,
                jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                })
            dispatch(action.LIST_PAGES)
            router.replace({ path: '/pages'})
            commit(mutation.BUTTON_STATUS, false)
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
};
