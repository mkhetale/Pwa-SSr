<template>
  <transition appear name="modalW">
    <div class="modal" @click="close" v-if="show" role="dialog" >
      <div class="modal-dialog" role="document" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'ModalWrapper',
  props: ['show', 'onClose'],
  mounted () {
    document.addEventListener('keydown', (e) => {
      if (this.show && e.keyCode === 27) {
        this.onClose()
      }
    })
  },
  methods: {
    close () {
      this.onClose()
    }
  }
}
</script>
<style >
.modal{
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: block;
}
.modalW-enter-active, .modalW-leave-active {
  transition: all .2s ease-in
}
.modalW-enter, .modalW-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
