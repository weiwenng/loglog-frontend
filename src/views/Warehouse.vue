<template>
<div class="mr-0 mt-0 float-right" >
      <div class="font-bold text-xl mb-2">
        <button @click="TogglePopup" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> 
        </button>
      </div>
  </div>
  <div>
    
    <div v-for="logs in logslists" :key="logs.id" class="m-4 h-64 inline-flex">
      <LogsDisplay :logs="logs" @delete-logs="deleteLogs" />
    </div>
    <!-- <div class="max-w-sm rounded overflow-hidden shadow-lg m-4 h-64 inline-flex"> -->
  </div>
  <PopupForm v-show="toggle" :TogglePopup="() => TogglePopup()">
    <form @submit="onSubmit">
        <label>Category: </label>
        <input  type="text" v-model="addNewCategory" class="w-64 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1" required /> <br/>
        <label>Name: </label>
        <input type="text" v-model="addNewItem" class="w-64 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1" required /><br/>
        <label>Description: </label>
        <input type="text" v-model="addNewDescription" class="w-64 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1" required /><br/>
        <label>Per Packet: </label>
        <input type="text" v-model="addNewPerPkt" class="w-64 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1" required /><br/>
        <label>Quantity: </label>
        <input type="text" v-model="addNewQuantity" class="w-64 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1" required /><br/>
        <label>Price: </label>
        <input type="text" v-model="addNewPrice" class="w-64 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1" required /><br/>
        <label>Base Limit: </label>
        <input type="text" v-model="addNewBaseLimit" class="w-64 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1" required /><br/>
        <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"/>
    </form>
  </PopupForm>
</template>

<script>
import LogsDisplay from "../components/LogsDisplay.vue";
import PopupForm from "../components/PopupForm.vue"

export default {
  name: "Warehouse",
  data() {
    return {
      logslists: [],
      countstocks: [],
      toggle: false,
      addNewCategory: '',
      addNewItem: '',
      addNewDescription: '',
      addNewPerPkt: '',
      addNewQuantity: '',
      addNewPrice: '',
      addNewBaseLimit: '',
    };
  },
  emits: ["delete-logs"],
  components: {
    LogsDisplay,
    PopupForm
  },
  methods: {
    TogglePopup() {
        this.toggle = !this.toggle
    },
    onSubmit(e) {
        e.preventDefault()
        if(!this.addNewCategory || !this.addNewItem || !this.addNewDescription || !this.addNewPerPkt || !this.addNewQuantity || !this.addNewPrice || !this.addNewBaseLimit) {
            alert('Missing details!!')
            return
        }
        const newLogistics = {
            category: this.addNewCategory,
            name: this.addNewItem,
            description: this.addNewDescription,
            perpkt: this.addNewPerPkt,
            quantity: this.addNewQuantity,
            price: this.addNewPrice,
            base_limit: this.addNewBaseLimit,
        }
        
       this.addLogistics(newLogistics)
    
        this.addNewCategory= ''
        this.addNewItem= ''
        this.addNewDescription= ''
        this.addNewPerPkt= ''
        this.addNewQuantity= ''
        this.addNewPrice= ''
        this.addNewBaseLimit= ''

        this.TogglePopup();
    },
    async addLogistics(logistics) {
        const res = await fetch('https://backloglog.herokuapp.com/logistics/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logistics)
        })
        const data = await res.json()
        this.logslists = [...this.logslists, data]
    },
    refreshData() {
      fetch(`https://backloglog.herokuapp.com/logistics/`)
        .then((response) => response.json())
        .then((data) => data);
    },
    async deleteLogs(url) {
      const res = await fetch("https://backloglog.herokuapp.com/logsprep/");
      const data = await res.json();
      let exists = data.map((obj) => obj.logistics).includes(url);
      if (exists) {
        alert("can't delete, it exists in some orders bruh!!!!!");
      } else {
        if (!confirm("are u sure u wnt to delete?? ")) {
          return;
        }
        const res = await fetch(url, {
          method: "DELETE",
        });
        console.log(res);
        this.logslists = await this.getLogs();
      }
    },
    async getLogs() {
      const res = await fetch("https://backloglog.herokuapp.com/logistics/");
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.logslists = await this.getLogs();
  },
  mounted() {
    this.getLogs();
    this.refreshData();
  },
};
</script>

<style></style>
