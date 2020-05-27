<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
      <el-form ref="form" :rules="rules" :model="form">
        <el-row :gutter="20">
          <el-col>Admin</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8">
            <el-form-item prop="name">
              <el-input placeholder="Name" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8">
            <el-form-item prop="phonenumber">
              <el-input   
                v-on:keypress.native="isNumber"
                placeholder="Phone Number" 
                v-model="form.phonenumber">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8">
            <el-form-item prop="email">
              <el-input placeholder="Email" v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="margin: 50px 0;"></div>
      <el-row>
        <el-col :lg="2">
           <el-button :loading="button" @click="onSubmit('form')" type="success">Save</el-button>
        </el-col>
        <el-col :lg="2">
          <el-button @click="Cancel()" type="succes">Cancel</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import { mapGetters, mapActions } from "vuex";
import * as mutation from '../../../store/mutation-types';
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
export default {
  name: "EditAdminVendor",
  data() {
    return {
      form: {
        name: "",
        phonenumber: "",
        email: "",
        iduser: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Name is required!",
            trigger: "blur"
          }
        ],
        phonenumber: [
          {
            required: true,
            message: "Phone Number is required!",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Email is required!",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
  },
  methods: {
    onSubmit() {
      this.$store.commit(mutation.BUTTON_STATUS, true)
      this.$store.dispatch(action.UPDATE_PROFILE_ADMIN, this.form);
    },
    Cancel() {
      this.$router.replace({
        path: "/profile/"
      });
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  },
  computed: {
    ...mapGetters({
      profile: getter.GET_DATA_PROFILE
    })
  },
  created(){
    this.form.name = this.profile.name
    this.form.phonenumber = this.profile.phonenumber
    this.form.email = this.profile.email
    this.form.iduser = this.profile.id
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

.card-base {
  padding: 20px;
}

.el-row {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  padding: 0px 10px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 5px;
}
</style>
