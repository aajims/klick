<template>
<div class="container mb-200">
    <p class="font-weight-600">ACCOUNT</p>
    <el-row :gutter="50">
        <el-col :span="17">
            <el-card shadow="always" :body-style="{padding: '5px'}" class="card-border">
                <el-row :gutter="20" v-if="totalEmployee !== null">
                    <el-col :span="8">
                        <div class="line">
                            <p class="pb-20 font-weight-600 mt-8">TOTAL EMPLOYEE</p>
                            <span class="font-size-44 font-weight-600">{{totalEmployee.total_driver}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="line">
                            <p class="pb-20 font-weight-600 mt-8">ACTIVE ACCOUNT</p>
                            <span class="font-size-44 font-weight-600">{{totalEmployee.total_driver_active}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="text-center">
                            <p class="pb-20 font-weight-600 mt-8">SUSPENDED ACCOUNT</p>
                            <span class="font-size-44 font-weight-600">{{totalEmployee.total_driver_suspend}}</span>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-button @click="CreateEmployee" shadow="always" :body-style="{padding: '10px'}" class="card-border plus-bg text-center">
                <i class="mdi mdi-plus font-size-60 font-weight-500 white-text"></i>
                <span class="text-p">Add New</span>
                <span class="text-p">Employee</span>
            </el-button>
        </el-col>
         <el-col :span="2">
            <el-button @click="Position" shadow="always" :body-style="{padding: '10px'}" class="card-border plus-bg2 text-center">
                <i class="mdi mdi-clipboard-account font-size-60 font-weight-500 white-text"></i>
                <span class="text-p">List</span>
                <span class="text-p">Position</span>
            </el-button>
        </el-col>
    </el-row>

    <p class="font-weight-600 mt-40">INFO</p>
    <el-row class="mt-20">
        <el-card shadow="always" class="card-border">
            <el-row :gutter="20">
                <el-col :span="12" class="line-not-center">
                    <div class="avatar2 align-vertical text-center">
                        <img :src="form.photo" class="align-vertical-middle" alt="user avatar" @error="imgAlt">
                        <h1 class="name-of">{{ form.name }}</h1>
                        <span>
                            <h3>{{form.status == 1 ? 'ACTIVE' : (form.status == 2 ? 'INACTIVE' : 'SUSPENDED')}}</h3>
                        </span>
                    </div>
                    <el-row type="flex" justify="center">
                        <el-col :span="9">
                            <div>
                                <dl>
                                    <dt>PHONE</dt>
                                    <dd>{{ form.phone }}</dd>
                                    <dt>TYPE</dt>
                                    <dd>{{ form.job }}</dd>
                                    <dt>GENDER</dt>
                                    <dd>{{form.gender == 1 ? 'Male' : 'Female'}}</dd>
                                    <dt>EMAIL</dt>
                                    <dd>{{ form.email }}</dd>
                                </dl>
                            </div>
                        </el-col>
                        <el-col :span="9">
                            <div>
                                <dl>
                                    <dt>BIRTHDATE</dt>
                                    <dd>{{ form.birthdate }}</dd>
                                    <dt v-if="form.address !== ''">ADDRESS</dt>
                                    <dd>{{ form.address }}</dd>
                                    <dt>NIK</dt>
                                    <dd>{{ form.nik }}</dd>
                                </dl>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center" class="mt-10">
                        <el-col :span="12">
                            <el-button @click="editButton" type="info" size="small" class="small-edit">Edit</el-button>
                            <el-button @click="additionalImage" plain type="success" size="small" >Additional Image</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="danger" size="small" @click="suspendButton" :loading="buttonSuspend" v-if="status === 1">Suspend</el-button>
                            <el-button type="success" size="small" @click="resendActivation" :loading="buttonResendPIN" v-if="status === 2">Resend Activation</el-button>
                            <el-button type="danger" size="small" @click="deleteB" :loading="buttonDelete" v-if="status === 3"> Delete </el-button>
                            <el-button type="primary" size="small" @click="activeButton" :loading="buttonActive" v-if="status === 3">Activate</el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="center" :gutter="20" class="mt-10">
                        <el-col :span="10">
                            <el-input size="mini" placeholder="Search" @keyup.native="searchChange" v-model="input4">
                                <i slot="suffix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-select @change="filterStatus" v-model="status" filterable size="mini" placeholder="All Status">
                                <el-option v-for="item in select" :key="item.status" :label="item.name" :value="item.status">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <div class="contacts-list box grow scrollable only-y" v-loading="loading">
                        <el-row :gutter="20">
                            <div v-for="c in listData" :key="c.id" class="flex contact" @click="openDialog(c)">
                                <div class="avatar align-vertical el-col el-col-4">
                                    <img :src="c.profile_picture" class="align-vertical-middle" alt="user avatar" @error="imgAlt">
                                </div>
                                <div class="info box grow flex el-col el-col-20">
                                            <div class="name box grow flex column justify-center p-10 scrollable only-x">
                                                <div class="fullname fs-18"><strong>{{c.name}}</strong></div>
                                                <div class="phone fs-14 secondary-text">{{c.phonenumber}}</div>
                                                <div class="email fs-14 secondary-text">{{c.email}}</div>
                                            </div>
                                            <div class="phone align-vertical p-10" style="color: green" v-if="c.status === 1"><span class="align-vertical-middle font-weight-600">ACTIVE</span></div>
                                            <div class="phone align-vertical p-10" v-if="c.status === 2"><span class="align-vertical-middle font-weight-600">IN ACTIVE</span></div>
                                            <div class="phone align-vertical p-10" style="color: red" v-if="c.status === 3"><span class="align-vertical-middle font-weight-600">SUSPENDED</span></div>
                                </div>
                            </div>
                        </el-row>
                        <div class="grid-content">
                            <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="forTotal">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </el-row>
    <el-dialog
            :visible.sync="centerDialogVisible"
            width="20%"
            center>
            <img
                    style="width: 100%"
                    :src="form.photo_2"
                    alt="user avatar"
                    @error="imgAlt">
    </el-dialog>
</div>
</template>

<script>
import router from '../../router'
import Swal from 'sweetalert2'
import Contacts from '@/assets/data/CONTACTS_MOCK_DATA.json'
import {
    mapGetters,
    mapActions
} from 'vuex'
import * as getter from '../../store/getters-types'
import * as action from '../../store/action-types'
import * as mutation from '../../store/mutation-types'

export default {
    name: 'Contacts',
    data() {
        return {
            currentPage: 1,
            status: 1,
            type: '',
            search: '',
            dialogvisible: false,
            pageWidth: 0,
            userdata: {},
            contacts: Contacts.slice(0, 30),
            options: [{
                value: 'Option1',
                label: 'Option1'
            }, {
                value: 'Option2',
                label: 'Option2',
                disabled: true
            }, {
                value: 'Option3',
                label: 'Option3'
            }, {
                value: 'Option4',
                label: 'Option4'
            }, {
                value: 'Option5',
                label: 'Option5'
            }],
            alt: 'require("@/assets/images/avatar-2.jpg");',
            value: '',
            input4: '',
            centerDialogVisible: false,
            form: {
                name: '',
                photo: '',
                photo_2: '',
                status: '',
                company: '',
                phone: '',
                email: '',
                address: '',
                nik: '',
                id: '',
                users_id: '',
                gender: '',
                job: '',
            },
            payload: {
                reason_suspend: "",
                users_id: null,
                status: null,
                page: 1,
            },
            select: [{
                    name: "ACTIVE",
                    status: 1,
                },
                {
                    name: "INACTIVE",
                    status: 2,
                },
                {
                    name: "SUSPENDED",
                    status: 3
                }
            ],
        }
    },
    methods: {
        searchChange(v) {
            let trimName = this.input4.trim()
            if (trimName.length > 0) {
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.$store.dispatch(action.LIST_EMPLOYEE, {
                    page: 1,
                    employee_search: trimName,
                    status: this.status
                });
            } else {
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.$store.dispatch(action.LIST_EMPLOYEE, {
                    page: 1,
                    employee_search: trimName,
                    status: this.status
                });
            }
        },
        newDispatcher() {
            this.$router.replace('new-dispatcher')
        },
        imgAlt(event) {
            event.target.src = require("../../assets/images/avatar-2.jpg");
        },
        handlePageChange(page) {
            this.currentPage = page
            this.$store.commit(mutation.BUTTON_STATUS, true);
            this.$store.dispatch(action.LIST_EMPLOYEE, {
                page: this.currentPage,
                status: this.status
            });
        },
        async filterStatus(status) {
            this.$store.commit(mutation.BUTTON_STATUS, true);
            this.status = status;
            await this.$store.dispatch(action.LIST_EMPLOYEE, {
                page: 1,
                status: this.status
            });
            this.formData()
        },
        openDialog(data) {
            // this.form.photos = data.profile_pictures;
            this.form.phone = data.phonenumber;
            this.form.email = data.email;
            this.form.nik = data.nik;
            this.form.photo = data.profile_picture;
            this.form.id = data.idemployee;
            this.form.name = data.name;
            this.form.address = data.address;
            this.form.birthdate = data.birthdate;
            this.form.users_id = data.users_id;
            this.form.status = data.status;
            this.form.job = data.employee_position.job_name;
            this.form.gender = data.gender;
            this.form.photo_2 = data.profil_picture_2;
        },
        additionalImage(){
            if(this.form.photo_2 === null){ this.form.photo_2 = this.alt}
            this.centerDialogVisible = true
        },
        async deleteB() {
            await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then( async result => {
                if (result.value) {
                    this.payload.users_id = this.form.users_id;
                    this.payload.status = this.form.status;
                    this.$store.commit(mutation.BUTTON_STATUS, true);
                    this.$store.commit(mutation.SET_BUTTON_DELETE, true);
                    this.$store.dispatch(action.DELETE_EMPLOYEE, this.payload)
                    await this.dataBeforeCreated();
                }
            });
        },
        resendActivation() {
            let obj = {
                pin_type: "/employee/resend-pin",
                id: this.form.users_id
            };
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.RESEND_PIN, obj);
        },
        async activeButton() {
            await Swal.fire({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, activate it!"
            }).then( async result => {
                if (result.value) {
                    this.payload.users_id = this.form.users_id;
                    this.payload.status = this.form.status;
                    this.$store.commit(mutation.BUTTON_STATUS, true);
                    this.$store.commit(mutation.SET_BUTTON_ACTIVE, true);
                    await this.$store.dispatch(action.ACTIVATE_EMPLOYEE, this.payload);
                    this.dataBeforeCreated();
                }
            });
        },
        CreateEmployee() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$router.push({
                name: "NewEmployee"
            });
        },
        Position() {
            this.$router.push({
                name: "ListPosition"
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
            });
            if (reason) {
                this.payload.reason_suspend = reason;
                this.payload.users_id = this.form.users_id;
                this.payload.status = this.form.status;
                this.$store.commit(mutation.BUTTON_STATUS, true);
                await this.$store.dispatch(action.SUSPEND_EMPLOYEE, this.payload);
                this.dataBeforeCreated();
            }
        },
        async editButton() {
            this.$store.commit(mutation.BUTTON_STATUS, false);
            await this.$store.dispatch(action.DETAIL_EMPLOYEE, this.form.id);
            router.push({
                path: `/edit-employee/` + this.form.id
            });
        },
        formData(){
            // this.form.photos = this.listData[0].profile_pictures;
            this.form.phone = this.listData[0].phonenumber;
            this.form.email = this.listData[0].email;
            this.form.id = this.listData[0].idemployee;
            this.form.nik = this.listData[0].nik;
            this.form.photo = this.listData[0].profile_picture;
            this.form.name = this.listData[0].name;
            this.form.address = this.listData[0].address;
            this.form.birthdate = this.listData[0].birthdate;
            this.form.users_id = this.listData[0].id;
            this.form.status = this.listData[0].status;
            this.form.job = this.listData[0].employee_position.job_name;
            this.form.gender = parseInt(this.listData[0].gender);
            this.form.photo_2 = this.listData[0].profil_picture_2;
        },
        async dataBeforeCreated(){
            await this.$store.dispatch(action.LIST_EMPLOYEE, {
                page: this.currentPage,
                status: this.status
            });
            if (this.listData !== null) {
                if (this.listData.length > 0) {
                    this.formData();
                }
            }
        }
    },
    async created() {
        this.$store.commit(mutation.BUTTON_STATUS, true);
            this.dataBeforeCreated()
    },
    async mounted() {
        await this.$store.dispatch(action.ACCOUNT_EMPLOYEE)
        if (this.listData !== null) {
            if (this.listData.length > 0) {
                this.formData();
            }
        }
    },
    computed: {
        ...mapGetters({
            total           : getter.GET_EMPLOYEE_TOTAL,
            listData        : getter.GET_LIST_EMPLOYEE,
            paginate        : getter.GET_PAGINATE_EMPLOYEE,
            loading         : getter.GET_BUTTON,
            totalEmployee   : getter.GET_ACCOUNT_EMPLOYEE,
            buttonDelete    : getter.GET_BUTTON_DELETE,
            buttonResendPIN : getter.GET_BUTTON_RESEND_PIN,
            buttonActive    : getter.GET_BUTTON_ACTIVE,
            buttonSuspend   : getter.GET_BUTTON_SUSPEND,
            buttonEdit      : getter.GET_BUTTON_EDIT
        }),
        contactsFiltered() {
            return this.contacts.filter(({
                full_name,
                email,
                phone
            }) => (full_name + email + phone).toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) !== -1)
        },
        contactsClass() {
            return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
        },
        forTotal() {
            if (this.listData) {
                return this.total;
            }
        }
    },
    paginato() {
        return this.paginate
    },
    indexTam() {
        return this.indexT
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables";

.card-border {
    border-radius: 11px;
}

.line-not-center {
    border-right: 3px solid #3333;
}

.line {
    border-right: 3px solid #3333;
    text-align: center;
}

.text-p {
    display: block;
    color: white;
    font-weight: 600;
}

.plus-bg {
    background-color: #a31424;
    height: 139px;

}
.plus-bg2 {
    background-color: #e64a19

;
    height: 139px;

}

.avatar {
    img {
        border: 1px solid transparentize($text-color, .9);
        box-sizing: border-box;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        transition: all .5s .25s;
    }
}

.avatar2 {
    img {
        border: 1px solid transparentize($text-color, .9);
        box-sizing: border-box;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        transition: all .5s .25s;
    }
}

.name-of {
    margin-bottom: 10px;
    color: #a31424;
}

.contacts-list {
    //margin: 0 auto;
    height: 600px;
    width: 100%;
    max-width: 965px;
    padding: 0px 30px;
    box-sizing: border-box;

    .contact {
        margin: 10px 0;
        padding: 5px;
        box-sizing: border-box;
        cursor: pointer;
        border-bottom: 1px solid $text-color-info;
    }
}

.small-edit {
    width: 90px;
}
</style>
<style lang="scss">
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #D50000 !important;
}
</style>
