<template>
    <span>
            <el-row>
                <el-table
                        :data="listData"
                        @row-click="getId">
                    <el-table-column
                            type="index"
                            :index="indexMethod"
                            label="No"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="latitude"
                            label="Latitude">
                    </el-table-column>
                    <el-table-column
                            prop="longitude"
                            label="Longitude">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-col :lg="24">
                    <div class="grid-content">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                @current-change="handlePageChange"
                                :total="paginato.totalP">

                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="70%">
                <div class="card-base card-shadow--medium">
                    <gmap-map ref="map"
                              :center="location"
                              :zoom="14"
                              :options="{gestureHandling:'cooperative'}"
                              map-type-id="roadmap"
                              style="width: 100%; height: 500px"
                    >
                        <GmapMarker :position="location" label="S" />
                    </gmap-map>
                </div>
                <!--<el-button @click="dialogVisible = false">Cancel</el-button>-->
            </el-dialog>
    </span>
</template>
<script>

    import { mapGetters } from 'vuex'
    import * as getter from '../../../store/getters-types'
    import * as action from '../../../store/action-types'
    import Swal from 'sweetalert2'
    import * as mutation from '../../../store/mutation-types'

    export default {
        data() {
            return {
                currentPage     : 1,
                dialogVisible   : false,
                location        : null,
                form: {
                    search      : ''
                }
            };
        },
        computed: {
            ...mapGetters({
                paginate        : getter.GET_TRACKING_PAGINATE,
                listData        : getter.GET_TRACKING_ORDER,
                idorder         : getter.GET_ID_ORDER,
                trackingType    : getter.GET_TRACKING_TYPE,
                backPath        : getter.GET_PATH
            }),
            paginato(){
                return this.paginate
            },
            indexTam(){
                return this.indexT
            }
        },
        async created(){
            let obj = {
                id      : this.idorder,
                page    : 1,
                type    : this.trackingType
            };
            // await this.$store.dispatch(action.TRACKING, obj)
        },
        methods: {
            handlePageChange(page) {
                this.currentPage = page
                let obj = {
                    id      : this.idorder,
                    page    : this.currentPage,
                    type    : this.trackingType
                }
                this.$store.dispatch( action.TRACKING, obj )
            },
            indexMethod(index) {
                return index + this.paginato.fromP;
            },
            buttonSearch(){
                this.$store.dispatch(action.SEARCH_DISPATCHER, this.form.search)
            },
            async getId(id){
                this.dialogVisible = true
                let obj = {
                    lat:    Number(id.latitude),
                    lng:    Number(id.longitude)
                }
                this.location = obj
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

</style>