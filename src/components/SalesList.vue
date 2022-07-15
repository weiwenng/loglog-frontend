<template>
  <div class="sales_container">
    <h1>Sales Order</h1>
    <div class="m-auto">
      <form @submit="onSubmit" class="m-auto w-full max-w-lg">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Number of courses:
            </label>
          </div>
          <select
            v-model="numofcourses"
            class="block appearance-none w-full tracking-wide bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option
              v-for="course in courses"
              :value="course.title"
              :key="course.id"
            >
              {{ course.title }} courses ( minimum pax: {{ course.minpax }})
            </option>
          </select>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              >Courses:
            </label>
          </div>
          <v-select
            v-model="selected"
            multiple
            :options="
              options.filter((option) => selected.indexOf(option) === -1)
            "
            :selectable="() => selected.length < parseInt(numofcourses)"
            class="block appearance-none w-full tracking-wide bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
          </v-select>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              >Number of Pax:
            </label>
          </div>
          <input
            v-model="numofpax"
            type="number"
            placeholder="25"
            class="block appearance-none w-full tracking-wide bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
         <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              >Deliver to: 
            </label>
          </div>
        <input v-model="address" type="text" placeholder="address" class="block appearance-none w-full tracking-wide bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" />
        </div>
  <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              >Deliver on: 
            </label>
          </div>
        <input v-model="deliverydate" type="date" class="block appearance-none w-full tracking-wide bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
          <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              >Deliver at: 
            </label>
          </div>
        <input v-model="deliverytime" type="time" class="block appearance-none w-full tracking-wide bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="flex justify-center">
        <input
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"
          type="submit"
          value="Confirm Order"
        />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import Button from "./Button.vue";
export default {
  name: "Menu",
  props: {
    menus: Array,
    showAddOrder: Boolean,
    order: Array,
  },
  components: {
    Button,
    vSelect,
  },
  data() {
    return {
      numofpax: "",
      address: "",
      deliverydate: "",
      deliverytime: "",
      selected: [],
      // options: [],
      courses: [],
      numofcourses: "",
      items: [],
      itemlists: [],
    };
  },
  computed: {
    options() {
      let opts = [];
      for (let i = 0; i < this.itemlists.length; i++) {
        if (this.selected.indexOf(this.itemlists[i]) === -1) {
          opts.push(this.itemlists[i].itemname);
        }
      }
      console.log("opts", opts);
      return opts;
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (
        (this.numofcourses === 5 && this.numofpax < 25) ||
        (this.numofcourses === 6 && this.numofpax < 20) ||
        (this.numofcourses == 7 && this.numofpax < 15)
      ) {
        alert(`num of pax cannot be below than min pax stated!! `);
        return;
      }
         let d = new Date();
         let today = d.getFullYear().toString() + "-" + (d.getMonth() + 1).toString().padStart(2, '0') + "-" + d.getDate().toString().padStart(2,'0')
         
      if (this.deliverydate <= today) {
        alert ("we are unable to deliver on this day sorry!!! ")
        return;
      }

      if (
        !this.address ||
        !this.deliverydate ||
        !this.deliverytime ||
        this.selected.length !== parseInt(this.numofcourses)
      ) {
        console.log(d)
        console.log (today)
        console.log(this.deliverydate)
        alert("please fill in missing details");
        return;
      }
   
      //! need to amend this
      let menu_id = this.numofcourses - 1;

      console.log("menu_id", menu_id);
      const newOrder = {
        pax: this.numofpax,
        delivery_place: this.address,
        delivery_date: this.deliverydate,
        delivery_time: this.deliverytime,
        menu: `https://backloglog.herokuapp.com/menu/${menu_id}/`,
      };
      const newOrderMenu = [];
      for (let i = 0; i < this.selected.length; i++) {
        for (let j = 0; j < this.itemlists.length; j++) {
          if (this.selected[i] === this.itemlists[j].itemname) {
            newOrderMenu.push(this.itemlists[j]);
          }
        }
      }
      //   console.log("newOrderMenu", newOrderMenu);
      //   console.log("newOrder", newOrder);
      this.$emit("add-sale", newOrder);
      this.$emit("add-order-menu", newOrderMenu);
      this.numofpax = "";
      this.address = "";
      this.deliverydate = "";
      this.deliverytime = "";
      this.selected = "";
      this.numofcourses = "";
    },
    async getMenu() {
      const response = await fetch("https://backloglog.herokuapp.com/menu/", {
        method: "GET",
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      return data;
    },
    async getData() {
      const response = await fetch(
        "https://backloglog.herokuapp.com/foodlist/",
        {
          method: "GET",
        }
      );
      console.log(response);
      const data = await response.json();
      console.log("itemlists", data);
      return data;
    },
  },
  async created() {
    this.courses = await this.getMenu();
    this.itemlists = await this.getData();
  },
};
</script>

<style scoped>
.sales_container {
  margin: auto;
}
h1 {
  text-align: center;
}
</style>
