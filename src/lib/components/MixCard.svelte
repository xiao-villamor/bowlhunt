<script>
    import {onMount} from "svelte";
    import { liked } from '../store.js';


    export let name;
    export let MixTobaccos;

    export let likes;

    let isClicked = false;


    let tobaccos = [];

    const getApiUrl = () => {
        const baseUrl = window.location.origin;
        return `${baseUrl}`;
    };



    async function getTobacco(id) {
        const response = await fetch(`${getApiUrl()}/api/tobaco?id=${id}`);
        return await response.json();
    }

    async function likeMix(id,likes) {
        //do a post request to the api to like the newmixes the data shloud go in the body
        const response = await fetch(`api/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id , likes: likes})
            //set is data to the body



        });
        return await response.json();
    }

    async function getMixTobaccos(mix) {

        let tobaccos = [];

        for (let i = 0; i < mix.length; i++) {
            const tobacco = (await getTobacco(mix[i].tobaccoId));
            tobacco.percentage = mix[i].tobaccoPercentage;
            tobaccos.push(tobacco);
        }
        return tobaccos
    }

    onMount(async () => {
        tobaccos = await getMixTobaccos(MixTobaccos);

        liked.subscribe(n => {
            const index = n.findIndex(x => x.id === MixTobaccos[0].mixId);
            if (index !== -1) {
                isClicked = n[index].liked;
                likes = n[index].likes;
            }
        });
    });


    function handleClick() {
        isClicked = !isClicked;
        likes = isClicked ? likes + 1 : likes - 1;
        likeMix(MixTobaccos[0].mixId,likes);



        //set in store the id of the newmixes that was liked and if it was liked or not
        liked.update(n => {
            const index = n.findIndex(x => x.id === MixTobaccos[0].mixId);

            if (index === -1) {
                const newLikedObject = { id: MixTobaccos[0].mixId, liked: isClicked, likes: likes };
                n.push(newLikedObject);
                localStorage.setItem('liked', JSON.stringify(n));
            } else {
                n[index].liked = isClicked;
                n[index].likes = likes;
                localStorage.liked = JSON.stringify(n);
            }

            return n;
        });
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
        <div class="h-80 flex flex-col items-center rounded-xl d ">
            {#each tobaccos as t}
                <div class="{t.colour} group " style={`height: ${t.percentage}%; width: 100%;`} >
                    <div class="flex justify-start items-end h-full w-full">
                        <div class="bg-opacity-50 bg-gray-500 rounded-tr-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span class="text-white">{t.name} - {t.percentage}%</span>
                        </div>
                    </div>
                </div>
            {/each}

        <div class="card-body w-full">
            <div class="grid grid-cols-2 gap-2">
                <h2 class="card-title w-32">{name}</h2>


                <div class="card-actions justify-end items-center">
                    <button class="flex {isClicked ? 'bg-gray-300' : 'bg-base-100'}  items-center border border-gray-300 rounded-lg py-2 px-4 text-gray-500 hover:bg-gray-300 w-fit h-fit justify-end"  on:click={handleClick} class:active={isClicked}>
                        <span class="text-m">{likes}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isClicked ? 'black' : 'none'} viewBox="0 0 24 24" stroke-width="1.5" stroke={isClicked ? 'black' : "currentColor"} class="w-7 h-7 pl-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
                </div>

            </div>

        </div>
    </div>
        </div>
    </div>
