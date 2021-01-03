<template>
    <div class="comment">
        <User :visitor="$visitor || {}"></User>
        <input
            type="text"
            class="comment-input"
            placeholder="留下你想说的话吧"
            v-model="content"
        />
        <div class="submit" @click="submit">提交</div>
    </div>
</template>
<script>
import { postComment } from "../app/api/";
import User from "../components/User.vue";
export default {
    name: "CommentEmit",
    components: {
        User: User
    },
    data() {
        return {
            content: ""
        };
    },
    methods: {
        submit() {
            //提交评论
            if (!this.$visitor.name || !this.$visitor.avatar) {
                alert("please login in ");
                return;
            }
            if (!this.content) {
                alert("请输入内容");
                return;
            }
            postComment({
                content: this.content,
                name: this.$visitor.name,
                avatar_url: this.$visitor.avatar
            }).then(res => {
                console.log(res);
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
.comment
    box-sizing:border-box;
    width:100%;
    // height:4rem;
    padding:1rem 2rem;
    background-color:#fafbfc;
    overflow: hidden;
    .comment-input
        box-sizing:border-box;
        width:100%;
        height:2rem;
        padding-left:0.5rem;
        border:1px solid #bbb;
    .submit
        float:right;
        width:4rem;
        margin-top 0.5rem
        color:#007f80;
        border:1px solid #007f80;
        text-align center
        line-height 1.8rem
        font-size 0.9rem
        border-radius 4px
        background-color #fff
</style>
