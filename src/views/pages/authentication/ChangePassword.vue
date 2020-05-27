<template>
    <vue-scroll class="login-page align-vertical">
        <div class="form-wrapper align-vertical-middle">
            <div class="form-box card-base card-shadow--extraLarge">
                <img class="image-logo" src="@/assets/images/klikpayroll.svg" alt="logo"/>
                    <float-label class="styled" :class="{ 'form-group--error': $v.oldPassword.$error }">
                        <input
                                type="password"
                                name="oldPassword"
                                @blur="$v.oldPassword.$touch"
                                @change="setOldPassword($event.target.value)"
                                placeholder="Old Password">
                        <span v-if="$v.oldPassword.$error">
                            <p class="error" style="color: red; margin: 4px" v-if="!$v.oldPassword.required">Field is required</p>
                            <!--<p class="error" style="color: red" v-if="!$v.oldPassword.between">Must be between {{$v.oldPassword.$params.between.min}} and {{$v.oldPassword.$params.between.max}}</p>-->
                        </span>
                            <p style="color: red; margin: 4px" v-show="getError">Please Input Valid Old Password</p>
                    </float-label>

                    <float-label class="styled">
                        <input
                                type="password"
                                name="password"
                                @blur="$v.password.$touch"
                                @change="setPassword($event.target.value)"
                                placeholder="New Password">
                        <span v-if="$v.password.$error">
                            <p class="error" style="color: red; margin: 4px" v-if="!$v.password.required">Field is required</p>
                            <p class="error" style="color: red; margin: 4px" v-if="!$v.password.minlength">The Password must have at least {{$v.password.$params.minLength.min}} characters.</p>
                            <p class="error" style="color: red; margin: 4px" v-if="!$v.password.maxLength">The Password must have at most {{$v.password.$params.maxLength.max}} characters.</p>
                        </span>
                    </float-label>

                    <float-label class="styled">
                        <input
                                type="password"
                                name="password_confirmation"
                                @blur="$v.confirmPassword.$touch"
                                @change="setConfirmPassword($event.target.value)"
                                placeholder="Confirm Password">
                        <span v-if="$v.confirmPassword.$error">
                            <p class="error" style="color: red; margin: 4px" v-if="!$v.confirmPassword.sameAsPassword">Passwords must be identical.</p>
                        </span>
                    </float-label>
                <div class="flex text-center center pt-30 pb-10">
                    <el-button plain
                               size="small"
                               :loading="buttonStatus"
                               @click="reset"
                               class="login-btn tada animated">
                        SUBMIT
                    </el-button>
                </div>
            </div>
        </div>
    </vue-scroll>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import localAxios from '../../../services/http/client'
    import formMixin from '../../../mixins/form.js'
    import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
    import * as getter from '../../../store/getters-types'
    import * as action from '../../../store/action-types'
    import * as mutation from '../../../store/mutation-types'

    export default {
        name: 'change-password',
        mixins: [formMixin],
        data() {
            return {
                    oldPassword     : '',
                    password        : '',
                    confirmPassword : '',
                    // loaded          : false
            }
        },
        validations: {
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(16)
            },
            oldPassword: {
                required,
                // asyncValidation(v) {
                //     if (this.loaded === false) {
                //         //console.log('Data isnt loaded yet to asyncValidation returns true');
                //         return true;
                //     }
                //     return new Promise((resolve, reject) => {
                //         //console.log('Checking server for validation...');
                //         setTimeout(() => {
                //             //console.log('Server responded to validation request');
                //             if (v === 'foo') {
                //                 resolve(true);
                //             } else {
                //                 resolve(false);
                //             }
                //         }, 500);
                //     });
                // }
            },
            confirmPassword: {
                sameAsPassword: sameAs('password')
            }
        },
        computed: {
            ...mapGetters({
                getError	: getter.GET_ERROR,
                buttonStatus: getter.GET_BUTTON
            })
        },
        mounted(){
            this.$store.commit(mutation.SET_ERROR, null)
        },
        methods: {
            reset() {
                const formData = {
                    oldPassword         : this.oldPassword,
                    password            : this.password,
                    confirmPassword     : this.confirmPassword
                };
                this.$store.commit(mutation.SET_ERROR, null)
                this.$store.commit(mutation.BUTTON_STATUS, true)
                this.$store.dispatch(action.CHANGES_PASSWORD,formData)
            },
            setOldPassword(value) {
                this.oldPassword = value
                this.$v.oldPassword.$touch()
            },
            setPassword(value) {
                this.password = value
                this.$v.password.$touch()
            },
            setConfirmPassword(value) {
                this.confirmPassword = value
                this.$v.confirmPassword.$touch()
            },
        }
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/_variables';

    .login-page {
        background: $text-color;
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
            .input.invalid input {
                border: 1px solid red;
                background-color: #ffc9aa;
            }
            .input.invalid label {
                color: red;
            }

            .login-btn ,
            .social-btn {
                width: 160px;

                &.google {
                    margin-bottom: 10px;
                    background-color: #d73d32;
                    color: white;

                    &:hover {
                        border-color: #d73d32;
                    }
                }
                &.facebook {
                    background-color: #3f5c9a;
                    color: white;

                    &:hover {
                        border-color: #3f5c9a;
                    }
                }
            }

            .signin-box {
                font-size: 14px;
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