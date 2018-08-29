<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
	import { HappyScroll } from 'vue-happy-scroll'
    import 'vue-happy-scroll/docs/happy-scroll.css'
    export default{
    	components:{HappyScroll}
    }
</script>
<style>
    @import "../static/css/main.css";
    /*深色主题*/
    @import "../static/css/color-dark.css"; 
    
   /*@import "../static/css/theme-green/color-green.css";/*浅绿色主题*/
</style>