<script>

    import {tobaccosCreate} from "$lib/store.js";
    import {tobaccoSelected} from "$lib/store.js";
    import {mixName} from "$lib/store.js";

    //create a funtion to on click change the colour of the div
    function clickTobacco(event){
       tobaccoSelected.set(event.currentTarget.id);
    }



</script>

<style>
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .animate-fade-in {
        animation: fade-in 0.8s ease-in-out;
    }
    .card-body {
        display: flex;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        flex-direction: column;
        padding: var(--padding-card, 0.75rem);
        padding-top: 0.5rem;
        gap: 0.5rem/* 8px */;

    }

</style>

<div class="flex w-72 shrink-0 mix animate-fade-in"  >
    <div class="card  bg-base-100 drop-shadow-xl overflow-hidden">
        <div class="h-80 flex flex-col items-center rounded-xl">
            {#each $tobaccosCreate as t}
                {#if t.hidden !== true}
                    <div class="{t.colour} group" on:click={clickTobacco} style={`height: ${t.percentage}%; width: 100%;`}  id={t.id}>
                        <div class="flex justify-start items-end h-full w-full">
                            <div class="bg-opacity-50 bg-gray-500 rounded-tr-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span class="text-white">{t.name} - {t.percentage}%</span>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}

            <div class="card-body w-full">
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Mix Name" class="input input-ghost w-full max-w-md" bind:value={$mixName}/>
                </div>
            </div>
        </div>
    </div>
</div>