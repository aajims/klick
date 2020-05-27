import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home/index';
import login from './modules/users/login';
import error from './modules/error/index';
import forgotPassword from './modules/users/forgot-password';
import user from './modules/user/index'
import profile from './modules/profile'
import helper from './modules/helper'
import dashboard from './modules/dashboard'
import faq from './modules/faq'
import notif from './modules/notif'


Vue.use(Vuex);

export default  new Vuex.Store({
    modules: {
        home,
        login,
        error,
        forgotPassword,
        user,
        profile,
        helper,
        dashboard,
        faq,
        notif
    }
   
})