//En este archivo se realiza todo lo relacionado con el estado de nuestra app
import { reactive } from "vue"

export const store = reactive({
    params: { //En los parámetros se guarda la información, EJ: cuanto es de la cuenta, porcentaje de propina y la cantidad de personas en que se divide la cuenta
        total: 0,
        tip: 0, //Propina, este es un porcentaje
        people: 0,
        remaining: 0,

    },

    people: [], //Los métodos se pueden definir de 2 formas: 1. adentro (como está) y afuera, pero debe de hacerse referencia al mismo
});

export function getGrandTotal() { // es el precio a pagar sin la propina / tip
    return store.params.total * (store.params.tip / 100 + 1);
}

export function calculate() { // Cuánto le toca dar a cada persona para la cuenta con propina incluida 
    store.people = []; // tiene los objetos con la información de cada persona
    const total = store.params.total;
    const tip = store.params.tip;
    const people = store.params.people; // me dice cuantas personas van a pagar.
    const totalPerPerson = getGrandTotal() / people;
    //Asignamos valores, ya que sabemos cuánto le toca a cada persona
    store.params.remaining = getGrandTotal();
    //Generamos objetos para cada persona que necesita pagar
    for (let i = 0; i < people; i++) {
        store.people.push({
            id: crypto.randomUUID(),
            numberOfPerson: i + 1,
            totalPerPerson,
            paid: false,
        });
    }
    calculateRemaining();
}


//Mandamos a llamar nuestra función de calcular el restante
function calculateRemaining() {
    const missingToPay = store.people.filter(item => !item.paid) // esto me regresa un arreglo de objetos
    const remaining = missingToPay.reduce((acc, item) => (acc += item.totalPerPerson), 0) //Esto me devuelve el total de la suma que falta por pagar.  
    //reduce: Esto es un arreglo

    store.params.remaining = remaining;
}

export function pay(id, paid){
    const person = store.people.find(item => item.id == id);
    if (person) {
        person.paid = paid;
        calculateRemaining();
    } //Sacamos la referencia 
}