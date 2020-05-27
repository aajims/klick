<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="10">
                <el-col :lg="9">
                    <el-select v-model="form.idrole" filterable placeholder="Role">
                        <el-option v-for="item in select" :key="item.idrole" :label="item.name" :value="item.idrole"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24">
                    <el-form-item prop="question">
                        <el-input placeholder="Question" v-model="form.question"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24">
                    <div class="card-base card-shadow--medium" style="min-height: 300px;">
                        <quill-editor :options="editor" v-model="form.answer">
                        </quill-editor>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :offset="20" :lg="2">
                <el-button @click="onSubmit('form')" type="success">Save</el-button>
            </el-col>
            <el-col :lg="2">
                <el-button @click="Cancel()" type="succes">Cancel</el-button>
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
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types';
export default {
    name: "NewLocation",
    data() {
        return {
            form: {
                question: "",
                answer: "",
                idrole: "",
            },
            select: [
                {
                    idrole: 2,
                    name: "Vendor"
                },
                {
                    idrole: 3,
                    name: "Enterprise"
                },
            ],
            rules: {
                question: [{
                    required: true,
                    message: "Question is required!",
                    trigger: "blur"
                }],
                answer: [{
                    required: true,
                    message: "Answer is required!",
                    trigger: "blur"
                }],
                role: [{
                    required: true,
                    message: "Role is required!",
                    trigger: "blur"
                }],
            },
            editor: {
                placeholder: 'Put an answer here..',
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
        };
    },
    methods: {
        onSubmit(formName) {
            let obj = {
                question: this.form.question,
                idrole: this.form.idrole,
                answer: this.form.answer
            };
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.CREATE_FAQ, this.form);
                } else {
                    return false;
                }
            });
        },
        Cancel() {
            this.$router.replace({
                path: "/faq"
            });
        }
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
        margin-bottom: 20px;
    }
}

.el-col {
    border-radius: 5px;
}

.el-radio {
    margin: 0 160px 0 10px;
}

.el-select {
    width: 100%;
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
