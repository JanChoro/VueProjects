<script setup>
import { defineProps, ref } from 'vue';
import { pay } from "../store/store.js"

const props = defineProps(['id', 'numberOfPerson', 'totalPerPerson', 'paid']);

let paid = ref(false) // referencia para manejar el estado

function handleChange(e){
    paid = e.target.checked;
    pay(props.id, paid)
}
//Línea 15: sis prop.paid es igual a verdedaro, entonces aplica el estilo 'person-paid' sino, entonces agrega el estilo de 'person-no-paid'

</script>

<template>
    <div :class="['person', props.paid ? 'person-paid' : 'person-no paid']">
        <div class="person-number">
            Person {{ props.numberOfPerson }}
        </div>
        <div class="person-to-paid">
            {{ 
            new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(props.totalPerPerson)
        }}
        </div>
        <div class="paid">
            <input type="checkbox" name="" id="" @change="handleChange"> Paid
        </div>

    </div>
</template>

<style scoped>
.person{
        height: 200px;
        border-radius: 5px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
    }

.person-paid{
        border:solid 3px yellowgreen;
    }

.person-no-paid{
    border:solid 3px #ccc;

}

.person-number{
    background-color: black;
    padding: 10px;
    color: white;
    text-align: center;
}

.person-to-pay{
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    color: yellowgreen;
}

.paid{
    background-color: #343f68;
    padding: 10px;
}
</style>