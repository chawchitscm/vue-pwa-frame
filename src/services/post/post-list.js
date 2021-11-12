import { mapGetters } from "vuex";
export default {
  data() {
    return {
      postInfo: null,
      dialogTitle: "",
      dialog: false,
      isDeleteDialog: false,
      keyword: "",
      headerList: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        {
          text: "Post Title",
          value: "title",
        },
        {
          text: "Post Desciption",
          value: "description",
        },
        {
          text: "Posted User",
          value: "created_user",
        },
        {
          text: "Operation",
          value: "operation",
        },
      ],
      postList: [],
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
      .get("/post/list")
      .then((response) => {
        this.postList = response.data.post_list;
        this.showList = this.postList.filter(post => ("deleted_user_id" in post) == false);
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
    filterPosts() {
      if (this.keyword) {
        this.showList = this.postList.filter((post) => {
            this.keyword = this.keyword.toLowerCase();
            post.title = post.title.toLowerCase();
            post.description = post.description.toLowerCase();

            return post.title.includes(this.keyword) || post.description.includes(this.keyword);
        });     
      } else {
        this.showList = this.postList.filter(post => ("deleted_user_id" in post) == false);
      }
    },

    deletePost(postId) {
      this.$axios
      .delete(`/delete/post/${postId}`)
      .then(() => {
        this.loadPosts()
      })
      .catch((err) => {
        console.log(err);
      });
    },

    async loadPosts() {
      this.$axios
      .get("/post/list")
      .then((response) => {
        this.postList = response.data.post_list;
        this.showList = this.postList.filter(post => ("deleted_user_id" in post) == false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
};
