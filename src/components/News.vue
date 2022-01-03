<template>
  <v-card
  >
    <v-card-title>{{ $t('news') }}</v-card-title>
    <v-card-text>

      <v-row v-for="feed in feeds" v-bind:key="feed.id">
        <v-card>
              <v-card-title>{{ feed.title }}</v-card-title>
              <v-card-text>
                <div v-html="feed.description"></div>
                <v-avatar
                    tile
                >
                  <v-img
                      :src="feed.image"></v-img>
                </v-avatar>
              </v-card-text>
        </v-card>
      </v-row>
    </v-card-text>
  </v-card>

</template>
<script>

import axios from "axios";

export default {
  name: 'News',
  data() {
    return {
      errorMessage: '',
      loading: true,
      feeds: [],
    }
  },
  mounted() {
    axios
        .get('/feeds')
        .then(response => {
          this.feeds = response.data['hydra:member'];
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.errorMessage = error.message;
        })
  }
}
</script>
