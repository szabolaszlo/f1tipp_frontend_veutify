<template>
  <v-card
  >
    <v-card-title>{{ $t('calendar') }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
            v-for="(event, index) in eventTypes"
            :key="index">
          <v-switch
              v-model="event.state"
              :label="$t(event.translatedName)"
              @change="filterEvents"
          ></v-switch>
        </v-col>
        <v-col>
          <v-switch
              v-model="onlyRemaining"
              label="Csak hátralévők"
              @change="filterEvents"
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
          mobile-breakpoint="0">
        <template slot="item" slot-scope="props">
          <tr>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.dateTime.toLocaleDateString() }} {{ props.item.dateTime.toLocaleTimeString() }}</td>
            <td>{{ $t(props.item.type) }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

</template>
<script>

import axios from "axios";
import EventType from "../classes/CalendarEventType";

export default {
  name: 'Calendar',
  data() {
    return {
      onlyRemaining: true,
      eventTypes: [
        new EventType('qualify', 'qualify', true),
        new EventType('race', 'race', true),
        new EventType('sprint_qualify', 'sprintQualify', true)
      ],
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
      this.filterEvents();
    }
  },
  methods: {
    filterEvents: function () {
      let events = this.events;
      let eventTypes = this.eventTypes;
      let onlyRemaining = this.onlyRemaining;
      let filteredEvents = [];
      events.forEach(function (event) {
        event.dateTime = new Date(event.dateTime);
        if ((onlyRemaining && event.dateTime > new Date()) || !onlyRemaining) {
          eventTypes.forEach(function (eventType) {
            if (event.type === eventType.id && eventType.state) {
              filteredEvents.push(event)
            }
          })
        }
      });
      this.filteredEvents = filteredEvents;
    }
  }
}
</script>
