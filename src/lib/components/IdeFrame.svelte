<script lang="ts">
    export let title = 'sheetdb.json';
    export let status = '';
</script>
    
    
<div class="max-w-6xl mx-auto p-4">
    <div class="rounded-2xl overflow-hidden shadow-ide border border-[#2b3040] bg-[#11131d]">
        <div class="flex items-center justify-between px-4 py-2 bg-[#1b1e2b] border-b border-[#2b3040]">
            <div class="flex items-center gap-2">
                <span class="text-[#8f93a2] text-sm font-bold">{title}</span>
            </div>
            {#if status}
                <span class="text-[#8f93a2] text-xs font-semibold">{status}</span>
            {/if}
        </div>
        <div class="p-4">
            <slot />
        </div>
    </div>
</div>  