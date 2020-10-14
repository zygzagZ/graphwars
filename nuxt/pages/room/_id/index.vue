<template>
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>

import Room from '../../../classes/room'

const rooms = { 123: new Room() }

export default {
  validate ({ params }) {
    return !!rooms[params.id]
  },

  mounted () {
    this.$socket.emit('test', 'msg', (data) => {
      console.log('data: ', data)
    })
  }
}
</script>
