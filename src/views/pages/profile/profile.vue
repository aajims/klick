<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10" :style="marginbottom">
            <el-col :lg="8">
                <div class="thumbnail">
                    <img class="potrait" :src="profilepicture" @error="imgAlt" />
                </div>
            </el-col>
            <el-col :lg="8">
                <h3>Name</h3>
                {{profile.name}}
                <h3>Email</h3>
                <div :style="longEmail">{{profile.email}}</div>
                <h3>Phone Number</h3>
                {{profile.phonenumber}}
            </el-col>
            <el-col :lg="8">
                <h3>Role</h3>
                {{profile.role.rolename}}
                <div v-if="profile.vendor">
                    <h3>Vendor</h3>
                    {{profile.vendor.name}}
                </div>
                <div v-if="profile.dispatcher">
                    <h3>Dispatcher</h3>
                    {{profile.dispatcher.name}}
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <div v-if="profile.enterprise">
                <hr class="six" />
                <el-col :lg="18">
                    <h3>Client Enterprise</h3>
                    <el-row>
                        <el-col :lg="6">
                            <b>Name</b>
                        </el-col>
                        <el-col :lg="15">
                            <b>:</b>
                            {{profile.enterprise.name}}
                        </el-col>
                        <el-col :lg="6">
                            <b>Email</b>
                        </el-col>
                        <el-col :lg="15">
                            <b>:</b>
                            {{profile.enterprise.email}}
                        </el-col>
                        <el-col :lg="6">
                            <b>Office Phone Number</b>
                        </el-col>
                        <el-col :lg="15">
                            <b>:</b>
                            {{profile.enterprise.office_phone}}
                        </el-col>
                        <el-col :lg="6">
                            <b>Office Address</b>
                        </el-col>
                        <el-col :lg="15">
                            <b>:</b>
                            {{profile.enterprise.office_address}}
                        </el-col>
                        <el-col :lg="6">
                            <b>PIC Name</b>
                        </el-col>
                        <el-col :lg="15">
                            <b>:</b>
                            {{profile.enterprise.pic_name}}
                        </el-col>
                        <el-col :lg="6">
                            <b>PIC Phone</b>
                        </el-col>
                        <el-col :lg="15">
                            <b>:</b>
                            {{profile.enterprise.pic_phone}}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :lg="6">
                    <el-row style="margin-top: 50px;">
                        <el-button @click="enterpriseDriver" style="width: 100%" type="primary">List Driver</el-button>
                    </el-row>
                    <el-row>
                        <el-button @click="location" style="width: 100%" type="success">List Location</el-button>
                    </el-row>
                    <el-row>
                        <el-button @click="templateTask" style="width: 100%" type="danger">List Template Task</el-button>
                    </el-row>
                </el-col>
            </div>
        </el-row>
        <div v-if="enterprisetype === true">
            <el-button class="topright disabled" type="warning">Enterprise Plus</el-button>
        </div>
        <div v-if="enterprisetype === false">
            <el-button class="topright disabled" type="info">Enterprise Regular</el-button>
        </div>
        <div v-if="isAdmin === true">
            <el-button @click="Edit" class="topright" type="success">Edit</el-button>
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
import * as mutation from "../../../store/mutation-types";
import Swal from "sweetalert2";
export default {
    name: "Profile",
    data() {
        return {
            payload: {
                identerprise: null,
                page: 1,
            },
            alt: require("@/assets/images/profile.png")
        };
    },
    methods: {
        imgAlt(event) {
            event.target.src = this.alt;
        },
        Edit() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$store.dispatch(action.EDIT_PROFILE_ADMIN, this.profile.id);
        },
        enterpriseDriver() {
            router.push({
                path: `/profile-list-driver-enterprise/` + this.profile.enterprise.identerprise
            })
        },
        async location() {

            this.$router.replace({
                path: "/profile-location-enterprise/" + this.profile.enterprise.identerprise
            });
        },
        async templateTask() {
           

        },
    },
    computed: {
        ...mapGetters({
            profile: getter.GET_DATA_PROFILE
        }),
        isAdmin() {
            if (this.profile.idrole === 1) {
                return true
            } else {
                return false
            }
        },
        profilepicture() {
            if (this.profile.profile_picture === null) {
                return this.alt;
            } else {
                return this.profile.profile_picture;
            }
        },
        enterprisetype() {
            if (this.profile.enterprise) {
                if (this.profile.enterprise.enterprise_type.identerprise_type === 2) {
                    return true;
                } else if (
                    this.profile.enterprise.enterprise_type.identerprise_type === 1
                ) {
                    return false;
                }
            }
        },
        marginbottom() {
            if (this.profile.vendor) {
                return "margin-bottom: 20px;";
            }
        },
        longEmail() {
            if (this.profile.email.length >= 38)
                return "font-size: 14px"
        },
    },
    mounted() {
        this.$store.dispatch(action.DATA_PROFILE);
    },
    created() {
        if (this.profile.enterprise) {
            this.payload.identerprise = this.profile.enterprise.identerprise
        }
    }
};
</script>

<style lang="scss" scoped>
.card-base {
    padding: 20px;
}

.el-row {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    padding: 0px 10px;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.thumbnail {
    border-radius: 8px;
    position: relative;
    width: 263px;
    height: 280px;
    overflow: hidden;
}

.thumbnail img {
    border-radius: 16px;
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
    font-size: 18px;
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
