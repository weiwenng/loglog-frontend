<template>
    <div>
    <h1>{{ title }}</h1>
    <header>
        <router-link class="btn" to="/">Home</router-link>
        <router-link class="btn" to="/menu">Menu</router-link>
        <router-link class="btn" to="/sales">Sales</router-link>
        <!-- <router-link class="btn" to="/logistics">Logistics</router-link> -->
        <router-link class="btn" to="/order">All Orders</router-link>
        <router-link class="btn" to="/orderbydate">Orders By Date</router-link>
        <router-link class="btn" to="/warehouse">Warehouse</router-link>
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