import axios from 'axios'

// const post = async (payload, path, token = '', contentType = 'application/json') => {
//     try {
//         axios.defaults.baseURL = 'http://dev.oper.co.id';
//         axios.defaults.headers.get['Accepts'] = contentType;
//         axios.defaults.headers.post['Content-Type'] = contentType;
//         axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

//         /**
//          * 
//          */
//         let response = await axios.post(path, payload)
//         return response.data
//     }catch(err){
//         if(typeof err.response !== 'undefined'){
//             return err.response.data
//         }

//         return {
//             data: false,
//             error_message: err.message
//         }
//     }

const instance = axios.create({
    baseURL: process.env.VUE_APP_APIHOST,
    headers: {
        // 'Accepts': 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Headers': '*'
    }
})

export default instance