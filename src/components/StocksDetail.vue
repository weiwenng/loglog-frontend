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

    Logistics Needed:
  </div>
</template>

<script>
export default {
  name: "StocksDetail",
  data() {
    return {
      lists: {},
    };
  },
  props: {
    id: { type: Number, required: true },
  },
  computed: {
    // destination() {
    //     return this.list.find((order) => order.id === this.id)
    // }
  },
  methods: {
    async getList() {
      const res = await fetch(`https://backloglog.herokuapp.com/order/`);
      const data = await res.json();
      // console.log("list", data.find((order) => order.id === this.id))
      this.lists = data.find((order) => order.id === this.id);
      const res2 = await fetch(this.lists.menu);
      const data2 = await res2.json();
      this.lists = { ...this.lists, menu: data2 };
      console.log("thislist", this.lists);
      return this.lists;
    },
  },
  async created() {
    this.lists = await this.getList();
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
