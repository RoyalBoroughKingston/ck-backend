<template>

</template>


<script>
import auth from "@/classes/Auth";

export default {
  name: "Logout",
  created() {
    auth.logout();
    this.$root.$emit("logout");
    this.$router.push({ name: "dashboard" });
  }
}
</script>
