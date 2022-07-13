<template>
  <div class="pagetext">
    <h2>Order #{{ this.id }} - Details</h2>
    <br />
    Number of pax: <span> {{ this.lists.pax }} </span>
    <br />
    Delivery Address: <span> {{ this.lists.delivery_place }} </span> <br />
    Delivery Date: <span>{{ this.lists.delivery_date }}</span> <br />
    Delivery Time: <span>{{ this.lists.delivery_time }} </span> <br />
    Number of Courses: <span> {{ this.lists.menu?.title }} </span> <br />
    Total Cost: <span> ${{ this.lists.menu?.price * this.lists.pax }} </span>
    <br />
</div>
<div v-if="!submitted.logs_confirmed" :key="componentKey">
    Logistics Needed: <br/>
    <form @submit="onSubmit">
      <div v-for="log in logistics" :key="log.url" >
      <label>{{ log.name }}: </label>
      <input type="checkbox" :id="log.url" :value="log.url" v-model="checkedLogs"/>
      </div>
      <input type="submit" value="Confirmed"  />
    </form>
  </div>

  <div v-if="submitted.logs_confirmed" :key="componentKey">
    Logistics to prepare for: <br/> 
    <div v-for="logs in logsforthisorder" :key="logs.url">
    {{ logs.logsneeded}}  {{ logs.logistics.name }} 


    </div>
    
  </div>
</template>

<script>
export default {
  name: "OrderDetail",
  data() {
    return {
      lists: {},
      submitted: {logs_confirmed: false},
      logistics:[],
      checkedLogs: [],
      logsprep: [],
      logsforthisorder: [],
      componentKey: 0
    };
  },
  props: {
    id: { type: Number, required: true },
  },
  computed: {

  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      console.log('click?')
      console.log('checkedLogs', this.checkedLogs) 
      for (let i = 0; i < this.checkedLogs.length; i++) {
        const res = await fetch('https://backloglog.herokuapp.com/logsprep/', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({orders: `https://backloglog.herokuapp.com/order/${this.id}/`, logistics: this.checkedLogs[i], logsneeded: Math.ceil(this.lists?.pax * 1.1) })
        })
        const data = await res.json()
        this.logsprep = [...this.logsprep, data]
      }
      console.log("last logsprep ", this.logsprep)
      const orderToUpdate = await this.fetchOrder(this.id)
      const updOrder = { ...orderToUpdate,  logs_confirmed: true }
      const res = await fetch(`https://backloglog.herokuapp.com/order/${this.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updOrder)
      })
      const data = await res.json()
      console.log("updateOrder", data)
      this.submitted.logs_confirmed = updOrder.logs_confirmed
      console.log("onsubmit", this.submitted.logs_confirmed)
      this.componentKey += 1
      console.log("componentKey", this.componentKey)
      this.$router.push({path: `/order/${this.id}`})
      
    },
    async getList() {
      ((async() => {
      const res = await fetch(`https://backloglog.herokuapp.com/order/`);
      const data = await res.json();
      // console.log("list", data.find((order) => order.id === this.id))
      this.lists = data.find((order) => order.id === this.id);
      const res2 = await fetch(this.lists.menu);
      const data2 = await res2.json();
      this.lists = { ...this.lists, menu: data2 };
      })()).catch(console.error)
      console.log("thislist", this.lists);
      return this.lists;
    },
    async getIndivLogs() {
      const res = await fetch('https://backloglog.herokuapp.com/logsprep/')
      const data = await res.json();
      this.logsforthisorder = data.filter(order => order.orders === `https://backloglog.herokuapp.com/order/${this.id}/`)
      for (let i = 0; i < this.logsforthisorder.length;  i++ ) {
        const res2 = await fetch(this.logsforthisorder[i].logistics)
        const data2 = await res2.json()
        this.logsforthisorder = [...this.logsforthisorder.slice(0,i), {...this.logsforthisorder[i], logistics: data2}, ...this.logsforthisorder.slice(i+1)]
      }
      console.log("this.logs", this.logsforthisorder)
      return this.logsforthisorder
    },
    async getLogs() {
      const res = await fetch('https://backloglog.herokuapp.com/logistics/')
      const data = await res.json();
      return data
    },
    async getLogsPrep() {
      const res = await fetch('https://backloglog.herokuapp.com/logsprep/')
      const data = await res.json();
      return data
    },
    async fetchOrder(id) {
      const res = await fetch(`https://backloglog.herokuapp.com/order/${id}/`)
      const data = await res.json()
      console.log("course id", data)
      return data
    },
  },
  async created() {
    this.lists = await this.getList();
    this.logistics = await this.getLogs();
    this.logsprep = await this.getLogsPrep(); 
    this.submitted = await this.fetchOrder(this.id);
    this.logsforthisorder = await this.getIndivLogs();
  },
};
</script>

<style scoped>
span {
  color: rgb(1, 68, 149);
  font-weight: bold;
}
.pagetext {
  /* font-family: 'Oxygen', sans-serif; */
  color: rgb(105, 105, 105);
  animation: fadeIn 3s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
