<script>
    export default{
        props: ["onTagsChange"], //Cada vez que se agrega una nueva etiqueta, vamos a devolver la lista de etiquetas
        data(){
            return{
                currentValue: "",
                tags:[],
            }
        },
        methods:{
            handleKeyDown(e){
                if (e.key == "Backspace" && this.currentValue == "") {
                    this.tags.pop();
                    this.onTagsChange(this.tags);
                }
            },
            handleSubmit(){
                if (this.currentValue != "") {
                    const exist = this.tags.some((item) => item == this.currentValue);
                    if (!exist) {
                        //Aquí, le agragamos que no se pueda repetir texto en las tags
                        this.tags.push(this.currentValue);
                        this.currentValue = "";
                        this.onTagsChange(this.tags);

                    }
                }

            },

            deleteTag(tag){
                this.tags = this.tags.filter(( item ) => item != tag );
                this.onTagsChange(this.tags);
            }

    }};
</script>

<template>
    <div class="inputTag">
        <div class="tags">
            <div class="tag" v-for="(tag, index) in tags" :key="index">
                {{ tag }} <button @click="deleteTag(tag)">X</button>
            </div>
        </div>
    </div>
    <form @submit.prevent="handleSubmit">
        <input class="input" type="text" v-model="currentValue"  @keydown="handleKeyDown" />
    </form> 
    <!-- prevent: sirve para omitir el comportamiento del fromulario -->


</template>

<style scoped>

    .inputTag{
        display: inline-flex; /*Para que no se abloque, o sea, si quiero colocar un elemento al frente de input que tengo, lo pueda hacer sin ningún problema*/
        border: solid 1px #000;
        border-radius: 3px;
    }

    .tags {
        display: flex;
        gap: 3 px;
        padding: 5px;
    }

    .tags .tag{
        display: flex;
        padding: 5px;
        border: solid 1px #ccc;
        gap: 5 px;
        align-content: center;
        border-radius: 3px;
    }

    .inputTag form{
        display: inline-flex; /*Hace que se acomode al centro verticalmente*/
    }

    .inputTag .input{
        border: none;
        outline: none;
        padding: 5px;
    }

    .tag button{
        background-color: transparent;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .tag button:hover{
        background-color: #eee;
    }

</style>
