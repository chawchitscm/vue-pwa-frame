<template>
  <v-card>
    <v-card-title>
      User list
      <v-spacer></v-spacer>
      <v-form ref="form">
        <v-row class="filter-bar">
          <v-col md="2.5">
            <v-text-field 
              label="Search keyword" 
              hide-details="auto"
              v-model="keyword"
            ></v-text-field>
          </v-col>
          <v-btn
            class="post-list-btn mr-4"
            color="primary"
            @click="filterUsers"
          >Filter</v-btn>
          <v-btn
            class="post-list-btn mr-4"
            color="primary"
            to="/create/user"
          >Create</v-btn>
        </v-row>
      </v-form>
    </v-card-title>
    <v-container>
      <v-data-table :headers="headers" :items="showList">
        <template v-slot:[`item.name`]="{ item }">
          <a v-if="item.name" :href="'/user/' + item.id">{{item.name}}</a>
        </template>
        <template v-slot:[`item.operation`]="{ item }">
          <v-row>
            <div class="operation-btn">
              <v-btn color="primary" class="post-list-btn" :to="'/update/user/' + item.id">Edit</v-btn>
            </div>
            <div class="operation-btn">
              <v-btn color="error" class="post-list-btn" @click="deleteUser(item.id)">Delete</v-btn>
            </div>
          </v-row>
        </template>
      </v-data-table>
    </v-container>
    <!-- from Ads engine -->
    <div class="ads-section square"></div>
  </v-card>
</template>
<script src="../../services/user/user-list.js">
</script>
<style scoped src="../../assets/css/pages/post/post-list.css">
</style>