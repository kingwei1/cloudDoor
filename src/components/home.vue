<template>
    <div id="main">
		<MyHeader></MyHeader>
        <router-view></router-view>
		<MyFooter></MyFooter>
    </div>
</template>

<script>
	import MyHeader from './MyHeader.vue'
	import MyFooter from './MyFooter.vue'
    export default {
        name: "home",
		components: {
			MyHeader,
			MyFooter
		},
        created(){
        }
    }
</script>

<style scoped>
 
</style>