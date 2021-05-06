<template>
  <div class="item-single container">
    <NuxtLink :to="prev.slug.current" v-if="index!=0" class="prev-btn">
      <Left />
    </NuxtLink>
    <div class="item-index">
      <NuxtLink class="group-label"
      :to="!item.edition?editions[0].slug.current:auction[0].slug.current"
      v-text="!item.edition?'AUCTION':'EDITIONS'"
      />
      {{index+1}} / {{count}}
    </div>
    <NuxtLink :to="next.slug.current" v-if="next!=undefined" class="next-btn">
      <Right />
    </NuxtLink>
    <div class="image-wrapper">
      <a :href="item.link" target="_blank">
        <img
          :src="$urlFor(item.image).size(960)"
          :alt="item.artist.title + ' - ' + item.title"
          :srcset="`${$urlFor(item.image).size(2880)} 2880w,
          ${$urlFor(item.image).size(1920)} 1920w,
          ${$urlFor(item.image).size(1024)} 1024w,
          ${$urlFor(item.image).size(960)} 960w,
          ${$urlFor(item.image).size(720)} 720w,
          ${$urlFor(item.image).size(480)} 480w,
          ${$urlFor(item.image).size(270)} 270w`"
          sizes="(min-width:768px) 90vw, 100vmin"
          loading="lazy"
        />
      </a>
    </div>
    <SanityContent class="caption" :blocks="item.caption" />
    <a class="bid-button" :href="item.link" target="_blank" v-text="'BID NOW'" />
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { mapState } from 'vuex'

export default {
  methods: {
    toUrl(url) {
      window.location.href = url
    }
  },
  async asyncData({ store, params }) {
    const items = store.state.items
    const item = items.find(x => x.slug.current === params.slug)

    const group = !item.edition ? store.state.auction : store.state.editions
    const index = group.findIndex(x => x.slug.current === params.slug)
    const next = group[index+1]
    const prev = group[index-1]
    const count = group.length
    return { item, index, count, next, prev }
  },
  computed: {
    ...mapState(['auction', 'editions'])
  }
  }
</script>

<style>
.item-single {
  width: 100%;
  min-height: 100vh;
}
.image-wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content:center;
  position: fixed;
}
.image-wrapper a {
  display:block;
}
.item-single img {
  max-height:90vh;
}
.item-index {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index:1;
}
.group-label {
  cursor:pointer;
  margin-right:1rem;
}
.caption {
  position: fixed;
  bottom:1.5rem;
  left:1.5rem;
  white-space: pre;
  text-align: left;
}
.bid-button {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  padding: 0.5rem 2rem;
  border: 2px solid #fff;
}
.next-btn, .prev-btn {
  cursor:pointer;
  position: fixed;
  width: 10vw;
  height:33vh;
  top:50%;
  display:block;
  transform:translateY(-50%);
  z-index:1;
}
.next-btn svg, .prev-btn svg {
  width:100%;
  height:100%;
}
.prev-btn {
  left: 0.25rem;
}
.next-btn {
  right:0.25rem;
}
</style>
