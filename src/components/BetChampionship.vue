<template>
  <v-card
  >
    <v-card-title>{{ $t('betChampionship') }}</v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="users"
          :loading="! !!users.length"
          :items-per-page=100
          :hide-default-header="true"
          :hide-default-footer="true"
          :options="{
            sortBy: ['alternativePointSummary'],
            sortDesc: [true]
          }"
          mobile-breakpoint="0"
      >
        <template slot="item" slot-scope="props">
          <tr>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.alternativePointSummary }}</td>
            <td>{{ props.item.alternativePointDifference }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

</template>
<script>

import axios from "axios";

export default {
  name: 'BetChampionship',
  data() {
    return {
      users: [],
      headers: [
        {text: 'name', value: 'name'},
        {text: 'alternativePointSummary', value: 'alternativePointSummary'},
        {text: 'alternativePointDifference', value: 'alternativePointDifference'},
      ],
    }
  },
  mounted() {
    axios
        .get('http://127.0.0.1/api/users')
        .then(response => (this.users = this.filterUsers(response.data['hydra:member'])));
  },
  methods: {
    filterUsers: function (users) {
      let filteredUsers = [];
      users.forEach(function (user) {
        if (user.isAlterChamps === true) {
          filteredUsers.push(user)
        }
      });
      return filteredUsers;
    }
  }
}
</script>
