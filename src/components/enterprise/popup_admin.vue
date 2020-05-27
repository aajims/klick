<template>
<span>
    <div class="hoverhand" slot="reference">
        <div v-if='enterprise.admins[0].profile_picture == "" || enterprise.admins[0].profile_picture == null'>
            <img @click="dialogTableVisible = admin" src="../../../src/assets/images/avatar-2.jpg" class="avatar">
        </div>
        <div v-else>
            <img @click="dialogTableVisible = admin" :src="enterprise.admins[0].profile_picture" class="avatar">
        </div>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" title="Admin Enterprise">
        <el-row>
                <el-button type="danger" style="background-color: #D50000;" @click="addButton">
                    Add New Admin
                </el-button>
        </el-row>
        <div v-for="(domain) in enterprise.admins" :key="domain.key">
            <el-row :gutter="20" style="margin-top: 20px">
                <el-col :span="8">
                    <b>Admin Name</b>
                    <br>
                    {{ domain.name}}
                </el-col>
                <el-col :span="5">
                    <b>Admin Mobile Phone</b>
                    <br>
                    {{ domain.phonenumber}}
                </el-col>
                <el-col :span="9">
                    <b>Admin Email</b>
                    <br>
                    <span style="word-break: break-all">{{ domain.email}}</span>
                </el-col>
                <el-col :span="2">
                    <el-button type="success" @click="editAdmin(domain)" icon="el-icon-edit" style="padding: 12px"></el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</span>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import router from '../../router'
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
            enterprise: getter.ENTERPRISE,
            loading: getter.GET_BUTTON,
        }),
        paginato() {
            return this.paginate
        },
        indexTam() {
            return this.indexT
        },
        admin() {
            let idrole = JSON.parse(localStorage.getItem('user')).idrole
            if (idrole === 1) {
                return true
            } else {
                return false
            }
        }
    },
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
        addButton() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            router.replace(`/new-admin-enterprise/${this.enterprise.identerprise}`)
        },
        editAdmin(e) {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            router.replace('/edit-admin')
        },
        indexMethod(index) {
            return index + this.paginato.fromP;
        },
        buttonSearch() {
            this.$store.dispatch(action.SEARCH_DISPATCHER, this.form.search)
        },
        async getId(id) {
            this.dialogTableVisible = false
            let obj = {
                id: id.id,
                identerprise: this.identerprise
            }
            Swal.fire({
                title: 'Are you sure?',
                text: "You want to assign to dispatcher!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, assign it!'
            }).then((result) => {
                if (result.value) {
                    this.$store.dispatch(action.ASSIGN_TO_ENTERPRISE, obj)
                } else {
                    this.dialogTableVisible = true
                }
            })
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
