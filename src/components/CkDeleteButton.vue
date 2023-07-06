<template>
  <!-- If the user has not yet confirmed deletion -->
  <div v-if="!form.$submitting">
    <!-- If the user has not yet clicked the delete button -->
    <gov-button v-if="!showConfirm" @click="onShowConfirmation" error
      >Delete {{ resource }}</gov-button
    >

    <!-- If the user has clicked the delete button, they must then confirm -->
    <template v-else>
      <gov-error-summary title="This action will be logged">
        <gov-body>
          Deleting this {{ resource }} will also delete all associated data. Are
          you sure you want to delete this {{ resource }}? This action is
          irreversible.
        </gov-body>

        <gov-button @click="onDelete" error>Confirm deletion</gov-button
        >&nbsp;<!--
     --><gov-button @click="onCancel">Cancel</gov-button>
      </gov-error-summary>
    </template>
  </div>

  <gov-button v-else disabled error>Deleting {{ resource }}...</gov-button>
</template>

<script>
import Form from '@/classes/Form'

export default {
  name: 'CkDeleteButton',
  props: {
    resource: {
      required: true,
      type: String,
    },
    endpoint: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      form: new Form({}),
      showConfirm: false,
    }
  },
  methods: {
    onShowConfirmation() {
      this.showConfirm = true
    },
    async onDelete() {
      await this.form.delete(this.endpoint)
      this.$emit('deleted')
    },
    onCancel() {
      this.showConfirm = false
    },
  },
}
</script>
