<script>
    import MixCard from "$lib/components/MixCard.svelte";
    import {onMount} from "svelte";
    import {flavours} from "$lib/store.js";
    import {notes} from "$lib/store.js";

    let pageNumber = -1;
    let loading = false;
    let mixes = [];

    let more = true;




    //check if the notes or flavours have changed and if so update the mixes
    $: if ($notes !== [] || $flavours !== []) {
        updateMixesNew();
    }


    export async function updateMixesNew() {
        mixes = [];
        pageNumber = -1;
        more = true;
        await loadMoreMixes();
    }

    export async function getMixes(pageNum) {

        //convert the notes and flavours to a string that each flavour is separated by a -
        let urlNotes = "";
        let urlFlavours = "";

        if (notes !== null) {
            urlNotes = $notes.join("-")
        }
        if (flavours !== null) {
            urlFlavours = $flavours.join("-");
        }

        const url = `api/trendingmixes?page=${pageNum}&Notes=${urlNotes}&Flavours=${urlFlavours}`;

        const response = await fetch(url);
        return await response.json();
    }


    async function loadMoreMixes() {

        loading = true;
        pageNumber++;

        try {

            const newMixes = await getMixes(pageNumber, notes, flavours);
            mixes = mixes.concat(newMixes);
            loading = false;
            await checkLoadMore();

        } catch (error) {
            console.error(error);
            loading = false;
        }
    }


    async function checkLoadMore() {
        try {
            const isLast = await getMixes(pageNumber+1, notes, flavours);
            more = isLast.length !== 0;
        } catch (error) {
            console.error(error);
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
            !loading && more
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
    <div class="grid items-center justify-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lx:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-w-0 gap-10">
        {#each mixes as mix}
            <div class="flex justify-center">
                <MixCard name={mix.name} MixTobaccos="{mix.Tobacco}" likes="{mix.likes}"/>
            </div>
        {/each}
    </div>
</div>