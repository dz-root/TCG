<script>
	let { children } = $props();
	import "../app.css";
</script>
<div class="bg-[#11131d] h-screen">

	{@render children()}
</div>