<template>
<vue-scroll class="page-layout-element">
    <div v-if="privacy">
        <div class="card-base card-shadow--medium bg-white">
            <el-row :gutter="10">
                <h1>{{privacy.name}}</h1>
                <div v-html="privacy.content"></div>
            </el-row>
        </div>
    </div>
</vue-scroll>
</template>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";

export default {
    name: "Privacy",
    data() {
        return {

        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            privacy: getter.GET_DATA_PRIVACY
        }),
    },
    mounted() {
        this.$store.dispatch(action.DATA_PRIVACY);
    },

};
</script>

<style lang="scss" scoped>
.card-base {
    padding: 20px;
}

.el-row {
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
