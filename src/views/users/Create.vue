<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add User" />

    <gov-back-link :to="{ name: 'users-index' }">Back to users</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">Users</gov-heading>

          <gov-heading size="m">Add user</gov-heading>

          <gov-body
            >Create users to be able to acces the back-end of the Connected
            Kingston service (deciding their permissions in what they have
            access to)</gov-body
          >

          <user-form
            :errors="form.$errors"
            :first_name.sync="form.first_name"
            :last_name.sync="form.last_name"
            :email.sync="form.email"
            :phone.sync="form.phone"
            :password.sync="form.password"
            :roles.sync="form.roles"
            @clear="form.$errors.clear($event)"
          />

          <gov-section-break size="l" />

          <gov-button v-if="form.$submitting" disabled type="submit"
            >Creating...</gov-button
          >
          <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
          <ck-submit-error v-if="form.$errors.any()" />
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from '@/classes/Form'
import UserForm from '@/views/users/forms/UserForm'

export default {
  name: 'CreateUser',
  components: { UserForm },
  data() {
    return {
      form: new Form({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        roles: [],
      }),
    }
  },
  methods: {
    async onSubmit() {
      const data = await this.form.post('/users', (config, data) => {
        // Strip spaces from the phone number.
        data.phone = data.phone.replace(/\s/g, '')

        data.roles.forEach(role => {
          switch (role.role) {
            // Delete the organisation and service IDs instead of sending null values.
            case 'Super Admin':
            case 'Global Admin':
              delete role.organisation_id
              delete role.service_id
              break
            case 'Organisation Admin':
              delete role.service_id
              break
          }
        })
      })

      this.$router.push({ name: 'users-show', params: { user: data.data.id } })
    },
  },
}
</script>
