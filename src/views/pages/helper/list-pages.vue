<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :offset="18" :lg="6">
                <el-select @change="filterStatus" v-model="payload.idrole" filterable placeholder="Select">
                    <el-option v-for="item in select" :key="item.idrole" :label="item.name" :value="item.idrole"></el-option>
                </el-select>
            </el-col>
            <el-col :lg="24">
                <el-table :data="listData" style="width: 100%">
                    <el-table-column type="index" :index="paginate.fromP" label="No" width="100"></el-table-column>
                    <el-table-column prop="name" label="Content Name"></el-table-column>
                    <el-table-column fixed="right" label="Operations" width="120">
                        <template slot-scope="scope">
                            <el-button @click="Edit(scope.row)" type="success" icon="el-icon-edit" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
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
    name: "ListPages",
    data() {
        return {
            affixEnabled: true,
            payload: {
                idrole: 2,
            },
            select: [{
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
            listData: getter.GET_PAGES_LIST,
            paginate: getter.GET_PAGINATE_PAGES,
            total: getter.GET_PAGES_TOTAL
        }),
        paginator() {
            return this.paginate;
        },
        forTotal() {
            if (this.listData) {
                return this.total;
            }
        }
    },
    methods: {
        Edit(e) {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$store.dispatch(action.DATA_CONTENT, e.idstatic_content);
        },
        filterStatus(idrole) {
            this.payload.idrole = idrole;
            this.$store.dispatch(action.LIST_PAGES, {
                page: 1,
                idrole: this.payload.idrole
            });
        },
    },
    async mounted() {
        await this.$store.dispatch(action.LIST_PAGES, this.payload)
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
