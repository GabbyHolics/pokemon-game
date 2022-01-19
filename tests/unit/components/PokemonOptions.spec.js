import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";

import { pokemons } from "../mocks/pokemons.mock"; // mock de la peticion 

describe("PokemonOptions Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons
      }
    });
  });

  test('debe de hacer match con el snapshot', () => {    // toMatchInlineSnapshot
    expect(wrapper.html()).toMatchSnapshot();
  });


  test('debe de mostrar las 4 opciones correctamente', () => {
    
    const liTags = wrapper.findAll( 'li' ) // buscar los li
    expect( liTags.length ).toBe(4) // esoperar que sean 4

    expect( liTags[0].text() ).toBe('pikachu') // evaluar cada li 
    expect( liTags[1].text() ).toBe('charmander')
    expect( liTags[2].text() ).toBe('venusaur')
    expect( liTags[3].text() ).toBe('mew')

  })


  test('debe de emitir "selection" con sus respectivos parámetros al hacer click', () => {  // evento 
    
    const [ li1, li2, li3, li4 ] = wrapper.findAll('li')
    // darle click 
    li1.trigger('click')
    li2.trigger('click')
    li3.trigger('click')
    li4.trigger('click')
    // console.log(wrapper.emitted('selectionPokemon'))
    // emitir evento  selection
    expect( wrapper.emitted('selection').length ).toBe(4) // que se haya emitido las 4 veces 
    expect( wrapper.emitted('selection')[0] ).toEqual([5]) // que se hatya emitido con el valor dado  
    expect( wrapper.emitted('selection')[1] ).toEqual([10])
    expect( wrapper.emitted('selection')[2] ).toEqual([15])
    expect( wrapper.emitted('selection')[3] ).toEqual([20])
    
  })
  
  


});