<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row>
            <el-col :lg="10">
                <el-input v-model="search" placeholder="Search">
                </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <div v-for="item in filteredFAQ">
                <el-collapse>
                    <el-collapse-item :title="item.question">
                       <span v-html="' &nbsp; A:' + item.answer"></span>
                    </el-collapse-item>
                </el-collapse>
                
            </div>
        </el-row>
    </div>
</div>
</template>

<script>
import Affix from "@/components/Affix";
import {
    mapGetters
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
export default {
    name: "ListFAQ",
    data() {
        return {
            search: "",
            faq: null,
            payload: {
                idrole: 2,
                page: 1
            }
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            getfaq: getter.GET_LIST_FAQ,
        }),
        filteredFAQ: function () {
            var self = this;
            return this.faq.filter(function (faqData) {
                return faqData.question.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 || faqData.answer.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
            });
        }
    },
    mounted() {
        // this.$store.dispatch(action.LIST_FAQ, this.payload);
    },
    created() {
        this.faq = this.getfaq
    }
}
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

</style>
