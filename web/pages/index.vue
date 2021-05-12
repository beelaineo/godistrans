<template>
  <div class="container">
    <main>
      <h2>In Memoriam</h2>
      <h1 class="title">
        Sophie Xeon
      </h1>
      <SanityContent class="intro" :blocks="home.lead_text" />
    </main>
    <aside>
      <NuxtLink :to="auction[0].slug.current" class="auctions-link" v-text="'AUCTION'" />
      <NuxtLink :to="editions[0].slug.current" class="editions-link" v-text="'EDITIONS'" />
      <div class="artists-list">
        <ul>
          <li v-for="item in items" :key="item._key">
             <NuxtLink :to="item.slug.current" v-text="item.artist.title" />
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
// import { groq } from '@nuxtjs/sanity'
import { mapState } from 'vuex'
// const query = groq`{
//   "items": *[_type == "item"] {
//     ...,
//     artist->{slug,sort_name,title}
//   }
// }`

export default {
  // asyncData({ $sanity }) {
  //   return $sanity.fetch(query)
  // },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  computed: {
    ...mapState(['home', 'items', 'auction', 'editions'])
  },
  created() {
    console.log(this.auction)
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2em;
}
main {
  flex: 1;
}
main h1, main h2 {
  text-transform: uppercase;
  padding: 0rem 2rem 0.25rem 0rem;
  margin:0px;
}
main h1 {
  font-size: 54px;
}
main h2 {
  font-size: 24px;
}
main .intro {
  padding: 2rem 2rem 2rem 0rem;
  text-align: justify;
  max-width: 600px;
  margin: 0 auto;
}
main .intro p {
  margin-bottom:1rem;
}
main .intro a {
  text-decoration:underline;
}
aside {
  width: 40%;
  height:calc(100vh - 4em);
  display: flex;
  flex-direction: column;
}
.auctions-link, .editions-link, .artists-list {
  width: 100%;
  border: 2px solid #fff;
  font-size: 54px;
  margin: 0.5rem 0;
  padding:0.5rem;
}
.auctions-link, .editions-link {
  display:block;
}
.artists-list {
  font-size: 24px;
  padding: 3rem;
  flex:1;
}
ul {
  list-style: none;
  padding:0;
  display: flex;
  height:100%;
  flex-direction:column;
  justify-content: space-evenly;
}
li {
  display:block;
}

@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    padding-top: 6rem;
  }
  main h1 {
    font-size: 36px;
  }
  main h1, main h2 {
    padding: 0rem 0rem 0.25rem 0rem;
  }
  main .intro {
    padding: 1rem 0rem;
  }
  aside {
    width:100%;
    height: unset;
  }
  .auctions-link, .editions-link {
    font-size: 36px;
  }
  .artists-list {
    padding: 2rem;
    height: calc(100vh - 6rem);
  }
  .artists-list li {
    margin:0.25rem 0;
  }
}
</style>
