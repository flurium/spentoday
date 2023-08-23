<script>
  import { Toaster } from "$features/toast"
</script>

<header class="bg-secondary-800 text-white flex justify-between items-center py-4 px-6">
  <a href="/">Spentoday</a>

  <button class="h-10 w-10 rounded-full bg-yellow-600">I</button>
</header>

<Toaster />
<slot />
