<template>
<vue-scroll class="login-page align-vertical">
    <div class="form-wrapper align-vertical-middle">
        <div class="form-box card-base card-shadow--extraLarge" v-if="isValid">
            <img class="image-logo" src="@/assets/images/klikpayroll.svg" alt="logo" />
            <h3> Your Email has been changed </h3>
        </div>
        <div class="form-box card-base card-shadow--extraLarge" v-else>
            <img class="image-logo" src="@/assets/images/klikpayroll.svg" alt="logo" />
            <h3 style="margin-left: 50px"> Your Link Is Expired </h3>
        </div>
    </div>
</vue-scroll>
</template>

<script>
import localAxios from '../../../services/http/client'

export default {
    data() {
        return {
            isValid: null,
            library: require("@/assets/images/klikpayroll.svg")
        }
    },
    name: "change-email",
    async created() {
        try {
            const tokent = this.$route.params.token
            let cekToken = await localAxios.get('/user/activation-email/' + tokent)
            if (cekToken.data.status) {
                this.isValid = true
            }
        } catch (err) {
            // //console.log(err)
        }
    },
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.login-page {
    background-image: url("../../../assets/images/citybg.jpg");
    background-size: 100% 100%;
    margin-left: -30px;
    margin-top: -150px;
    margin-right: -200px;
}

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

    .login-btn,
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

@media (max-width: 768px) {
    .layout-container .container .view.login-page {
        margin-left: -5px;
        margin-right: -5px;
        max-width: calc(100% + 10px);
    }
}
</style>
