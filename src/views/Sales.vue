<template>
  <SalesList @add-sale="addSale" @add-order-menu="addOrderMenu" :menus="menus" :orders="orders" />  
</template>

<script>
import SalesList from '../components/SalesList'

export default {
  name: 'Sales', 
  components: {
    SalesList,
  },
  data() {
    return {
      menus: [],
      showAddOrder: false,
      orders: [],
      combined: [],
    }
  },
  methods: {
    async addSale(order) {
      // console.log(order)
      // console.log(this.orders)
      const res = await fetch('https://backloglog.herokuapp.com/order/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      })
        const data = await res.json()
        this.orders = [...this.orders, data]
        this.$router.push({path: '/order'})
    },
    async addOrderMenu(ordermenu) {
      // const ordermenu = console.log(ordermenu)
      this.orders = await this.getOrder();
      console.log("order", this.orders)
      let order_id = await this.orders?.[this.orders?.length - 1]?.["id"] + 1
      console.log("order_id", order_id)
      for (let i = 0; i < ordermenu.length; i++ ) {
        const res = await fetch(`https://backloglog.herokuapp.com/combined/`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({orders: `https://backloglog.herokuapp.com/order/${order_id}/`, foodlist: `https://backloglog.herokuapp.com/foodlist/${ordermenu[i].id}/`})
        })
        const data = await res.json()
        this.combined = [...this.combined, data]
      }
    },
    async getMenu() { 
      const response = await fetch('https://backloglog.herokuapp.com/menu/', {
        method: "GET",
      })
      console.log(response)
      const data = await response.json()
      console.log(data)
      return data
    },
    async getOrder() { 
      const response = await fetch('https://backloglog.herokuapp.com/order/', {
        method: "GET"
      })
      console.log(response)
      const data = await response.json()
      console.log("order", data)
      return data
    },
    async getCombined() {
      const response = await fetch('https://backloglog.herokuapp.com/combined/', {
        method: "GET"
      })
      const data = await response.json()
      return data
    }
    },
    async created() { 
        this.menus = await this.getMenu();
        this.orders = await this.getOrder();
        this.combined = await this.getCombined();
    }
};
</script>
