<template>
    <div class="comment-con">
        <CommentEmit></CommentEmit>
        <div class="comment-list">
            <CommentLeave
                v-for="(item, index) in commentLists"
                :key="index"
                :comment="item"
            ></CommentLeave>
        </div>
    </div>
</template>
<script>
import CommentEmit from "./CommentEmit.vue";
import CommentLeave from "./CommentLeave.vue";
import { getAllComment } from "../app/api/";
export default {
    name: "Comment",
    components: {
        CommentEmit,
        CommentLeave
    },
    data() {
        return {
            commentLists: []
        };
    },
    created() {
        //get all Comment
        getAllComment().then(res => {
            console.log(res);
            this.commentLists = res.data.data;
        });
    }
};
</script>
<style lang="stylus" scoped>
.comment-con
    width 100%
    .comment-list
        padding-left 2rem
</style>
