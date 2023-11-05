<script lang="ts">
  import Star from "$lib/assets/Star.svelte"
</script>

<div
  class="overflow-hidden bg-white py-4 flex text-lg sm:text-2xl md:text-4xl lg:text-7xl
     mt-9 md:mt-28
  "
>
  <div class="moving flex items-center">
    <span class="font-bold text-brand-violet mx-6">ШВИДКІСТЬ</span>
    <Star class="h-11 w-11 mx-4" />
    <span class="font-bold text-brand-violet mx-6">РЕЗУЛЬТАТИ</span>
    <Star class="h-11 w-11 mx-4" />
    <span class="font-bold text-brand-violet mx-6">ДОСВІД</span>
    <Star class="h-11 w-11 mx-4" />
  </div>
  <div class="moving flex items-center">
    <span class="font-bold text-brand-violet mx-6">ШВИДКІСТЬ</span>
    <Star class="h-11 w-11 mx-4" />
    <span class="font-bold text-brand-violet mx-6">РЕЗУЛЬТАТИ</span>
    <Star class="h-11 w-11 mx-4" />
    <span class="font-bold text-brand-violet mx-6">ДОСВІД</span>
    <Star class="h-11 w-11 mx-4" />
  </div>
</div>

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
