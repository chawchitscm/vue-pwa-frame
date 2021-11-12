
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from "vuex";

export default {
  mixins: [validationMixin],

  validations: {
    name: {
      required,
      maxLength: maxLength(255)
    },
    phone: {
      required,
      maxLength: maxLength(15)
    },
    address: {
      required,
      maxLength: maxLength(255)
    },
    date: {
      required,
    },
  },

  data() {
    return {
      name: "",
      phone: "",
      address: "",
      error: "",
      activePicker: null,
      date: null,
      menu: false,
      user: {},
    };
  },

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  computed: {
    ...mapGetters(["userName", "userEmail"]),
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) 
        return errors
      !this.$v.name.maxLength && errors.push("Name must be at most 255 characters long") 
      !this.$v.name.required && errors.push("Name is required.")
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phone.$dirty) 
        return errors
      !this.$v.phone.maxLength && errors.push("Phone must be at most 15 characters long")
      return errors
    },
    addressErrors() {
      const errors = []
      if (!this.$v.address.$dirty) 
        return errors
      !this.$v.address.maxLength && errors.push("Address must be at most 255 characters long")
      return errors
    },
  },

  async mounted() {
    this.$axios
      .get("/user/list")
      .then((response) => {
        this.user = response.data.user_list.filter(user => user.id == this.$route.params.userId);
        this.name = this.user[0].name;
        this.phone = this.user[0].phone;
        this.address = this.user[0].address;
        this.date = new Date(Date.parse(this.user[0].dob)).toISOString().slice(0, 10);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    
    submit() {
      this.$v.$touch();
      this.$v.$touch()
      const user = {
        name: this.name,
        phone: this.phone,
        address: this.address,
        dob: this.date
      };
      this.$axios
        .put(`/update/user/${this.$route.params.userId}`, user)
        .then(() => {
          this.error = "";
          this.$router.push({
            name: "post-list"
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
}
