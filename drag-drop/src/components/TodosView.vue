<script setup>
import { reactive } from 'vue';
import InputNew from './InputNew.vue';


// Definimos la parte de nuestro estado
let boards = reactive([ //Aquí, definimos nuestro arreglo de objetos
    { //Este es un tablero
        id: crypto.randomUUID(), //crypto.randomUUID(), sirve para generar un Id único
        name: 'Tablero 1',
        items: [ // Estos van a ser los objetos que contiene el tablero
            {
                id: crypto.randomUUID(),
                title: 'Feature de archivos',
            },
            {
                id: crypto.randomUUID(),
                title: 'Resolver Bug',
            }
        ],

    },
    { //Este es otro tablero
        id: crypto.randomUUID(), //crypto.randomUUID(), sirve para generar un Id único
        name: 'Tablero 2',
        items: [ // Estos van a ser los objetos que contiene el tablero
            {
                id: crypto.randomUUID(),
                title: 'Mandar Reporte',
            },
            {
                id: crypto.randomUUID(),
                title: 'Code Review',
            },
        ]

    },
]); // Hay varias formas de declarar una variable reactiva, en Vue, con 'Ref' para valores censillos (números, string booleanos, etc) o 'Reactive' para objetos u arreglos.
function handleNewItem(text, board) { //Esta función permite mostrar el valor del input, el id del tablero y el número de este
    // console.log(text.value, board.id, board.name);
    board.items.push({
        id: crypto.randomUUID(),
        title: text.value,
    })
}

function handleNewBoard() {
    const name = prompt('Name of the board');
    if (!!name) {
        boards.push({
            //Este es otro tablero
            id: crypto.randomUUID(), //crypto.randomUUID(), sirve para generar un Id único
            name: name,
            items: [],
        });
    }
}

function stratDrag(evt, board, item) {
    evt.dataTransfer.setData('text/plain', JSON.stringify({ boardId: board.id, itemId: item.id })) //Esto me convierte un objeto en un String, lo convertimos para poder mandar la información de jun tablero a otro
}

function onDrop(evt, dest) { //evt, dest
    const { boardId, itemId } = JSON.parse(evt.dataTransfer.getData('text/plain'));
    console.log(boardId, itemId);
    const originBoard = boards.find(item => item.id == boardId);
    const originItem = originBoard.items.find(item => item.id == itemId);

    // console.log(originBoard.name, originItem.title);

    // Procedemos actualizar el tablero destino
    dest.items.push({ ... originItem});
    originBoard.items = originBoard.items.filter((item) => item != originItem);
}

</script>

<template>
    <nav>
        <ul>
            <li>
                <a href="#" @click.prevent="handleNewBoard">Create Board</a>
            </li>
        </ul>
    </nav>

    <div class="boards-container">
        <div class="boards">
            <div class="board" @drop="onDrop($event, board)" @dragover.prevent @dragenter.prevent v-for="board in boards"
                :key="board.id">
                <!-- Voy a renderizar cada tablero y a su vez, cada tablero necesita renderizar sus propios elementos -->
                <div>{{ board.name }}</div>
                <InputNew @on-new-item="(text) => handleNewItem(text, board)" /><!-- Aquí, llamo a la función y llamamos también a 'handleNewItem' en donde se le coloca el texto(text) y se le pasa la referencia de su tablero (board). 
                Por eso, en HandleNewItem se reciben 2 parámetros -->
                <div class="items">
                    <div class="item" :draggable="true" @dragstart="stratDrag($event, board, item)" v-for="item in board.items" :key="item.id">
                        {{ item.title }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
nav{
    background-color: black;
    margin-bottom: 10px;
}

nav ul{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

nav ul li a{
    display: block;
    padding: 10px;
    color: white;
    text-decoration: none;
}

.boards {
    display: flex;
    gap: 10px;
}

.board {
    background-color: #efefef;
    padding: 10px;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 5px;

}

.item {
    background-color: white;
    padding: 10px;
    box-sizing: border-box;
}
</style>
