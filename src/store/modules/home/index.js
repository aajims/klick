import createPersistedState from 'vuex-persistedstate'
import * as getter from '../../getters-types'

const debug = process.env.NODE_ENV !== 'production'

const state = {
    layout: {
        navPos: 'left', //top, bottom, left, right, false
        toolbar: 'top', //top, bottom, false
        footer: true, //above, below, false
        boxed: false, //true, false
        roundedCorners: false, //true, false
        viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
    },
    splashScreen: true,
    logged: false // ** change to false just to access login
};

const mutations = {
    setLayout(state, payload) {
        if (payload && payload.navPos !== undefined)
            state.layout.navPos = payload.navPos

        if (payload && payload.toolbar !== undefined)
            state.layout.toolbar = payload.toolbar

        if (payload && payload.footer !== undefined)
            state.layout.footer = payload.footer

        if (payload && payload.boxed !== undefined)
            state.layout.boxed = payload.boxed

        if (payload && payload.roundedCorners !== undefined)
            state.layout.roundedCorners = payload.roundedCorners

        if (payload && payload.viewAnimation !== undefined)
            state.layout.viewAnimation = payload.viewAnimation
    },
    setLogin(state, payload) {
        // //console.log('disini payload : ', payload)
        state.logged = payload
    },
    setLogout(state, payload) {
        // state.layout.navPos = null
        // state.layout.toolbar = null
        state.logged = false

    },
    setSplashScreen(state, payload) {
        state.splashScreen = payload
    }
};

const actions = {};

const getters = {
    layout(state, getters) {
        return state.layout
    },
    navPos(state, getters) {
        return state.layout.navPos
    },
    toolbar(state, getters) {
        return state.layout.toolbar
    },
    footer(state, getters) {
        return state.layout.footer
    },
    boxed(state, getters) {
        return state.layout.boxed
    },
    roundedCorners(state, getters) {
        return state.layout.roundedCorners
    },
    viewAnimation(state, getters) {
        return state.layout.viewAnimation
    },
    isLogged(state, getters) {
        return state.logged
    },
    splashScreen(state, getters) {
        return state.splashScreen
    }
};

const plugins = [createPersistedState({ paths: ['layout'] })];

const strict = debug;

export default {
    state,
    actions,
    mutations,
    getters,
    plugins,
    strict,
}