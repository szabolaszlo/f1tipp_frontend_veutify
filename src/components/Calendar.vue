<template>
  <v-card
  >
    <v-card-title>Calendar</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-switch
              v-model="qualify"
              label="Időmérő"
              @change="filterEvents"
          ></v-switch>
        </v-col>
        <v-col>
          <v-switch
              v-model="race"
              label="Futam"
              @change="filterEvents"
          ></v-switch>
        </v-col>
        <v-col>
          <v-switch
              v-model="sprintQualify"
              label="Sprint"
          ></v-switch>
        </v-col>

        <v-col>
          <v-switch
              v-model="onlyRemaining"
              label="Csak hátralévők"
          ></v-switch>
        </v-col>
      </v-row>
      <v-data-table
          dense
          :headers="headers"
          :items="filteredEvents"
          :loading="! !!filteredEvents.length"
          :items-per-page=100
          :hide-default-header="true"
          :hide-default-footer="true"
          mobile-breakpoint="0"
      ></v-data-table>
    </v-card-text>
  </v-card>

</template>
<script>
import axios from "axios";

export default {
  name: 'Calendar',
  data() {
    return {
      qualify: true,
      race: true,
      sprintQualify: true,
      onlyRemaining: true,
      events: [],
      filteredEvents: [],
      headers: [
        {text: 'name', value: 'name'},
        {text: 'dateTime', value: 'dateTime'},
        {text: 'type', value: 'type'},
      ],
    }
  },
  mounted() {
    axios
        .get('http://127.0.0.1/api/events')
        .then(response => (this.events = response.data['hydra:member']))
  },
  watch: {
    events: function () {
      this.filteredEvents = this.events;
    }
  },
  methods: {
    filterEvents: function () {
      let events = this.events;
      let qualify = this.qualify;
      let race = this.race;
      let sprintQualify = this.sprintQualify;
      let filteredEvents = [];
      events.forEach(function (event) {
        if (qualify === true && event.type === 'qualify') {
          filteredEvents.push(event);
        }
        if (race === true && event.type === 'race') {
          filteredEvents.push(event);
        }
        if (sprintQualify === true && event.type === 'sprint_qualify') {
          filteredEvents.push(event);
        }
      });
      this.filteredEvents = filteredEvents;
    }
  }
}
</script>
