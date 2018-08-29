<template>
	<ul class="icon-list">
		<li v-for="item in icons"><i :class="item"></i><div style="font-size:12px;padding-top: 10px;">{{item.substring(0,9)}}<br/>{{item.substring(10)}}</div></li>
	</ul>
</template>
<script>
	import iconJson from "../common/iconJson.js"
	export default{
		data(){
			return{
				icons:iconJson
			};
		}
	}
</script>
<style scoped>
	.icon-list li{
        display: inline-block;
        vertical-align: middle;
        padding:10px;
        text-align:center;
	}
	.icon-list li i{
		font-size: 30px;
	}
</style>