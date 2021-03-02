<template>
  <div class="scrollWrapper">
    <slot></slot>
    <div id="observer" v-if="ioSupport" ref="observerElem"></div>
    <div class="loading" v-if="processing">
      <img src="~assets/images/Loader.gif" alt="">
    </div>
    <div class="loadMore" v-if="pause" @click="loadMoreEvent">Load More</div>
  </div>
</template>
<script>
export default {
  name: 'ScrollWrapper',
  props: {
    processing: {
      type: Boolean,
      default () {
        return true
      }
    },
    isOver: {
      type: Boolean,
      default () {
        return false
      }
    },
    isError: {
      type: Boolean,
      default () {
        return false
      }
    },
    isInfinite: {
      type: Boolean,
      default () {
        return true
      }
    }

  },
  data () {
    return {
      windowHeight: null,
      ioSupport: true,
      observer: null,
      ticking: false,
      lastScrollPos: 0,
      currentPage: 0,
      maxPagecount: 5,
      pause: false
    }
  },
  mounted () {
    if (process.client) {
      this.windowHeight = window.innerHeight
    }
    this.ioSupport = ('IntersectionObserver' in window) && ('IntersectionObserverEntry' in Window) && ('intersectionRatio' in window.IntersectionObserverEntry.prototype)
    if (this.ioSupport) {
      this.ioEvent()
      console.log('io events')
    } else {
      this.addScrollEvent()
      console.log('scrollEvents')
    }
  },
  methods: {
    ioEvent () {
      const options = {}
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          this.toFetchData()
        }
      }, options)
      this.observer.observe(this.$refs.observerElem)
    },
    addScrollEvent () {
      window.addEventListener('scroll', this.onScroll.bind(this))
    },
    onScroll () {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.onScrollReached()
          this.ticking = false
        })
      }
      this.ticking = true
    },
    onScrollReached () {
      const currentPos = window.scrollY
      if (currentPos >= Math.round((document.body.scrollHeight - this.windowHeight) * 0.6)) {
        if (currentPos > this.lastScrollPos) {
          this.toFetchData()
        }
        this.lastScrollPos = currentPos
      }
    },
    toFetchData () {
      if (!this.processing && !this.isOver && !this.isError && !this.pause) {
        this.$emit('toFetch')
      }
    },
    loadMoreEvent () {
      this.pause = false
      this.currentPage = 0
      this.toFetchData()
    }
  },
  watch: {
    processing (bool) {
      if (!bool) {
        this.currentPage += 1
      }
    },
    currentPage () {
      if (this.currentPage === this.maxPagecount && this.isInfinite) {
        this.pause = true
      }
    }
  }
}
</script>
