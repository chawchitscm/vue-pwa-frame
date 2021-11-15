
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { mapGetters } from "vuex";

export default {
  mixins: [validationMixin],

  validations: {
    name: {
      required,
      maxLength: maxLength(255)
    },
    email: {
      required,
      email
    },
    password: {
      required,
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
      email: "",
      password: "",
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
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty)
        return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    pwdErrors () {
      const errors = []
      if (!this.$v.password.$dirty)
        return errors
      !this.$v.password.required && errors.push('Password is required')
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

  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    
    submit() {
      this.$v.$touch();

      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
        dob: this.date
      };
      this.$axios
        .post(`/create/user`, user)
        .then(() => {
          this.error = "";
          this.$router.push({
            name: "user-list"
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
}
