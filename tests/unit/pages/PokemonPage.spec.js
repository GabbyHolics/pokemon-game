import { shallowMount, mount } from '@vue/test-utils' // 
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage Component', () => {
    
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount( PokemonPage )
    })

    test('debe de hacer match con el snapshot', () => {        
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de llamar mixPokemonArray al montar', () => {
        
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' ) // espiar al pokemon page y el metodo 
        const wrapper = shallowMount( PokemonPage ) // volverlo a montar por el clico de las pruebas 
        
        expect( mixPokemonArraySpy ).toHaveBeenCalled()
    })

    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        
        const wrapper = shallowMount( PokemonPage, {
            data() { // se puede mandar literalmente la data y modificarlo como lo quiero usar en las pruebas 
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect( wrapper.html() ).toMatchSnapshot() // match con el snapshot

    })
    
    
    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {

        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        // encontrar el componente html 
        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')
        // verfificar que exista
        expect( picture.exists() ).toBeTruthy()
        expect( options.exists() ).toBeTruthy()

        
        expect( picture.attributes('pokemonid') ).toBe('5')
        expect( options.attributes('pokemons') ).toBeTruthy()

        
    })
    

    test('pruebas con checkAnswer', async() => {
        // cuando queremos hacer un cambio en el virtual dom tenemos que esperar (async await )
        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(5) //   con wrapper.vm podemos revisar los propiedades reactvas 

        expect( wrapper.find('h2').exists() ).toBeTruthy() // verificar que lo que se imprime
        expect( wrapper.vm.showPokemon ).toBe(true) //  reivisar que se muestre el pokemon
        expect( wrapper.find('h2').text() ).toBe(`Correcto, ${ pokemons[0].name }`) // revisar si es la correcta

        await wrapper.vm.checkAnswer(10)

        expect( wrapper.vm.message ).toBe(`Oops, era ${ pokemons[0].name }`) // revisar lque sea el incorrecto

    })
    

})