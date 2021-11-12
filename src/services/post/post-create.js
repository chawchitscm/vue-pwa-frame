
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    title: {
      required,
      maxLength: maxLength(255)
    },
    description: {
      required,
      maxLength: maxLength(1000)
    },
  },

  data() {
    return {
      title: "",
      description: "",
      error: "",
    };
  },

  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) 
        return errors
      !this.$v.title.maxLength && errors.push("Title must be at most 255 characters long") 
      !this.$v.title.required && errors.push("Title is required.")
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) 
        return errors
      !this.$v.description.maxLength && errors.push("Description must be at most 1000 characters long") 
      !this.$v.description.required && errors.push("Description is required.")
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
      const post = {
        title: this.title,
        description: this.description,
      };
      this.$axios
      .post("/create/post", post)
      .then(() => {
        this.error = "";
        this.$router.push({ name: "post-list" });
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
}
