<template>
    <vue-scroll class="forgot-password-page align-vertical">
        <div class="form-wrapper align-vertical-middle">
            <div class="form-box card-base card-shadow--extraLarge">
                 <div class="form-box card-base card-shadow--extraLarge">
                <img class="image-logo" src="@/assets/images/payroll5.png" alt="logo"/>
                <h3> Please Check Your Email </h3>
                     <el-button
                        style="margin-left: 40px"
                        size="medium"
                        @click="ButtonHome">
                         Back to Home
                     </el-button>
            </div>
            </div>
        </div>
    </vue-scroll>
</template>

<script>
    import * as action from '../../../store/action-types'

    export default {
        mounted(){
            this.$store.dispatch(action.SEND_EMAIL, {
                email: localStorage.getItem('email')
            });
        },
        methods: {
            ButtonHome() {
                this.$router.replace('/dashboard')
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/_variables';

    .forgot-password-page {
        background: $text-color;
        margin-left: -30px;
        margin-right: -30px;

        .form-wrapper {
            width: 100%;
        }

        .form-box {
            width: 100%;
            max-width: 340px;
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
			width: 240px;
			margin: 0px auto;
			margin-bottom: 30px;
			display: block;
		}

            .send-btn {
                width: 160px;
            }
        }
    }

    @media (max-width: 768px) {
        .layout-container .container .view.forgot-password-page {
            margin-left: -5px;
            margin-right: -5px;
            max-width: calc(100% + 10px);
        }
    }
</style>