<template>
    <div class="comment-leave">
        <div class="comment-header">
            <img :src="comment.avatar_url" alt="" class="avatar" />
        </div>
        <div class="comment-text">
            <div class="comment-name">{{ comment.name }}</div>
            <div class="comment-content">{{ comment.content }}</div>
            <div class="comment-time"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Comment-leave",
    props: {
        comment: {
            type: Object
        }
    }
};
</script>

<style lang="stylus" scoped>
.comment-leave
    display flex
    width 100%
    padding 1rem 0 0rem
    margin-top 1rem
    .comment-header
        flex 0 0 auto
        width 3rem
        height 3rem
        border-radius 50%
        background-color #aaa
        overflow hidden
        .avatar
            display block
            width 100%
            height 100%
    .comment-text
        flex 1 1 auto
        padding 0rem 0rem 1rem 0.5rem
        color #333
        border-bottom 1px solid #eee
        .common-name
            color #333333
        .comment-content
            margin-top 0.4rem
            color #505050
            font-size 14px
</style>
