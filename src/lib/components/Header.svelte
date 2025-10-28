<script>
    export let title = 'Thinkercaregroup Messages Leak';
    import { page } from '$app/stores';
</script>
<p class="max-w-6xl mx-auto text-white px-5 py-2 font-bold">{title}</p>
<div class="flex gap-5 max-w-6xl mx-auto text-[#8f93a2] px-5 font-semibold">
    <a href="/" class="hover:text-blue-200" class:text-blue-300={$page.url.pathname === '/'}>[POC]</a>
    <a href="/doc" class="hover:text-blue-200" class:text-blue-300={$page.url.pathname === '/doc'}>[DOC]</a>
</div>