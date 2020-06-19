<template>
  <div>

    <div class="modal fade" data-backdrop="static" data-keyboard="false" :id="modalID" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ modalTitle }}
            </h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="modalBody"></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-sm" :class="modalConfirmButtonClass"
                    data-dismiss="modal" @click="emitModalConfirmation">{{ $t('modal.modalConfirm') }}</button>
            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">{{ $t('modal.modalCancel') }}</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      modalID: String,
      modalTitle: String,
      modalType: String,
      modalConfirmButtonClass: String,
      customParameters: Object,
    },
    methods: {
      emitModalConfirmation: function () {
        this.$emit('modalConfirmation', this.modalType, this.customParameters)
      },
    },
  }
</script>

<style scoped>

</style>
