<template>
<div class="status">
  <NuxtLink to="/">
  <h3 class="title" v-text="home.title" />
  </NuxtLink>
  <p>
    <span @click="$router.push(auction[0].slug.current)" :class="['indicator']" />
    <span @click="$router.push(auction[0].slug.current)" v-if="begin <= now && !finished" class="live" v-text="'LIVE'"/>
    {{ display }}
  </p>
</div>
</template>

<style>
.status {
  position: fixed;
  left: 1.5rem;
  top:1.5rem;
  z-index:1;
  text-shadow: 0px 0px 2px #000;
}
.status p {
  line-height:1.5;
}
.status .title {
  text-transform: uppercase;
}
.indicator {
  display:inline-block;
  border: 1px solid #fff;
  border-radius:100%;
  height:14px;
  width:14px;
  box-sizing: border-box;
  margin-top:8px;
  margin-right:8px;
  line-height:1.3;
  cursor:pointer;
  box-shadow: 0px 0px 2px #000;
}
.indicator.is-live {
  border-color: #61FF00;
}
span.live {
  color: #61FF00;
  margin-left:-6px;
  animation: blink 1s infinite;
  cursor:pointer;
}
@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@media screen and (max-width: 768px) {
  .status {
    position:absolute;
  }
}
</style>

<script>
import { DateTime, Duration } from 'luxon'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      now: DateTime.local(),
      // begin: DateTime.local().plus({ seconds: 5 }),
      // end: DateTime.local().plus({ seconds: 10 }),
      tick: null
    }
  },
  mounted() {
    this.tick = setInterval(() => {
      this.now = DateTime.local()
    }, 100)
  },
  computed: {
    ...mapState(['home', 'auction']),
    begin() {
      return DateTime.fromISO(this.home.begin)
    },
    end() {
      return DateTime.fromISO(this.home.end)
    },
    untilBegin() {
      return this.begin.diff(this.now).toObject()
    },
    untilEnd() {
      return this.end.diff(this.now).toObject()
    },
    finished() {
      return this.now >= this.end
    },
    display() {
      let countdown = ''
      let output = ''
      let format = "d'd, 'hh'h, 'mm'm, 'ss's, 'SSS'ms'"

      if (this.now <= this.end) {
        // countdown to auction end
        countdown = Duration.fromObject(this.untilEnd).toFormat(format)
        output = 'Ending in ' + countdown
      } else {
        // auction ended at ____ on _____
        // OR
        // This auction took place ...
        let ended = this.end.toLocaleString(DateTime.DATETIME_FULL)
        output = 'Auction ended at ' + ended
      }
      return output
    }
  },
  watch: {
    now() {
      if (this.finished) {
        clearInterval(this.tick)
      }
    }
  }
}
</script>
