import { groq } from '@nuxtjs/sanity'

export const state = () => ({
  home: null,
  items: [],
  auction: [],
  editions: []
})

export const mutations = {
  SET_HOME(state, content){
    state.home = content
  },
  SET_ITEMS(state, content){
    state.items = content
  },
  SET_AUCTION(state, content){
    state.auction = content
  },
  SET_EDITIONS(state, content){
    state.editions = content
  }
}

export const actions = {
  async nuxtServerInit ({commit, context, error, req}) {
		// sanity
    const query = groq`{
      "home": *[_type == "home"][0],
      "items": *[_type == "item"] {
        ...,
        artist->{slug,sort_name,title}
      }
    }`

		const result = await this.$sanity.fetch(query)
    const items = result.items.sort((a, b) => (a.artist.sort_name > b.artist.sort_name) ? 1 : -1)

		commit('SET_HOME', result.home)
    commit('SET_ITEMS', items)
    commit('SET_EDITIONS', items.filter(item => item.edition == true))
    commit('SET_AUCTION', items.filter(item => !item.edition))
  }
}
