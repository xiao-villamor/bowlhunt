<script>
    import MixCard from "$lib/components/MixCard.svelte";
    import {onMount} from "svelte";
    import {flavours} from "$lib/store.js";
    import {notes} from "$lib/store.js";

    let pageNumber = -1;
    let error_g = false;
    let mixes = [];

    let more = true;



    // update the mixes when the filters change

    $: if ($notes !== null || $flavours !== null) {
        updateMixesNew();
    }



    export async function updateMixesNew() {
        mixes = [];
        pageNumber = -1;
        more = true;
        await loadMoreMixes();
    }


    async function getMixes(PageNum) {
        //convert the notes and flavours to a string that each flavour is separated by a -
        let urlNotes = "";
        let urlFlavours = "";
        if (notes !== null) {
            urlNotes = $notes.join("-");
        }
        if (flavours !== null) {
            urlFlavours = $flavours.join("-");
        }
        const url = `api/newmixes?page=${PageNum}&Notes=${urlNotes}&Flavours=${urlFlavours}`
        const response = await fetch(url);

        return await response.json();
    }


    async function loadMoreMixes() {
        pageNumber++;
        if(more){
            try {
                const newMixes = await getMixes(pageNumber);
                mixes = mixes.concat(newMixes);
                // Perform the following part in the background
                await checkLoadMore();
            } catch (error) {
                // Handle any errors that occur during the API call
                error_g = true;
            }
        }
    }


    async function checkLoadMore() {
        try {
            const isLast = await getMixes(pageNumber + 1);
            more = isLast.length !== 0;
        } catch (error) {
            error_g = true;
        }
    }



    onMount(async () => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }
        await loadMoreMixes();
    });

    function handleScroll() {
        if (
            window.innerHeight + window.pageYOffset >=
            document.documentElement.offsetHeight &&
            window.pageYOffset > 0 && // Add this condition to check if scroll position is not at the top
            more
        ) {
            loadMoreMixes();
        }
    }

</script>

<style>
    @keyframes fade-in {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

</style>

<div >
    {#if error_g === true}
        <div class="fixed inset-0 flex items-center justify-center z-30">
            <!--text sayng something went wrong and button to reload the page -->
            <div class="w-64 p-4 bg-white rounded-lg shadow-lg">
                <div class="flex flex-col items-center justify-center space-y-4">
                    <div class="text-xl font-medium text-gray-800">Something went wrong</div>
                    <div class="flex flex-row items-center justify-center space-x-2">
                        <button
                                class="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                on:click={() => window.location.reload()}
                        >
                            Reload
                        </button>
                    </div>
                </div>
            </div>

        </div>
    {/if}
    <div class="grid items-center  justify-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lx:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-w-0 gap-10">
        {#each mixes as mix}
            <div class="flex justify-center">
                <MixCard name={mix.name} MixTobaccos="{mix.Tobacco}" likes="{mix.likes}"/>
            </div>
        {/each}
    </div>
</div>