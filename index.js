const baseUrl = 'https://pokeapi.co/api/v2/'

                //DATOS POKEMON 

// CREAR CARTA

function crearCarta(pokemon){
    let article = document.createElement('article');
    article.classList.add('carta');
    article.innerHTML = `
    <img src="${pokemon.image}" alt="${pokemon.name}">
    <h3>${pokemon.name}</h3>
    <ul>
      <li>Altura: ${pokemon.height}</li>
      <li>Peso: ${pokemon.weight}</li>
      <li>ID: ${pokemon.id}</li>
    </ul>
    `
    document.getElementById('render').appendChild(article);
}

// IMPRIMIR DATOS POR CADA POKEMÓN 

async function obtenerPokemon(nombre){
    let respuestaApi = await fetch(`${baseUrl}pokemon/${nombre}`)
    let pokemon = await respuestaApi.json()
    let propiedadesPokemon = {
        name: pokemon.name,
        height: pokemon.height,
        id: pokemon.id,
        weight: pokemon.weight,
        image: pokemon.sprites.front_default
    }
    crearCarta(propiedadesPokemon);
}


//GUARDAR LISTA DE TODOS LOS POKEMON 

async function obtenerListado(){

    let respuestaApi = await fetch(`${baseUrl}pokemon`)
    let listadoPokemons = await respuestaApi.json()
    console.log('Informacion de obtenerListado:',listadoPokemons.results);
    
    for (let index = 0; index < listadoPokemons.results.length; index++) {
        await obtenerPokemon(listadoPokemons.results[index].name)
    }
} 



obtenerListado()


                    // BUSQUEDA DE POKÉMON 

// EVENTO CLICK BUSCAR

document.getElementById('botonPokemon').addEventListener('click', buscarPokemon);

//LIMPIAR DATOS IMPRESOS 

function lienzoLimpio() {
    let limpiarTodos = document.getElementById('render');
    limpiarTodos.innerHTML = ''; 
}

//CREAR BOTÓN REGRESAR

/* function regresar(){
    let section= document.createElement('section');
    section.classList.add('botonRegresar');
    section.innerHTML = '<button>Regresar</button>'
    document.getElementById('regresar').appendChild(section);
    
} */

// IMPRIMIR DATOS DEL POKEMÓN BUSCADO 

async function buscarPokemon(event){
    event.preventDefault();

    try {
        
        lienzoLimpio();
        let nombrePokemon = document.getElementById('inputPokemon').value.toLowerCase();
        let respuestaApi = await fetch(`${baseUrl}pokemon/${nombrePokemon}`);
        let pokemon = await respuestaApi.json();


        let propiedadesPokemon = {
            name: pokemon.name,
            height: pokemon.height,
            id: pokemon.id,
            weight: pokemon.weight,
            image: pokemon.sprites.front_default
        };
        crearCarta(propiedadesPokemon);
        regresar();

    } catch (error) {
        console.error(error);
    }
}


                    // REGRESAR A DATOS POKEMON 

// EVENTO CLICK REGRESAR

document.getElementById('botonRegresar').addEventListener('click', function(){
    limpioLienzo();
    obtenerListado();

});
