<script lang="ts">
    import IdeFrame from '$lib/components/IdeFrame.svelte';
    import Header from '$lib/components/Header.svelte';
    import { fade, scale } from 'svelte/transition';

    export let data: {
        raw: Array<{
            fullname?: string;
            email?: string;
            phone?: string;
            message?: string;
        }>;
    };

    let selected: {
        fullname?: string;
        email?: string;
        phone?: string;
        message?: string;
    } | null = null;

    const openModal = (row: typeof data.raw[number]) => {
        selected = row;
    
        setTimeout(() => {
            const el = document.getElementById('modal-close-btn');
            el?.focus();
        }, 0);
    };

    const closeModal = () => (selected = null);

    const onRowKeydown = (e: KeyboardEvent, row: typeof data.raw[number]) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(row);
        }
    };


    const onEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && selected) closeModal();
    };
</script>

<svelte:window on:keydown={onEsc} />

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

    <div class="overflow-x-auto border border-[#2b3040] rounded-xl h-[490px]">
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
                        <td colspan="5" class="px-4 py-6 text-center text-[#8f93a2]">No data</td>
                    </tr>
                {/if}

                {#each data.raw as r, i}
                    <tr
                        class="bg-[#0f111a]/40 text-[#c5c8d4] hover:bg-[#0f111a]/70 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#82aaff]"
                        on:click={() => openModal(r)}
                        tabindex="0"
                        role="button"
                        aria-label={`Open details for row ${i + 1}`}
                        on:keydown={(e) => onRowKeydown(e, r)}
                    >
                        <td class="px-4 py-2 border-b border-[#2b3040] text-xs">
                            <span class="bg-blue-950 rounded-full px-1">{i + 1}</span>
                        </td>
                        <td class="px-4 py-2 border-b border-[#2b3040]">{r.fullname || '—'}</td>
                        <td class="px-4 py-2 border-b border-[#2b3040]">
                            {#if r.email}
                                <a class="underline decoration-dotted hover:text-[#82aaff]" href={`mailto:${r.email}`}>{r.email}</a>
                            {:else}—{/if}
                        </td>
                        <td class="px-4 py-2 border-b border-[#2b3040]">{r.phone || '—'}</td>
                        <td class="px-4 py-2 border-b border-[#2b3040] max-w-[40ch] truncate" title={r.message}>
                            {r.message || '—'}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

  
    {#if selected}
        <div
            class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            on:click={(e) => {
              
                if (e.target === e.currentTarget) closeModal();
            }}
            transition:fade
            aria-hidden="true"
        />

        <div
            class="fixed inset-0 z-[60] grid place-items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            transition:fade
        >
            <div class="w-full max-w-2xl rounded-2xl border border-[#2b3040] bg-[#0f111a] shadow-2xl">
                <div class="flex items-start justify-between gap-4 p-5 border-b border-[#2b3040]">
                    <div>
                        <h2 id="modal-title" class="text-lg font-semibold text-white">Message details</h2>
                        <p class="text-xs text-[#8f93a2]">
                            Full message content and sender info
                        </p>
                    </div>
                    <button
                        id="modal-close-btn"
                        class="shrink-0 rounded-lg px-2 py-1 text-[#8f93a2] hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#82aaff]"
                        on:click={closeModal}
                        aria-label="Close dialog"
                    >
                        ✕
                    </button>
                </div>

                <div class="p-5 space-y-4" transition:scale={{ start: 0.95, duration: 120 }}>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div class="rounded-xl border border-[#2b3040] p-3">
                            <div class="text-xs text-[#8f93a2]">Fullname</div>
                            <div class="text-sm text-white">{selected.fullname || '—'}</div>
                        </div>
                        <div class="rounded-xl border border-[#2b3040] p-3">
                            <div class="text-xs text-[#8f93a2]">Email</div>
                            <div class="text-sm">
                                {#if selected.email}
                                    <a class="text-white underline decoration-dotted hover:text-[#82aaff]" href={`mailto:${selected.email}`}>{selected.email}</a>
                                {:else}
                                    <span class="text-white">—</span>
                                {/if}
                            </div>
                        </div>
                        <div class="rounded-xl border border-[#2b3040] p-3 md:col-span-2">
                            <div class="text-xs text-[#8f93a2]">Phone</div>
                            <div class="text-sm text-white">{selected.phone || '—'}</div>
                        </div>
                    </div>

                    <div class="rounded-xl border border-[#2b3040] p-4">
                        <div class="text-xs text-[#8f93a2] mb-1">Message</div>
                        <pre class="whitespace-pre-wrap break-words text-sm text-[#c5c8d4]">{selected.message || '—'}</pre>
                    </div>
                </div>

                <div class="flex justify-end gap-2 p-5 border-t border-[#2b3040]">
                    <button
                        class="rounded-xl px-4 py-2 text-sm font-medium text-white bg-[#1b1e2b] hover:bg-[#222638] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#82aaff]"
                        on:click={closeModal}
                    >
                        Close
                    </button>
                    {#if selected?.email}
                        <a
                            class="rounded-xl px-4 py-2 text-sm font-medium text-[#0f111a] bg-[#82aaff] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#82aaff]"
                            href={`mailto:${selected.email}`}
                        >
                            Reply by email
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</IdeFrame>
