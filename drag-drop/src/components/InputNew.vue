<script setup>
import { ref, defineEmits } from 'vue';


const text = ref("");//Ref, nos sirve para valores sencillos, en este caso, un String
const emits = defineEmits(['onNewItem']);

function handleSubmit(){
    if(text != ''){
        // Mandamos a llamar el emit
        emits('onNewItem', text);
        text.value = "";
    }
} 
</script>

<template>
    <form action="" @submit.prevent="handleSubmit">
    <input type="text" v-model="text">
    </form>
</template>

<style scoped>
form{
    margin-bottom: 10px;
    
}

input{
    width: 100%;
    box-sizing: border-box;
}
</style>