import { mapGetters } from "vuex";
export default {
  data() {
    return {
      keyword: "",
      headerList: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Phone",
          value: "phone",
        },
        {
            text: "Address",
            value: "address",
        },
        {
          text: "Operation",
          value: "operation",
        },
      ],
      userList: [],
      showList: [],
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    headers() {
      if (!this.isLoggedIn) {
        return this.headerList.slice(0, this.headerList.length - 1);
      } else {
        return this.headerList;
      }
    },
  },
  beforeMount() {
    this.$axios
      .get("/user/list")
      .then((response) => {
        this.userList = response.data.user_list;
        this.showList = this.userList.filter(user => ("deleted_user_id" in user) == false);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    /**
     * This is to filter posts of datatable.
     * @returns void
     */
    filterUsers() {
      if (this.keyword) {
        this.showList = this.userList.filter((user) => {
            this.keyword = this.keyword.toLowerCase();
            user.name = user.name.toLowerCase();

            return user.name.includes(this.keyword);
        });     
      } else {
        this.showList = this.userList.filter(user => ("deleted_user_id" in user) == false);
      }
    },

    deleteUser(userId) {
      this.$axios
      .delete(`/delete/user/${userId}`)
      .then(() => {
        this.loadUsers()
      })
      .catch((err) => {
        console.log(err);
      });
    },

    async loadUsers() {
      this.$axios
      .get("/user/list")
      .then((response) => {
        this.userList = response.data.user_list;
        this.showList = this.userList.filter(user => ("deleted_user_id" in user) == false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
};
