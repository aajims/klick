<template>
	<vue-scroll class="forgot-password-page align-vertical" style="background: #0079BA;">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge" v-if="!getStatusEmail">
				<img class="image-logo" src="@/assets/images/payroll5.png" alt="logo"/>
				
				<float-label class="styled" >
					<input 
							type="email"
							name="email" 
							placeholder="E-mail/Username"
							@keyup.enter="login"
							v-validate="'required|email'"
							v-model="email">
							<span v-show="getError" style="color : red">Please enter the registered email/username</span>
							<!-- <p v-show="!$v.email.email" style="color: red">Masukan Email yang Valid</p>
							<p v-show="!$v.email.required" style="color: red">Email tidak boleh kosong</p> -->
							<!-- <ul class="ContactForm__messages" v-if="$v.email.$error">
								<li v-if="!$v.email.required">
								his field is required.
								</li>
								<li v-if="!$v.email.email">
								Please enter a valid email address.
								</li>
							</ul> -->
				</float-label>

				<div class="flex text-center center pt-20 pb-10">			
					<el-button plain size="small"  @click="login" class="send-btn tada animated" >
						SEND RESET LINK
					</el-button>
				</div>
			</div>

			<div class="form-box card-base card-shadow--extraLarge" v-else>
				<img class="image-logo" src="@/assets/images/klikpayroll.svg" alt="logo"/>
				<center><h3> Please Check Your Email</h3></center>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import { mapGetters } from "vuex";
import * as getter from '../../../store/getters-types'
import * as action from '../../../store/action-types'
// import { required, email, sameA } from 'vuelidate/lib/validators'

export default {
	name: 'ForgotPassword',
	data() {
		return {
				email: '',
		}
	},
	// validations: {
	// 	email: {
	// 		required,
	// 		email
	// 	}
	// },
	computed: {
		...mapGetters({
			getStatusEmail : getter.GET_STATUS_EMAIL ,
			getError	: getter.GET_ERROR
		})
	},
	methods: {
		login() {
			this.$store.dispatch(action.SEND_EMAIL, {
				email: this.email
			})
			// this.$router.push('dashboard')
		}
		// setEmail(){
		// 	this.$store.commit('setStatusEmail', false)
		// }
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
			width: 80px;
			margin: 0px auto;
			margin-bottom: 50px;
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

							// :status="$v.email.$error ? 'error' : null"
							// @blur="$v.email.$touch()"