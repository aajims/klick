<template>
  <div class="container mb-200">
    <p class="font-weight-600">ACCOUNT</p>
    <el-row :gutter="50">
      <el-col :span="19">
        <el-card shadow="always" :body-style="{padding: '5px'}" class="card-border">
          <el-row :gutter="20" v-if="total !== null">
            <el-col :span="8">
              <div class="line">
                <p class="pb-20 font-weight-600 mt-8">TOTAL USER</p>
                <span class="font-size-44 font-weight-600">{{total.total_dispatcher}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="line">
                <p class="pb-20 font-weight-600 mt-8">ACTIVE USER</p>
                <span class="font-size-44 font-weight-600">{{total.active_account}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="text-center">
                <p class="pb-20 font-weight-600 mt-8">SUSPENDED USER</p>
                <span class="font-size-44 font-weight-600">{{total.suspended_account}}</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-button @click="newDispatcher" shadow="always" :body-style="{padding: '10px'}" class="card-border plus-bg text-center">
          <i class="mdi mdi-plus font-size-60 font-weight-500 white-text"></i>
          <span class="text-p">Add New</span>
          <span class="text-p">User</span>
        </el-button>
      </el-col>
    </el-row>

    <p class="font-weight-600 mt-40">INFO</p>
    <el-row class="mt-20">
      <el-card shadow="always" class="card-border" >
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="avatar2 align-vertical text-center">
              <img :src="form.photo" class="align-vertical-middle" alt="user avatar" @error="imgAlt" >
              <h1 class="name-of">{{ form.name }}</h1>
              <span>{{ form.status }}</span>
            </div>
            <el-row type="flex" justify="center">
              <el-col :span="9" class="break-word">
                <div>
                <dl>
                  <dt v-if="form.company !== ''">COMPANY</dt>
                  <dd>{{ form.company }}</dd>

                  <dt>PHONE</dt>
                  <dd>{{ form.phone }}</dd>

                  <dt>EMAIL</dt>
                  <dd>{{ form.email }}</dd>
                </dl>
                </div>
              </el-col>
              <el-col :span="9">
                <div>
                <dl>
                  <dt v-if="form.companyAdress !== ''">COMPANY ADDRESS</dt>
                  <dd>{{ form.companyAdress }}</dd>

                  <dt>NIK</dt>
                  <dd>{{ form.nik }}</dd>
                </dl>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex"  justify="center" class="mt-10">
              <el-col :span="6"><el-button @click="editButton" type="info" size="small" class="small-edit">Edit</el-button></el-col>
              <el-col :span="10">
                <el-button
                        type="danger"
                        size="small"
                        :loading="buttonSuspend"
                        @click="suspendButton"
                        v-if="status === 1">
                  Suspend
                </el-button>
                <el-button
                        type="success"
                        size="small"
                        :loading="buttonResActive"
                        @click="resendActivation"
                        v-if="status === 2">
                  Resend Activation
                </el-button>
                <el-button
                        type="danger"
                        size="small"
                        :loading="buttonDelete"
                        @click="deleteB"
                        v-if="status === 3">
                  Delete
                </el-button>
                <el-button
                        type="primary"
                        size="small"
                        :loading="buttonActive"
                        @click="activeButton"
                        v-if="status === 3">
                  Active
                </el-button>
                </el-col>
            </el-row>
          </el-col>


          <el-col :span="12" class="line-not-center">
            <el-row type="flex"  justify="center" :gutter="20" class="mt-10">
              <el-col :span="10">
                <el-input
                      size="mini"
                      placeholder="Search"
                      @keyup.native="searchChange"
                      v-model="input4">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-select @change="filterStatus" v-model="status" filterable size="mini" placeholder="All Status">
                  <el-option
                          v-for="item in select"
                          :key="item.status"
                          :label="item.name"
                          :value="item.status">
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
                  <div class="phone align-vertical p-10 green" v-if="c.status === 1"><span class="align-vertical-middle font-weight-600">ACTIVE</span></div>
                  <div class="phone align-vertical p-10" v-if="c.status === 2"><span class="align-vertical-middle font-weight-600">IN ACTIVE</span></div>
                  <div class="phone align-vertical p-10 red" v-if="c.status === 3"><span class="align-vertical-middle font-weight-600">SUSPENDED</span></div>
                </div>
              </div>
              </el-row>
                <div class="grid-content">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handlePageChange"
                        :total="paginate.totalP">
                    </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import router from '../../router'
  import Swal from 'sweetalert2'
  import Contacts from '@/assets/data/CONTACTS_MOCK_DATA.json'
  import { mapGetters, mapActions } from 'vuex'
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
        value: '',
        input4: '',
        form: {
          name: '',
          photo: '',
          status: '',
          company:'',
          phone: '',
          email: '',
          companyAdress: '',
          nik: '',
          id: ''
        },
        payload: {
          reason_suspend: "",
          users_id: null,
          iddispatcher: "",
        },
        select: [
                {
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
      searchChange(v){
        let trimName = this.input4.trim()
          this.$store.commit(mutation.BUTTON_STATUS, true);
          this.$store.dispatch(action.LIST_DISPATCHER, {
              page: 1,
              typedispatcher: this.type,
              dispathcer_search: trimName,
              status: this.status
            });
        this.firstData()
      },
      newDispatcher()   {
        this.$router.replace('new-dispatcher')
      },
      imgAlt(event) {
          event.target.src = require("../../assets/images/avatar-2.jpg");
      },
      handlePageChange(page) {
        this.currentPage = page;
        this.$store.commit(mutation.BUTTON_STATUS, true);
        this.$store.dispatch( action.LIST_DISPATCHER,
            {
              page: this.currentPage,
              dispathcer_search: input4,
              typedispatcher : this.type,
              status: this.status
            });
      },
      async filterStatus(status){
        this.$store.commit(mutation.BUTTON_STATUS, true);
        this.status = status;
        await this.$store.dispatch(action.LIST_DISPATCHER,
            {
              page: 1,
              dispathcer_search: this.input4,
              typedispatcher : this.type,
              status: this.status
            });
        this.firstData()
      },
      openDialog(data) {
        this.form.photos = data.profile_pictures;
        this.form.phone = data.phonenumber;
        this.form.email = data.email;
        this.form.photo = data.profile_picture;
        this.form.id    = data.id;
        this.form.name = data.name;
        if(data.enterprise !== null){
          this.form.company = data.enterprise.name;
          this.form.companyAdress = data.enterprise.office_address
        }
        if(data.enterprise === null){
          this.form.company = '';
          this.form.companyAdress = ''
        }
        if(data.dispatcher_profile !== null ){
          this.form.nik   = data.dispatcher_profile.nik;
          this.payload.iddispatcher = data.dispatcher_profile.iddispatcher;
        }else {
          this.form.nik   = '';
          this.payload.iddispatcher = '';
        }
      },
        deleteB() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.value) {
                    this.$store.commit(mutation.SET_BUTTON_DELETE, true);
                    this.$store.commit(mutation.BUTTON_STATUS, true);
                    await this.$store.dispatch(action.DELETE_DISPATCHER, this.form.id)
                    this.firstData()
                }
            })
        },
        resendActivation(){
            let obj ={
                page : '/dispatcher',
                iddispatcher   : this.payload.iddispatcher
            };
            this.$store.commit(mutation.SET_BUTTON_RESEND_ACTIVE, true);
            this.$store.commit(mutation.BUTTON_STATUS, true);
            this.$store.dispatch(action.RESEND_LINK_ACTIVATION, obj)
        },
        activeButton() {
            Swal.fire({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, activate it!"
            }).then(result => {
                if (result.value) {
                    this.$store.commit(mutation.SET_BUTTON_ACTIVE, true);
                    this.$store.commit(mutation.BUTTON_STATUS, true);
                    this.$store.dispatch(action.ACTIVATE_DISPATCHER, this.form.id);
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
            });
            if (reason) {
                this.payload.reason_suspend = reason;
                this.payload.users_id = this.form.id;
                this.$store.commit(mutation.SET_BUTTON_SUSPEND, true);
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.$store.dispatch(action.SUSPEND_DISPATCHER, this.payload)
                this.firstData();
            }
        },
      async editButton() {
          await this.$store.commit(mutation.SET_ID_DISPATCHER, this.form.id)
          router.push({
              path: `/edit-dispatcher`
          })
        },
      firstData(){
        if(this.listData !== null) {
          if(this.listData.length > 0){
            this.form.photos = this.listData[0].profile_pictures;
            this.form.phone = this.listData[0].phonenumber;
            this.form.email = this.listData[0].email;
            this.form.id    = this.listData[0].id;
            this.form.photo = this.listData[0].profile_picture;
            this.form.name = this.listData[0].name;
            if(this.listData[0].enterprise !== null){
              this.form.company = this.listData[0].enterprise.name;
              this.form.companyAdress = this.listData[0].enterprise.office_address
            }
            if(this.listData[0].enterprise === null){
              this.form.company = '';
              this.form.companyAdress = ''
            }
            if(this.listData[0].dispatcher_profile !== null ){
              this.form.nik   = this.listData[0].dispatcher_profile.nik;
            }else {
              this.form.nik   = '';
            }
          }
        }
      }
    },
      async created(){
        await this.$store.dispatch(action.TOTAL_ACCOUNT_DISPATCHER)
              this.$store.commit(mutation.BUTTON_STATUS, true);
        await this.$store.dispatch(action.LIST_DISPATCHER,{
                page: this.currentPage,
                typedispatcher : this.type,
                dispathcer_search: this.input4,
                status: this.status});
        this.firstData()
      },
      // async mounted(){
      //     this.firstData()
      // },
    computed: {
      ...mapGetters({
        total           : getter.GET_TOTAL_ACCOUNT_DISPAT,
        listData        : getter.GET_LIST_DISPATCHER,
        paginate        : getter.GET_PAGINATE_DISPATCHER,
        loading         : getter.GET_BUTTON,
        totalEmployee   : getter.GET_ACCOUNT_EMPLOYEE,
        buttonDelete    : getter.GET_BUTTON_DELETE,
        buttonResendPIN : getter.GET_BUTTON_RESEND_PIN,
        buttonActive    : getter.GET_BUTTON_ACTIVE,
        buttonSuspend   : getter.GET_BUTTON_SUSPEND,
        buttonEdit      : getter.GET_BUTTON_EDIT,
        buttonResActive : getter.GET_BUTTON_RESEND_ACTIVE
      }),
      contactsFiltered() {
        return this.contacts.filter(({full_name, email, phone}) => (full_name + email + phone).toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) !== -1)
      },
      contactsClass() {
        return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
      }
      },
      paginato(){
          return this.paginate
      },
      indexTam(){
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
      border-left: 1px solid $text-color-info;
    }
    .line {
      border-right: 1px solid $text-color-info;
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
      height: 400px;
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
    .break-word {
      overflow-wrap: break-word;
    }
    .green {
      color: green;
    }
    .red {
      color: red;
    }
</style>