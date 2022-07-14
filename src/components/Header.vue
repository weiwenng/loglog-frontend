<template>
    <div>
    <h1>{{ title }}</h1>
    <header>
        <router-link class="btn bg-blue-700 hover:bg-blue-500" to="/">Home</router-link>
        <router-link class="btn bg-blue-700 hover:bg-blue-500" to="/menu">Menu</router-link>
        <router-link class="btn bg-blue-700 hover:bg-blue-500" to="/sales">Sales</router-link>
        <router-link class="btn bg-blue-700 hover:bg-blue-500" to="/order">All Orders</router-link>
        <router-link class="btn bg-blue-700 hover:bg-blue-500" to="/orderbydate">Orders By Date</router-link>
        <router-link class="btn bg-blue-700 hover:bg-blue-500" to="/warehouse">Warehouse</router-link>
    </header>
    </div>
</template>

<script>

export default {
    name: 'Header',
    props: {
        title: String,
        sales: Boolean,
    },
}
</script>

<style scoped>
    h1 {
        text-align: center;
    }
    
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>