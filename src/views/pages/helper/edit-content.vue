<template>
<div class="page-quill scrollable">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="name">
                        <el-input disabled placeholder="Content Name" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <el-form-item prop="description">
                        <el-input placeholder="Description" v-model="form.description"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="card-base card-shadow--medium" style="min-height: 300px;">
                <quill-editor :options="editor" v-model="form.content">
                </quill-editor>
            </div>
        </el-form>
        <div style="min-height: 20px;">
        </div>
        <el-row>

            <el-col :offset="17" :lg="3">
                <el-button style="width: 100%" :loading="button" @click="onSubmit('form')" type="success">Save</el-button>
            </el-col>
            <el-col :offset="1" :lg="3">
                <el-button style="width: 100%" @click="Cancel()" type="succes">Cancel</el-button>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions,
    mapState
} from "vuex";
import * as mutation from '../../../store/mutation-types';
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
export default {
    name: "EditContent",
    data() {
        return {
            form: {
                name: "",
                description: "",
                content: "",
                idcontent: "",
            },
            editor: {
                theme: 'snow',
                modules: {
                    toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link']
                    ],
                }
            },
            rules: {
                content: [{
                    required: true,
                    message: "Content is required!",
                    trigger: "blur"
                }],
                description: [{
                    required: true,
                    message: "Description is required!",
                    trigger: "blur"
                }],
            }
        };
    },
    methods: {
        onSubmit() {
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.UPDATE_PAGES, this.form);
        },
        Cancel() {

            this.$router.replace({
                path: "/pages"
            });
        }
    },
    computed: {
        ...mapGetters({
            button: getter.GET_BUTTON,
            content: getter.GET_DATA_CONTENT
        }),
    },
    created() {
        this.form.name = this.content.name;
        this.form.description = this.content.description;
        this.form.content = this.content.content;
        this.form.idcontent = this.content.idstatic_content
    },
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
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.page-quill {
    .card-base {
        box-sizing: border-box;

        .quill-editor {
            .ql-toolbar.ql-snow {
                border: none;
                background: lighten($background-color, 2%);
                border-bottom: 1px solid $background-color;
            }

            .ql-container.ql-snow {
                border: none;
            }
        }

        &.t-bubble {
            overflow: inherit;
        }
    }
}

@media (max-width: 768px) {
    .page-quill {
        .card-base {
            &.t-bubble {
                padding: 40px 20px;
            }
        }
    }
}
</style>
