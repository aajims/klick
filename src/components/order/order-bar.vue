<template>
    <div class="container">
        <el-row :gutter="10" class="mb-70">
            <el-col :span="12">
                <span class="font-weight-600 view-text">VIEW</span>
                    <el-radio-group v-model="tabTask" @change="totalTrack" fill="#AB0000" class="mt-33" >
                        <el-radio-button label="graphic"><span class="button-font">Graphic</span></el-radio-button>
                        <el-radio-button label="tracking"><span class="button-font">Tracking</span></el-radio-button>
                    </el-radio-group>
            </el-col>
            <el-col :span="12">
                <span class="font-weight-600 view-text">TOTAL ORDER</span>
                <el-row>
                    <el-col :span="12" :offset="12">
                        <el-radio-group v-model="tabOrder" @change="totalOrder" fill="#ababab" size="small">
                            <el-radio-button label="today">Today</el-radio-button>
                            <el-radio-button label="week">Week</el-radio-button>
                            <el-radio-button label="month">Month</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>

                <el-row v-if="orderBar">
                    <el-col :lg="24">
                        <el-card shadow="always" class="card-border" :body-style="{padding: '5px'}">
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-row class="font-icon line" justify="center">
                                        <el-col :span="9">
                                            <img src="../../assets/oper_asset/open.png" class="drive-acount">
                                        </el-col>
                                        <el-col :span="15" class="text-center font-weight-600 font-size-45">
                                            {{orderBar.order_open}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="8">
                                    <el-row class="font-icon line" justify="center">
                                        <el-col :span="9">
                                            <img src="../../assets/oper_asset/progress.png" class="drive-acount">
                                        </el-col>
                                        <el-col :span="15" class="text-center font-weight-600 font-size-45">
                                            {{orderBar.order_inprogress}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="8">
                                    <el-row class="font-icon" justify="center" style="padding-right: 30px">
                                        <el-col :span="9">
                                            <img src="../../assets/oper_asset/completed.png" class="drive-acount">
                                        </el-col>
                                        <el-col :span="15" class="text-center font-weight-600 font-size-45">
                                            {{orderBar.order_complete}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <div v-if="mapsGraph">
            <h4>ORDER DETAILS</h4>
            <div class="card-base card-shadow--medium p-30 mt-25 bg-white border-line-hight" v-if="orderGraphic !== null">
                <vue-chartist :data="lineChart" type="Line"></vue-chartist>
            </div>
        </div>

        <div v-else>
            <h4>ORDER DETAILS</h4>
            <div class="card-base card-shadow--medium bg-white">
                <gmap-map :center="markDefault" :zoom="16" style="width: 100%; height: 500px">
                    <div v-if="mapMark">
                        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" @click="openWindow(m.position)"></gmap-marker>
                        <gmap-info-window @closeclick="window_open=false" :opened="window_open" :position="infowindow" :options="{ pixelOffset: { width: 0, height: -35},}">
                            {{infowindow.name}}
                        </gmap-info-window>
                        <gmap-polyline :path="path" :options="{ strokeColor:'#BB0000'}">
                        </gmap-polyline>
                    </div>
                </gmap-map>
            </div>
        </div>

    </div>
</template>

<script>

    import { mapGetters } from 'vuex';
    import * as getter from "../../store/getters-types";
    import * as mutation from "../../store/mutation-types";
    import * as action from "../../store/action-types";

    export default {
        data(){
            return {
                tabTask: 'graphic',
                tabOrder: 'today',
                mapMark: null,
                markers: [],
                path: [],
                infowindow: {
                    lat: 0,
                    lng: 0,
                    name: null,
                },
                markDefault: {
                    lat: -6.21462,
                    lng: 106.84513
                },
                window_open: false,
                mapsGraph: true,
                options: {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                orderGraphic : getter.GET_ORDER_BAR_GRAPHIC,
                orderBar     : getter.GET_ORDER_BAR,
                listData     : getter.GET_TRACKING_ORDER,
                idorder      : getter.GET_ID_ORDER,
                trackingType : getter.GET_TRACKING_TYPE
            }),
            lineChart (){
                if(this.orderGraphic !== null){
                    return {
                        labels: this.orderGraphic.label,
                        series: this.orderGraphic.data
                    }
                }
            }
        },
        methods: {
            async totalTrack(v){
                (v === 'graphic') ? this.mapsGraph = true : this.mapsGraph = false;
                if(this.$route.path === '/order/complete' || this.$route.path === '/order/open' || this.$route.path === '/order/inprogress'){
                    let objList = {
                        dataList    : null,
                        nextC       : null,
                        prevC       : null,
                        firstP      : null,
                        fromPA      : null,
                        totalPE     : null
                    };
                   await this.$store.commit(mutation.TRACKING_ORDER, objList)
                }
            },
            totalOrder(v) {
                this.$store.dispatch(action.ORDER_GRAPHIC_BAR, {
                    v,
                    type    : 'order'
                })
            },
            openWindow(position) {
                this.window_open = true;
                this.infowindow.lat = position.lat;
                this.infowindow.lng = position.lng;
                this.infowindow.name = position.name;
            },
        },
        async created(){
            await this.$store.dispatch(action.ORDER_GRAPHIC_BAR, {
                v       : 'today',
                type    : 'order'
            });
            if(this.$route.path === '/order/detail' || this.$route.path === '/detail-order'){
                let obj = {
                    id      : this.idorder,
                    page    : 1,
                    type    : this.trackingType
                };
                await this.$store.dispatch(action.TRACKING, obj);
                for (let i = 0; i < this.listData.length; i++) {
                    const marker = {
                        lat: parseFloat(this.listData[i].latitude),
                        lng: parseFloat(this.listData[i].longitude),
                        name: this.listData[i].created_at
                    };
                    this.markDefault.lat = parseFloat(this.listData[i].latitude)
                    this.markDefault.lng = parseFloat(this.listData[i].longitude)
                    this.markers.push({
                        position: marker
                    });
                    this.path.push(marker)
                    this.mapMark = 1;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/_variables';
    .container {
        font-family: Arial;
    }
    .font-icon {
        font-size: 40px;
    }
    .button-font {
        font-size: 20px;
        padding: 20px;
    }
    .line {
        border-right: 1px solid $line-color;
        padding-right: 30px;
    }
    .view-text {
        display: block;
        font-size: 15px;
        margin-bottom: 13px;
    }
    .drive-acount {
        height: 44px;
        margin-top: 10px;
    }
</style>