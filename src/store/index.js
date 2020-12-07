import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    frontEndData: {

    },
    serverData: {
      // Data received from server
      ProcessState: {},
      GameSetting: {}
    }
  },
  mutations: {
    setServerData: function (state, serverData) {
      state.serverData = serverData;
    }
  },
  actions: {
    fetchServerData: function (context) {
      axios.get('http://localhost:8088/dedi/', {
        // params: {
        //   // Attachment: true
        // }
      }).then(function (response) {
        console.log(response);
        context.commit('setServerData', response.data[0]);
      });
    },

    startServer: function (context, processId) {
      axios.post('http://localhost:8088/dedi/start', {
        ProcessId: processId, // Server id
        // EnableTrackRotation: true, // Don't know what this is here for
        // body: context.state.serverData.GameSetting
      }).catch(function (error) {
        console.error(JSON.stringify(error));
      }).then(function (response) {
        console.debug(response.data);
        context.dispatch('fetchServerData');
      });
    },
    stopServer: function (context, processId) {
      axios.post('http://localhost:8088/dedi/stop', {
        ProcessId: processId, // Server id
      }).catch(function (error) {
        console.error(error);
      }).then(function (response) {
        console.debug(response.data);
        context.dispatch('fetchServerData');
      })
    }
  },
  modules: {}
})