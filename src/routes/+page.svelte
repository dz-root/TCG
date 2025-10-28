<script lang="ts">
    import IdeFrame from '$lib/components/IdeFrame.svelte';
    import Header from '$lib/components/Header.svelte';
    export let data
</script>
<Header />
<IdeFrame title="▶️ Proof of Concept" status={`Fetched  ${data.raw.length} records`}>
    <p class="text-sm text-[#8f93a2] mb-1">
        Request to the SheetDB API to fetch the data:
    </p>
    <div class="rounded-xl border border-[#2b3040] p-2 mb-2 overflow-x-auto">
    <code class="text-xs">
    <pre> 
    <span class="text-white">CURL -X</span> <span class="text-blue-300">GET</span> <span class="text-pink-300">https://sheetdb.io/api/v1/5ivvxdan051gq</span>
    </pre>
    </code>
    </div>
    <p class="text-sm text-[#8f93a2] mb-1">
        Response from the SheetDB API:
    </p>
    <div class="overflow-x-auto border border-[#2b3040] rounded-xl h-[500px]">
        <table class="min-w-full text-sm">
            <thead class="bg-[#1b1e2b] text-[#8f93a2]">
            <tr>
                <th></th>
                <th class="text-left px-4 py-2 border-b border-[#2b3040]">Fullname</th>
                <th class="text-left px-4 py-2 border-b border-[#2b3040]">Email</th>
                <th class="text-left px-4 py-2 border-b border-[#2b3040]">Phone</th>
                <th class="text-left px-4 py-2 border-b border-[#2b3040]">Message</th>
            </tr>
            </thead>
            <tbody>
                {#if data.raw.length === 0}
                <tr>
                    <td colspan="4" class="px-4 py-6 text-center text-[#8f93a2]">No data</td>
                </tr>
                {/if}
                {#each data.raw as r ,i}
                    <tr class="bg-[#0f111a]/40 text-[#c5c8d4]">
                        <td class="px-4 py-2 border-b border-[#2b3040] text-xs"><span class="bg-blue-950 rounded-full px-1">{i+1}</span></td>
                        <td class="px-4 py-2 border-b border-[#2b3040]">{r.fullname || '—'}</td>
                        <td class="px-4 py-2 border-b border-[#2b3040]">
                        {#if r.email}
                            <a class="underline decoration-dotted hover:text-[#82aaff]" href={`mailto:${r.email}`}>{r.email}</a>
                        {:else}—{/if}
                        </td>
                        <td class="px-4 py-2 border-b border-[#2b3040]">{r.phone || '—'}</td>
                        <td class="px-4 py-2 border-b border-[#2b3040] max-w-[40ch] truncate" title={r.message}>{r.message || '—'}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</IdeFrame>