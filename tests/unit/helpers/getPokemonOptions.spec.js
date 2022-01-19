
  
import getPokemonOptions, { getPokemons, getPokemonNames } from '@/helpers/getPokemonOptions'

describe('getPokemonOptions helpers', () => {
    
    test('debe de regresar un arreglo de numeros', () => {
        // ejecutar la funcion 
        const pokemons = getPokemons()
        // evaluar cuanto nos regresa el arreglo 
        expect( pokemons.length ).toBe(650)
        //verificar que la primera posicion sea  1
        // que sea ordenando como yo quiero 
        expect( pokemons[0] ).toBe(1)
        expect( pokemons[500] ).toBe(501)
        expect( pokemons[649] ).toBe(650)

    })

    test('debe de retornar un arreglo de 4 elementos con nombres de pokemons', async() => {
        
        const pokemons = await getPokemonNames([1,2,3,4])

        console.log(pokemons)
        // para comparar un objeto con otro objeto ToStrictEqual
       
        expect( pokemons ).toStrictEqual([
            { name: 'bulbasaur', id: 1 },
            { name: 'ivysaur', id: 2 },
            { name: 'venusaur', id: 3 },
            { name: 'charmander', id: 4 }
        ])


    })

    test('getPokemonOptions debe de retornar un arreglo mezclado', async() => {
        

        const pokemons = await getPokemonOptions()

        console.log(pokemons)
        
        expect( pokemons.length ).toBe(4)
       // Evaluar sea siempre se cuatro 
        expect( pokemons ).toEqual([
            { 
                name: expect.any(String), // evaluar que sea un string
                id:  expect.any(Number) // evaluar que sea un numero 
            },
            { 
                name: expect.any(String),
                id:  expect.any(Number)
            },
            { 
                name: expect.any(String),
                id:  expect.any(Number)
            },
            { 
                name: expect.any(String),
                id:  expect.any(Number)
            }
        ])

    })
    
    
    

})