import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      filteredPokemon: [],
      nameInput: '',
      typeInput: ''
    }
  }

  componentDidMount() {
    this.fetchPokemon()
  }

  fetchPokemon() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(json => this.setState({ pokemon: json, filteredPokemon: json }))
  }

  addPokemon = pokemon => {
    this.setState({pokemon: [...this.state.pokemon, pokemon], filteredPokemon: [...this.state.filteredPokemon, pokemon]})
  }

  //)

  handleChange = (ev, event) => {
    if (event.name === 'nameInput') {
      const filteredPokemon = this.state.pokemon.filter(element => {
        return element.name.includes(event.value)
      })
      this.setState({ [event.name]: event.value, filteredPokemon })
    }
    else {
      const filteredPokemon = this.state.pokemon.filter(element => {
          return element.types[0].includes(event.value)
        })
      this.setState({ [event.name]: event.value, filteredPokemon})
    }
  }



  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <label>Name Search</label>
        <Search
          onSearchChange={_.debounce(this.handleChange, 500)}
          showNoResults={false}
          name="nameInput"
          value={this.state.nameInput}
        />
        <br />
        <label>Type Search</label>
        <Search
          onSearchChange={_.debounce(this.handleChange, 500)}
          showNoResults={false}
          name="typeInput"
          value={this.state.typeInput}
        />
        <br />
        <PokemonCollection pokemon={this.state.filteredPokemon} />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
      </div>
    );
  }
}

export default PokemonPage
