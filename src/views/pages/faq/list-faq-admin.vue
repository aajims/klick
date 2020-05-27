<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :lg="4">
                <el-button @click="Create()" style="width: 100%" type="primary">New FAQ</el-button>
            </el-col>
            <el-col :offset="14" :lg="6">
                <el-select @change="filterStatus" v-model="payload.idrole" filterable placeholder="Select">
                    <el-option v-for="item in select" :key="item.idrole" :label="item.name" :value="item.idrole"></el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="24">
                <el-table :default-sort="{prop: 'id', order: 'ascending'}" :data="listData" style="width: 100%">
                    <el-table-column align="center" type="index" :index="paginate.fromP" label="No" width="80"></el-table-column>
                    <el-table-column align="left" prop="question" label="Question"></el-table-column>
                    <el-table-column align="center" width="200" label="Role">
                        <template slot-scope="scope">
                            <div v-if="scope.row.idrole===2">Vendor</div>
                            <div v-else-if="scope.row.idrole===3">Enterprise</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="Operations" width="120">
                        <template slot-scope="scope">
                            <el-button @click="Edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button @click="Delete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div align="right">
            <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="forTotal"></el-pagination>
        </div>
    </div>
</div>
</template>

<script>
import router from "../../../router";

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
    name: "ListDriver",
    data() {
        return {
            affixEnabled: true,
            indexT: 1,
            payload: {
                idrole: 0,
                page: 1,
                idfaq: '',
            },
            select: [
                {
                    name: "All Roles",
                    idrole: 0,
                },
                {
                    name: "Vendor",
                    idrole: 2,
                },
                {
                    name: "Enterprise",
                    idrole: 3,
                },
            ],
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_FAQ,
            paginate: getter.GET_PAGINATE_FAQ,
            total: getter.GET_FAQ_TOTAL
        }),
        paginator() {
            return this.paginate;
        },
        indexTam() {
            return this.indexT;
        },
        forTotal() {
            if (this.listData) {
                return this.total;
            }
        },
    },

    methods: {
        handlePageChange(page) {
            this.payload.page = page;
            this.$store.dispatch(action.LIST_FAQ, this.payload);
        },

        Create() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$router.push({
                name: "NewFAQ"
            });
        },

        filterStatus(idrole) {
            this.idrole = idrole;
            this.$store.dispatch(action.LIST_FAQ, {
                page: 1,
                idrole: this.idrole
            });
        },

        Edit(e) {
            this.$store.dispatch(action.DETAIL_FAQ, e.id);
        },
        Delete(e) {
           this.payload.idfaq = e.id
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
                    this.$store.dispatch(action.DELETE_FAQ, this.payload);
                }
            });
        }
    },
    async mounted() {
        await this.$store.dispatch(action.LIST_FAQ, this.payload);
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
