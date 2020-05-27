<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div v-if="dashboard">
        <ChartDashboard />
    </div>
</div>
</template>

<script>
import router from "../../../router";
import Affix from "@/components/Affix";
import {
    mapGetters
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from "../../../store/mutation-types";
import Swal from "sweetalert2";
import ChartDashboard from './chart-dashboard'

export default {
    data() {
        return {
            role: null,
            tabPosition: 'today',
            superadmin: 1,
            vendor: 2,
            enterprise: 3,
            dispatcherreg: 4,
            dispatcherplus: 5,
            firstPayload: {
                idrole: 0,
                page: 1
            },
            secondPayload: {
                idrole: 99
            }
        };
    },
    components: {
        Affix,
        ChartDashboard
    },

    computed: {
        ...mapGetters({
            dashboard: getter.GET_DASHBOARD
        }),
        payload() {
            if (this.role === 1) {
                return this.firstPayload
            } else {
                return this.secondPayload
            }
        },
    },
    async created() {
        let dash = {
                order_today: 1,
                order_week: '',
                order_month: '',
                task_today: 1,
                task_week: '',
                task_month: ''
            }
        // await this.$store.dispatch(action.GRAFIK_DASHBOARD);
        // await this.$store.dispatch(action.LIST_DASHBOARD, dash);
        // await this.$store.dispatch(action.LIST_FAQ, this.payload);
        // let userProfile = JSON.parse(localStorage.getItem("user")).idrole;
        // this.role = userProfile;
        // // //console.log('hey', this.role, this.enterprise)
        // let idRole = JSON.parse(localStorage.getItem('user')).idrole + '' || '5';
        // if (idRole === process.env.VUE_APP_ROLE_DISPATCHER_ENTERPRISE || idRole === process.env.VUE_APP_ROLE_DISPATCHER_ENTERPRISE_PLUS) {
        //     this.$store.dispatch(action.NOTIFICATION, 1);
        // }
    }
};
</script>

<style lang="scss" scoped>
.card-base {
    padding: 15px;
}



.el-row {
    padding: 0 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

// .box-card {
//     width: 300px;
//     height: 200px;
// }

</style>
