<template>
  <div id="app" >
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Tabs></Tabs>
  </div>
</template>

<script>
import Tabs from '@/page/tab/tab'
export default {
  name: 'App',
  components:{
  	Tabs
  },
  methods:{
  }
}
</script>

<style></style>
