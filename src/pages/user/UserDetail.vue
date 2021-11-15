<template>
  <v-card>
    <v-card-title>
      User Detail
    </v-card-title>
    <v-container>
      <v-img
        width="200px"
        v-bind:src="profile_path"
        class="mb-5"
        ></v-img>
      <v-row no-gutters>
        <v-col md=2>
          <p>Name</p>
        </v-col>
        <v-col md=4>
          <p>{{ name }}</p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col md=2>
          <p>Email</p>
        </v-col>
        <v-col md=4>
          <p>{{ email }}</p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col md=2>
          <p>Phone</p>
        </v-col>
        <v-col md=4>
          <p>{{ phone }}</p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col md=2>
          <p>Address</p>
        </v-col>
        <v-col md=4>
          <p>{{ address }}</p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col md=2>
          <p>Date of Birth</p>
        </v-col>
        <v-col md=4>
          <p>{{ dob }}</p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script src="../../services/user/user-detail.js">
</script>
