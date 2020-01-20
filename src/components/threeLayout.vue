<template>
    <div class="threeLayout">
        <slot>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "three-layout"
    }
</script>

<style scoped>
    .threeLayout{
        overflow: auto;
    }
    .threeLayout>div,.threeLayout>a{
        width: 360px;
        float: left;
        margin-right: 36px;		
        box-shadow: 10px 20px 20px #dcdcdc 
    }
	.threeLayout>div{
		font-size: 0;
	}
    .threeLayout>div:nth-child(3n){
        margin-right: 0;
    }
</style>