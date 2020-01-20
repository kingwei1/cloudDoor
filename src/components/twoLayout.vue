<template>
    <div class="twoLayout">
        <slot>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "two-layout"
    }
</script>

<style scoped>
    .twoLayout{
        overflow: auto;
    }
    .twoLayout>div{
        width: 548px;
        float: left;
        border: 1px solid #6580ad;
    }
    .twoLayout>div:nth-child(even){
        margin-left: 72px;
    }
</style>