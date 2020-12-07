<template>
  <div>
    <div v-if="serverIsRunning">
      <div>
        Server is running!
      </div>
      <div
        class=""
        @click="$store.dispatch('stopServer', processId)"
      >
        Stop server
      </div>
    </div>
    <div
      v-else
      class=""
      @click="$store.dispatch('startServer', processId)"
    >
      Start server
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  beforeMount () {
    this.$store.dispatch('fetchServerData')
  },
  computed: mapState({
    processId: state => state.serverData.GameSetting.Id,
    serverIsRunning: state => state.serverData.ProcessState.Running
  })
}
</script>
