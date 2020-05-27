<template>
<span>
    <div class="hoverhand" slot="reference">
        <div v-if='picture == "" || picture == null'>
            <img @click="dialogTableVisible = vendor" src="../../../src/assets/images/avatar-2.jpg" class="avatar">
        </div>
        <div v-else-if='picture == 99'>
            <div v-if='vendor'>
                <el-button @click="dialogTableVisible = vendor"> Select Dispatcher</el-button>
            </div>
            <div v-else>
            <h3>There is no dispatcher</h3>
            </div>
        </div>
        <div v-else>
            <img @click="dialogTableVisible = vendor" :src="picture" class="avatar">
        </div>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" title="Assign Dispatcher Plus">
        <el-form :model="form" @submit.prevent.native>
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-form-item>
                        <el-input placeholder="Search" clearable v-model="form.search"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button @click="buttonSearch" icon="el-icon-search"></el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-table v-loading="loading" :data="listData" @row-click="getId" height="280">
                <el-table-column type="index" :index="indexMethod" label="No" width="80">
                </el-table-column>
                <el-table-column prop="name" label="Name">
                </el-table-column>
                <el-table-column prop="phonenumber" label="Mobile">
                </el-table-column>
            </el-table>
        </el-row>
        <!--<el-row>-->
            <!--<el-col :span="24">-->
                <!--<div class="grid-content">-->
                    <!--<el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="paginato.totalP">-->

                    <!--</el-pagination>-->
                <!--</div>-->
            <!--</el-col>-->
        <!--</el-row>-->
    </el-dialog>
</span>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import * as getter from '../../store/getters-types'
import * as action from '../../store/action-types'
import Swal from 'sweetalert2'
import * as mutation from '../../store/mutation-types'

export default {
    props: ['identerprise', 'picture'],
    data() {
        return {
            currentPage: 1,
            dialogTableVisible: false,
            form: {
                search: ''
            }
        };
    },
    computed: {
        ...mapGetters({
            paginate: getter.GET_PAGINATE_DISPATCHER,
            listData: getter.GET_DISPATCHER_AVAILABLE,
            loading: getter.GET_BUTTON,
        }),
        paginato() {
            return this.paginate
        },
        indexTam() {
            return this.indexT
        },
        vendor() {
            let idrole = JSON.parse(localStorage.getItem('user')).idrole
            if (idrole === 2) {
                return true
            } else {
                return false
            }
        }
    },
    // async created(){
        // let data = await this.$store.dispatch(action.LIST_DISPATCHER_ROLE, 4);
    // },
    methods: {
        async handlePageChange(page) {
            this.currentPage = page;
            let obj = {
                role: 4,
                page: this.currentPage
            };
            this.$store.commit(mutation.BUTTON_STATUS, true)
            await this.$store.dispatch(action.LIST_DISPATCHER_ROLE, obj);
        },
        indexMethod(index) {
            return index + 1;
        },
        buttonSearch() {
            this.$store.commit(mutation.BUTTON_STATUS, true);
            this.$store.dispatch(action.DISPATCHER_AVAILABLE, this.form.search)
        },
        async getId(id) {
            this.dialogTableVisible = false;
            let obj = {
                id: id.id,
                identerprise: this.identerprise
            };
            Swal.fire({
                title: 'Are you sure?',
                text: "You want to assign to dispatcher!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, assign it!'
            }).then(async (result) => {
                if (result.value) {
                    await this.$store.dispatch(action.ASSIGN_TO_ENTERPRISE, obj);
                    await this.$store.dispatch(action.DISPATCHER_AVAILABLE);
                } else {
                    this.dialogTableVisible = true
                }
            })
            // this.$store.dispatch(action.DATA_ID_CORP, id.identerprise)
            // this.$router.replace({ path: '/detail-enterprise/'+ id.identerprise })
        },
    },
};
</script>

<style lang="scss" scoped>
.table-box {
    overflow: auto;
}

.el-pagination {
    padding-top: 20px;
}

.card-base {
    padding: 20px;
}

.el-row {
    padding: 0px 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.image {
    max-width: 100%;
    height: 150px;
    display: block;
}

.vl {
    border-left: 3px solid #f2f2f2;
    height: 90%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.avatar {
    border-radius: 50%;
    max-width: 80px;
    height: 80px;
    border: 1px solid #fff;
    box-sizing: border-box;
    display: block;
    box-shadow: 0 2px 5px 0 rgba(49, 49, 93, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.5s;
}

.left {
    text-align: left;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.middle {
    margin-top: -30px
}

.drive-acount {
    height: 39px;
    margin-top: -11px;
    margin-bottom: -10px;
}

.hoverhand:hover {
    cursor: pointer;
}
</style>
