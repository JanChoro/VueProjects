<script>
  import InputTag from "./components/InputTag.vue"
  export default{
    components:{
      InputTag,
    },
    methods: {
      handleOnTagsChange(tags){
        console.log(tags);
      },
    },
  };
  
  //NOTA: Esta primera app será creada con options API
</script>

<template>
  <inputTag :onTagsChange="handleOnTagsChange" /> JUANN
</template>

<style scoped>

</style>
