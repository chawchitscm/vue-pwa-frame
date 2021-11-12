<template>
  <v-card>
    <v-card-title>
      Profile
    </v-card-title>
    <v-container>
      <v-img
        width="200px"
        v-bind:src="profileImg"
        class="mb-5"
        ></v-img>
      <v-row no-gutters>
        <v-col md=2>
          <p>Name</p>
        </v-col>
        <v-col md=4>
          <p>{{ userName }}</p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col md=2>
          <p>Email</p>
        </v-col>
        <v-col md=4>
          <p>{{ userEmail }}</p>
        </v-col>
      </v-row>
      <v-btn
        depressed
        color="primary"
        :to="'/update/user/' + userId"
      >
        Edit Profile
      </v-btn>
    </v-container>
  </v-card>
</template>
<script src="../../services/user/profile.js">
</script>
