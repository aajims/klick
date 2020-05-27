<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
      <el-form ref="form" :rules="rules" :model="form">
        <el-row :gutter="20">
          <el-col>Admin</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8">
            <el-form-item prop="admin_name">
              <el-input placeholder="Admin Name" v-model="form.admin_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8">
            <el-form-item prop="admin_phonenumber">
              <el-input   
                v-on:keypress.native="isNumber"
                placeholder="Admin Mobile Phone" 
                v-model="form.admin_phonenumber">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8">
            <el-form-item prop="admin_email">
              <el-input placeholder="Admin Email" v-model="form.admin_email"></el-input>
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
          <el-button @click="Cancel()" type="succes" index="/vendor">Cancel</el-button>
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
        idvendor: "",
        idadmin: "",
        admin_name: "",
        admin_phonenumber: "",
        admin_email: ""
      },
      rules: {
        admin_name: [
          {
            required: true,
            message: "Admin Name is required!",
            trigger: "blur"
          }
        ],
        admin_phonenumber: [
          {
            required: true,
            message: "Admin Mobile Number is required!",
            trigger: "blur"
          }
        ],
        admin_email: [
          {
            required: true,
            message: "Admin Email is required!",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.form.idvendor = this.vendor.idvendor;
    this.form.idadmin = this.vendor.admins[0].id;
    this.form.admin_name = this.vendor.admins[0].name;
    this.form.admin_phonenumber = this.vendor.admins[0].phonenumber;
    this.form.admin_email = this.vendor.admins[0].email;
  },
  methods: {
    onSubmit() {
      this.$store.commit(mutation.BUTTON_STATUS, true)
      this.$store.dispatch(action.UPDATE_DATA_ADMIN, this.form);
    },
    Cancel() {
      this.$router.replace({
        path: "/detail-vendor/" + this.vendor.idvendor
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
      vendor: getter.VENDOR
    })
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

.el-select {
  width: 100%;
}

.thumbnail {
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
}

.thumbnail img {
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

a {
  border-style: dotted;
  border-radius: 15px;
  padding: 10px;
  height: 150px;
}

td {
  padding: 10px;
}
</style>
