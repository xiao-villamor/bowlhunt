<script>
    import MixCard from "$lib/components/MixCard.svelte";
    import {onMount} from "svelte";

    let pageNumber = -1;
    let loading = false;
    let mixes = [];
    let loadmore = true;

    async function getMixes(page) {
        const response = await fetch(`api/tobaccos?page=${page}`);
        return await response.json();
    }

    async function loadMoreMixes() {
        loading = true;
        pageNumber++;
        const newMixes = await getMixes(pageNumber);
        mixes = mixes.concat(newMixes);
        loading = false;
        const isLast = await getMixes(pageNumber+1);
        isLast.length === 0 ? loadmore = false : loadmore = true;
        console.log(loadmore)
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
            !loading && loadmore
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
    {#if loading === true}
        <div class="fixed inset-0 flex items-center justify-center z-30">
            <span class="loading loading-ring loading-lg"></span>
        </div>
    {/if}
    <div class="grid items-center  justify-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lx:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-w-0 gap-10">
        {#each mixes as mix}
            <div class="flex justify-center">
                <MixCard name={mix.name} class=""  />
            </div>
        {/each}
    </div>
</div>