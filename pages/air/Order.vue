<template>
  <div class="order">
    <div class="order_main">
      <OrderForm :ticket="ticket" />
    </div>
    <div class="order_aside">2</div>
  </div>
</template>

<script>
import OrderForm from "@/components/air/OrderForm";
export default {
  data() {
    return {
      ticket: {}
    };
  },
  components: {
    OrderForm
  },
  mounted() {
    // http://127.0.0.1:1337/airs/167?seat_xid=557f1a56db044b4d450ace41fb401d6b
    this.$axios
      .get("/airs/" + this.$route.query.id, {
        params: {
          seat_xid: this.$route.query.seat_xid
        }
      })
      .then(res => {
          console.log(res)
        this.ticket = res.data;
      });
  }
};
</script>

<style>
.order {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.order_main {
  flex: 2;
}
.order_aside {
  flex: 1;
}
</style>