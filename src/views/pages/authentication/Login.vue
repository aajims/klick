<template>
<vue-scroll class="login-page align-vertical">
    <div class="form-wrapper align-vertical-middle">
        <el-row :gutter="10" style="margin-bottom: 20px;">
            <el-col :span="7">
            <div class="card-base" style="background-color:rgba(0, 0, 0, 0.4); margin-left: 20px; margin-top: 500px;">
                <div style="margin-left: 20px; color: #ffffff;">
                <h2>Lorem ipsum</h2> 
                <p>
                    dolor sit amet consectetur adipisicing elit. Veniam,<br> 
                    ab? Est placeat alias molestiae deleniti modi quidem<br> 
                    iure dolorem, temporibus ratione minus, assumenda<br>
                    aut cumque quo cupiditate inventore ullam veritatis!
                </p>
                </div>
            </div>
            </el-col>
        <el-col :offset="8" :span="7">
        <div class="form-box card-base card-shadow--extraLarge" style="margin-top: 250px">
            <img class="image-logo" src="@/assets/images/payroll5.png" alt="logo" style="margin-bottom: 50px; margin-top: 25px;" />
            <center>
                <p style="color: red" v-show="errorBUtt">{{ errorMessage.message }}</p>
            </center>
            <center>
                <float-label class="styled">
                    <input type="username" v-model="form.username" @keyup.enter="login" placeholder="Username">
                </float-label>
                <float-label class="styled">
                    <input type="password" v-model="form.password" @keyup.enter="login" placeholder="Password">
                </float-label>

            </center>
            <div class="flex">
                <div class="box grow text-center">
                    <router-link to="/forgot-password">Forgot Password?</router-link>
                </div>
            </div>
            <div class="flex text-center center pt-30 pb-10">
                <el-button plain size="small" @click="login" :loading="button" class="login-btn tada animated">
                    <b style="color: #ffffff; font-size: 14px;">Login</b>
                </el-button>
            </div>
        </div>
        </el-col>
        </el-row>
    </div>
</vue-scroll>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
// import router from '../../../router'
import * as mutation from '../../../store/mutation-types'
import * as action from '../../../store/action-types.js'
import * as getter from '../../../store/getters-types'

export default {
    name: 'Login',
    data() {
        return {
            buttonError: null,
            buttonErrors: null,
            form: {
                username: '',
                password: '',
            }
        }
    },
    computed: {
        ...mapGetters({
            getError: getter.GET_ERROR,
            button: getter.GET_BUTTON,
            errorMessage: getter.GET_ERROR_MESSAGE
        }),
        isLogged() {
            return this.$store.getters.isLogged
        },
        errorButto() {
            if (this.getError) {
                if (this.errorMessage.code == 4000) {
                    return true
                } else {
                    return false
                }
            }
        },
        errorBUtt() {
            if (this.getError) {
                if (this.errorMessage.code != 4000) {
                    return true
                } else {
                    return false
                }
            }
        }
    },
    methods: {
        login() {
            const formData = {
                username: this.form.username,
                password: this.form.password,
            };
            this.$store.commit(mutation.SET_ERROR, null)
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.LOGIN, formData)
        }
    },
    created() {
        this.$store.commit(mutation.SET_ERROR, null)
    }
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.grip {
    font-size: 36px
}

.login-page {
    background: #04b3bf;
    margin-left: -30px;
    margin-right: -30px;

    .form-wrapper {
        width: 100%;
    }

    .form-box {
        width: 100%;
        max-width: 320px;
        padding: 30px;
        box-sizing: border-box;
        margin: 20px auto;

        a {
            font-size: 14px;
            color: $text-color-accent;
            text-decoration: none;
            font-weight: 500;
        }

        .image-logo {
            width: 200px;
            margin: 0px auto;
            margin-bottom: 30px;
            display: block;
        }

        .login-btn{
            background: #0079ba;
        }
       
    }
}

@media (max-width: 768px) {
    .layout-container .container .view.login-page {
        margin-left: -5px;
        margin-right: -5px;
        max-width: calc(100% + 10px);
    }
}
</style>
