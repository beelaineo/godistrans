<template>
  <div class="item-single container">
    <div class="pagination">
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
    </div>
    <div class="image-wrapper">
      <a :href="begin<=now?item.link:null" target="_blank">
        <img
          :class="item.slug.current=='puppies-puppies-oh-my-god-i-love-you'?'puppies':''"
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
        />

      </a>
    </div>
    <SanityContent class="caption" :blocks="item.caption" />
    <a class="bid-button" :href="begin<=now?item.link:null" target="_blank" v-text="formatLinkText(item.price, item.edition)" />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { groq } from '@nuxtjs/sanity'
import { mapState } from 'vuex'

export default {
  methods: {
    toUrl(url) {
      window.location.href = url
    },
    formatLinkText(price, edition) {
      if (this.begin <= this.now && !this.finished) {
        if (!edition) {
          return 'BID NOW'
        } else {
          return 'BUY NOW'
        }
      } else if (this.now <= this.end) {
        if (!edition) {
          return 'Starting bid: ' + price
        } else {
          return price
        }
      } else {
        return 'ITEM LISTING'
      }
    }
  },
  data() {
    return {
      now: DateTime.local(),
      tick: null,
      // begin: DateTime.local().plus({ seconds: 5 }),
      // end: DateTime.local().plus({ seconds: 10 })
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
  head() {
    return {
      title: this.item.artist.title + ' - ' + this.item.title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.item.artist.title + ' - ' + this.item.title,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.$urlFor(this.item.image).size(1200)}`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://godistrans.auction/${this.item.slug.current}`,
        },     
      ]
    }
  },
  computed: {
    ...mapState(['home', 'auction', 'editions']),
    begin() {
      return DateTime.fromISO(this.home.begin)
    },
    end() {
      return DateTime.fromISO(this.home.end)
    },
    finished() {
      return this.now >= this.end
    }
  },
  mounted() {
    this.tick = setInterval(() => {
      this.now = DateTime.local()
    }, 100)
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
  max-height:80vh;
}
.item-single img.isLoading {
  width: 20vmax;
  height: 20vmax;
}
.item-single img.isLoaded {
  width:unset;
  height:unset;
}
.item-index {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index:1;
  text-shadow: 0px 0px 2px #000;
}
.group-label {
  cursor:pointer;
  margin-right:1rem;
  text-shadow: 0px 0px 2px #000;
}
.caption {
  position: fixed;
  bottom:1.5rem;
  left:1.5rem;
  white-space: pre;
  text-align: left;
  text-shadow: 0px 0px 2px #000;
}
.bid-button {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  padding: 0.5rem 2rem;
  border: 2px solid #fff;
  text-shadow: 0px 0px 2px #000;
  box-shadow: 0px 0px 2px #000;
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

@media screen and (max-width:768px) {
  .item-single.container {
    width:auto;
    min-height:unset;
    display: block;
    padding:0;
    margin-top:6rem;
  }
  .item-single .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: auto;
    position: static;
    top:7rem;
    margin-bottom:1rem;
    margin:0 2rem 1rem 2rem;
  }
  .item-index {
    display: flex;
    position: static;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .image-wrapper {
    height: auto;
    margin: 2rem 1rem;
    margin-bottom: 0.5rem;
    width: calc(100% - 2rem);
    display: block;
    position: static;
  }
  .item-single .image-wrapper img {
    max-height:unset;
    max-width:100%;
  }
  .item-single img.isLoading {
    width: 50vmax;
    height: 50vmax;
  }
  .item-index .group-label {
    margin-right:0px;
  }
  .item-single .caption {
    position:static;
    display:block;
    width: calc(100% - 2rem);
    margin:1rem;
  }
  .item-single .bid-button {
    display:block;
    position:static;
    margin: 2rem 1rem;
  }
  .next-btn, .prev-btn {
    cursor:pointer;
    position: static;
    width: 48px;
    height:48px;
    /* top:6.5rem; */
    display:block;
    transform:translateY(0);
    z-index:1;
  }
}
</style>
