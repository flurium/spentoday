<script lang="ts">
  import Fondy from "$lib/assets/Fondy.svelte"
  import Hyperswitch from "$lib/assets/Hyperswitch.svelte"
  import Liqpay from "$lib/assets/Liqpay.svelte"
  import Monobank from "$lib/assets/Monobank.svelte"
  import Paypal from "$lib/assets/Paypal.svelte"
  import Star from "$lib/assets/Star.svelte"

  let className: string
  export { className as class }
</script>

<section class="bg-brand-pink flex py-8 overflow-hidden {className}">
  <div class="moving flex">
    <Fondy class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
    <Liqpay class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
    <Monobank class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
    <Paypal class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
    <Hyperswitch class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
  </div>
  <div class="moving flex">
    <Fondy class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
    <Liqpay class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
    <Monobank class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
    <Paypal class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
    <Hyperswitch class="mx-6" />
    <Star class="h-11 w-11 mx-4" />
  </div>
</section>

<style>
  .moving {
    animation: slide 15s linear infinite;
  }

  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
</style>
