export default {
  data() {
    return {
      title: "",
      description: "",
      postList: [],
      showList: [],
    };
  },
  beforeMount() {
    this.$axios
      .get("/post/list")
      .then((response) => {
        this.postList = response.data.post_list;
        this.showList = this.postList.filter(
          post => (post.id == this.$route.params.postId && 
          ("deleted_user_id" in post) == false));
        if (this.showList.length) {
          this.title = this.showList[0].title;
          this.description = this.showList[0].description;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {

  },
};
