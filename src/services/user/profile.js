import { mapGetters } from "vuex";

export default {
  data() {
    return {
      alignments: [
        'start',
        'center',
        'end',
      ],
      profileImg: "",
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn", "userId", "userName", "userEmail"]),
  },

  beforeMount() {
    this.profileImg = `${process.env.VUE_APP_SERVER}/get/avator/${this.userId}`;
  },
}
