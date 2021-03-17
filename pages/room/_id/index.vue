<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Graphwars
        </v-card-title>
        <v-card-text>
          <v-sheet
            ref="container"
            v-resize="onResize"
            class="graph-canvas"
          />
          <v-text-field
            v-model="fn"
            label="Enter your function equation here"
            solo-inverted
            hint="For example x^2"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import Room from '../../../classes/room'

const rooms = { 123: new Room() }

const functionPlot = process.client && require('function-plot').default

export default {
  validate ({ params }) {
    return !!rooms[params.id]
  },
  data () {
    return {
      fn: 'x^2/99',
      graphs: []
    }
  },
  sockets: {
  },
  watch: {
    fn () {
      try {
        this.drawGraph()
      } catch (e) {

      }
    }
  },
  mounted () {
    this.drawGraph()
  },
  methods: {
    addGraph (fn, playerX) {
      const graph = {
        color: 'rgba(128, 128, 128, 0.5)',
        fn,
        skipTip: true,
        animationStart: Date.now(),
        range: [playerX, playerX]
      }
      this.graphs.push(graph)
    },
    drawGraph () {
      const container = this.$refs.container.$el
      const size = {
        height: container.clientWidth / 25 * 15 + 40,
        width: container.clientWidth
      }

      const parameters = {
        target: '.graph-canvas',
        grid: false,
        disableZoom: true,
        yAxis: { domain: [-15, 15] },
        xAxis: { domain: [-25, 25] },
        xDomain: [],
        yDomain: [-1, 0, 1],
        data: this.graphs,
        ...size
      }

      functionPlot(parameters)
    },
    onResize () {
      this.drawGraph()
    }
  }
}
</script>

<style scoped>
</style>
