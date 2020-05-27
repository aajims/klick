<template>
	<vue-scroll class="login-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge" v-if="isValid">
				<img class="image-logo" src="@/assets/images/klikpayroll.svg" alt="logo"/>
				<p style="color: red" v-show="errorButton">{{ errorMessage.message }}</p>
				<float-label class="styled">
					<input 
							type="password"
							:class="{'is-danger': errors.has('password')}"
							name="password"
							ref="password"
							v-validate="'required|min:8|max:16'"
							v-model="password"
							placeholder="New Password">
							<span v-if="errors.has('password')" style="color : red">
								{{ errors.first('password') }}
							</span>							
							<!-- <p v-show="!$v.password.required" style="color: red">password tidak boleh kosong</p>
							<p v-show="!$v.password.minLen" style="color: red">minimal password 6 karakter</p> -->
				</float-label>
				<float-label class="styled">
					<input 
							type="password"
							:class="{'is-danger': errors.has('password_confirmation')}"
							name="password_confirmation"
							data-vv-as="password"
							v-validate="'confirmed:password|required'"
							v-model="confirmPassword"
							placeholder="Confirm Password">
							<!-- <p v-show="!$v.confirmPassword.sameAs" style="color: red">Confirm Password tidak sama dengan New Password</p> -->
							<span v-if="errors.has('password_confirmation')" style="color : red">
								<!--{{ errors.first('password_confirmation') }}-->
							</span>
				</float-label>

				<div class="flex text-center center pt-30 pb-10">			
					<el-button plain size="small" @click="reset" :loading="button" class="login-btn tada animated">
						CREATE
					</el-button>
				</div>
				<!-- <div class="text-divider mv-10">or</div>

				<div class="flex column center pt-10 pb-10">			
					<el-button plain size="small" @click="login" class="social-btn google">
						Log in with Google
					</el-button>
					<el-button plain size="small" @click="login" class="social-btn facebook">
						Log in with Facebook
					</el-button>
				</div>

				<div class="text-center signin-box pt-20">
					Don't have an account? <a>Sign in</a>
				</div> -->
			</div>
			<div class="form-box card-base card-shadow--extraLarge" v-else>
				<img class="image-logo" src="@/assets/images/klikpayroll.svg" alt="logo"/>
				<h3> Your Link Is Expired </h3>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import localAxios from '../../../services/http/client'
import formMixin from '../../../mixins/form.js'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import * as getter from '../../../store/getters-types'
import * as action from '../../../store/action-types'
import * as mutation from '../../../store/mutation-types'

export default {
	name: 'change-password',
	mixins: [formMixin],
	data() {
		return {
				password: '',
				confirmPassword: '',
				token: '',
				isValid: null
		}
	},
	validations: {
		password: {
			required,
			minLen: minLength(6)
		},
		confirmPassword: {
			sameAs: sameAs('password')
		}
	},
	computed: {
		...mapGetters({
				getError	: getter.GET_ERROR,
				errorMessage 	: getter.GET_ERROR_MESSAGE,
				button			: getter.GET_BUTTON,
		}),
		isLogged() {
			return this.$store.getters.isLogged;
		},
		errorButton(){
			if(this.getError){			
				return true
			}else{
				return false
			}
		}
	},
	async created(){
		try {
		const tokent = this.$route.params.token
		let cekToken = await localAxios.get('/password/find/' + tokent)
			if(cekToken.data.status){
				this.isValid = true, 
				this.token = tokent
			}
		}
		catch(err) {
		}
	},
	methods: {
		// ...mapActions(['login']),
		reset() {
			const formData = {
				password: this.password,
				confirmPassword: this.confirmPassword,
				token: this.token
			};
			this.$store.commit(mutation.BUTTON_STATUS, true)
			this.$store.dispatch(action.CHANGE_PASSWORD,formData)
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