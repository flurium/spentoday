<script>
  import { page } from "$app/stores"
</script>

<div>
  can't load because of :

  <span>{$page.error?.message}</span>
</div>
