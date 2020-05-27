<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col style="margin-top: 30px" :lg="8">
                <div class="thumbnail">
                    <img class="potrait" :src="profilepicture" @error="imgAlt">
                </div>
            </el-col>
            <el-col :lg="8">
                <h3>Name</h3>
                {{driver.name}}
                <h3>Driver Birthdate</h3>
                {{driver.birthdate}}
                <h3>Driver Gender</h3>
                <p v-if="driver.gender==1">Male</p>
                <p v-else>Female</p>
                <h3>Driver Address</h3>
                {{driver.address}}
            </el-col>
            <el-col :lg="8">
                <h3>Driver NIK</h3>
                {{driver.nik}}
                <h3>Driver Email</h3>
                {{driver.email}}
                <h3>Driver Phone Number</h3>
                {{driver.phonenumber}}
                <h3>Driver Type</h3>
                <p v-if="driver.drivertype_iddrivertype==1">PKWT</p>
                <p v-else-if="driver.drivertype_iddrivertype==2">PKWT BACKUP</p>
                <p v-else>FREELANCE</p>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px ;margin-bottom: 0px" :gutter="10">
            <el-col :lg="3">
                <el-button @click="Back()">Back</el-button>
            </el-col>
            <el-col :lg="4">
                <el-button @click="editDriver()" type="primary">Edit</el-button>
            </el-col>
            <div v-if="driver.status===1">
                <el-col :offset="13" :lg="4">
                    <el-button :loading="button" type="danger" @click="suspendButton">Suspend</el-button>
                </el-col>
            </div>
            <div v-else-if="driver.status === 3">
                <el-col :offset="9" :lg="4">
                    <el-button :loading="button" @click="deleteButton" type="danger">Delete</el-button>
                </el-col>
                <el-col :lg="4">
                    <el-button :loading="button" @click="activeButton" type="success">Active</el-button>
                </el-col>
            </div>
        </el-row>
        <div v-if="driver.is_first_login === 1">
             <el-button style="width: auto" :loading="resendPinButton" class="topright" type="warning" @click="resendPIN">Resend PIN</el-button>
        </div>
    </div>
</div>
</template>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types';
import Swal from "sweetalert2";
export default {
    name: "DetailDriver",
    data() {
        return {
            payload: {
                reason_suspend: "",
                users_id: null,
                iddriver: "",

            },
            alt: require("@/assets/images/avatar-2.jpg")
        };
    },
    methods: {
        Back() {
            router.replace("/driver");
        },
        imgAlt(event) {
            event.target.src = this.alt;
        },
        resendPIN() {
            let obj = {
                pin_type: '/driver/resend-pin',
                id: this.driver.users_id
            };
            this.$store.commit(mutation.SET_RESEND_PIN_BUTTON, true);
            this.$store.dispatch(action.RESEND_PIN, obj)
        },
        editDriver() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$store.dispatch(action.EDIT_USER, this.driver.users_id);
        },
        deleteButton() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.DELETE_USER, this.driver.users_id);
                }
            });
        },
        activeButton() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, activate it!"
            }).then(result => {
                if (result.value) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.ACTIVATE_USER, this.driver.users_id);
                }
            });
        },
        async suspendButton() {
            const {
                value: reason
            } = await Swal.fire({
                title: 'Enter the reason of suspending',
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, suspend it!',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            })
            if (reason) {
                this.$store.commit(mutation.BUTTON_STATUS, true)
                this.payload.reason_suspend = reason;
                this.payload.users_id = this.driver.users_id;
                this.payload.iddriver = this.driver.iddriver;
                this.$store.dispatch(action.SUSPEND_USER, this.payload)
            }
        }
    },
    computed: {
        ...mapGetters({
            driver: getter.USER,
            button: getter.GET_BUTTON,
            resendPinButton: getter.GET_BUTTON_RESEND_PIN

        }),
        profilepicture() {
            if (this.driver.profile_picture == null) {
                return this.alt
            } else {
                return this.driver.profile_picture
            }
        },
        offsetSize() {
            if (this.driver.is_first_login === 1) {
                return 1
            } else {
                return 16
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.card-base {
    padding: 20px;
}

.el-button  {
    width: 100%;
}

.el-row {
    padding: 0px 10px;
    margin-bottom: 20px;
    margin-top: -20px;

    &:last-child {
        margin-bottom: 0;
        margin-top: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.el-select {
    width: 100%;
}

.thumbnail {
    border-radius: 8px;
    position: relative;
    width: 263px;
    height: 300px;
    overflow: hidden;
}

.thumbnail img {
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.thumbnail img.portrait {
    width: 100%;
    height: auto;
}

.topright {
    position: absolute;
    top: 10px;
    right: 60px;
    font-size: 16px;
}

.disabled {
    pointer-events: none;
    cursor: not-allowed;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.six {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
