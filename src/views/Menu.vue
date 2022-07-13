<template>
  <!-- <Button /> -->
  <!-- hello loggers test test test this is menu page lolololol hehe <br /> -->
  <h2>Available Packages to Order</h2>
  <br />
  <div class="courses_list">
    <div class="courses" v-for="menu in menus" :key="menu.id">
      <h3>{{ menu.title }} courses</h3>
      <h4>minimum pax: {{ menu.minpax }}</h4>
      <h4>${{ menu.price }} / pax</h4>
    </div>
  </div>
  <br />
  <div>
    <table>
      <thead>
        <th>Category <Button @btn-click="() => TogglePopup('categoryNew')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center" text="Add" /></th>
        <th>Items <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center" text="Add" @btn-click="() => TogglePopup('itemNew')" /></th>
      </thead>
      <tbody>
        <tr v-for="uniquecategory in uniquecategories" :key="uniquecategory">
          <td>{{ uniquecategory }} </td>
          <td>
            <FoodDisplay :uniquecategory="uniquecategory" :key="componentKey" />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- this is to add category -->
    <PopupForm v-if="popupTriggers.categoryNew" :TogglePopup="() => TogglePopup('categoryNew')" >
        <form @submit="onSubmit">
            <label>New Category: </label>
            <input type="text" v-model="addNewCategory" required /> <br/>
            <label>New Item: </label>
            <input type="text" v-model="addNewItem" required /><br/>
            <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"/>
        </form>
    </PopupForm>
    <!-- this is to add items!!!  -->
    <PopupForm v-if="popupTriggers.itemNew" :TogglePopup="() => TogglePopup('itemNew')" >
          <!-- <PopupForm v-if="popupTriggers.itemNew" :TogglePopup="() => TogglePopup('itemNew')" > -->
            <form @submit="onSubmit">
            <label>Category: </label>
            <select v-model="addNewCategory">
                <option v-for="uniquecategory in uniquecategories" :key="uniquecategory">
                    {{ uniquecategory }}
                </option>
            </select><br/>
            <label>New Item: </label>
            <input type="text" v-model="addNewItem" required /><br/>
            <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center" />
            </form>
        </PopupForm>
  </div>
</template>

<script>
// import Vue from 'vue'
import { ref } from 'vue'
import FoodDisplay from "../components/FoodDisplay";
import Button from "../components/Button";
import PopupForm from "../components/PopupForm";

// Vue.forceUpdate();


export default {
  setup() {
    const popupTriggers = ref({
        categoryNew: false,
        itemNew: false,
    });
    const TogglePopup = (trigger) => {
        popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
        // PopupForm,
        popupTriggers,
        TogglePopup
    }
  },
  name: "Menu",
  emits: ['btn-click'],
  data() {
    return {
    menus: [],
    fooditems: [],
    addNewCategory: '',
    addNewItem: '',
    componentKey: 0
    };
  },
  components: {
    FoodDisplay,
    Button,
    PopupForm
  },
  computed: {
    uniquecategories() {
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      return this.fooditems
        .map((fooditem) => fooditem.category)
        .filter(onlyUnique);
      // this.orderNum = this.combined.map(combine => combine.orders.slice(https.length, -1)).filter(onlyUnique)
      // return this.orderNum;
    },
    foodfood() {
      console.log("Help", uniquecategories[1]);
      return this.fooditems.filter(
        (fooditem) => fooditem.category === uniquecategories[1]
      );
    },
  },
  methods: {
     onSubmit(e) {
            e.preventDefault()

            if (!this.addNewCategory || !this.addNewItem ) {
                alert('Missing details!!')
                return
            }

            const newCategory = {
                category: this.addNewCategory,
                itemname: this.addNewItem
            }

            this.addCategory(newCategory);
            this.addNewCategory = ''
            this.addNewItem = ''
            this.componentKey += 1
        },
    async addCategory(category) {
        const res = await fetch('https://backloglog.herokuapp.com/foodlist/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
        const data = await res.json()
        this.fooditems = [...this.fooditems, data ]
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
    async getFood() {
      const res = await fetch("https://backloglog.herokuapp.com/foodlist/");
      const data = await res.json();
      console.log("getFood", data);
      return data;
    },
  },
  async created() {
    this.menus = await this.getMenu();
    this.fooditems = await this.getFood();
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
.courses_list {
  display: flex;
  margin: auto;
}
.courses {
  border: 1px solid black;
  text-align: center;
  width: 10rem;
  margin: auto;
}
table {
  /* border: 5px solid black; */
  margin: auto;
  width: 90%;
}
th {
  background-color: rgb(1, 68, 149);
  color: white;
  width: 50%;
}

th,
td {
  text-align: center;
  padding: 0.4rem;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #ddd;
}
</style>
