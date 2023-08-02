<script>
import CreationMixCard from "$lib/components/CreationMixCard.svelte";

//import the brands
import {brands} from "../../brands.js";
import {tobaccosCreate} from "$lib/store.js";
import {tobaccoSelected} from "$lib/store.js";
import {mixName} from "$lib/store.js";
import {onDestroy, onMount} from "svelte";

import {defaulT} from "../../defaulT.js";

let brand = "";
let max = 100;
let tobaccos = [];
let error = false;
let errorText = "";

const alertElement = document.querySelector('.alert');

if (alertElement) {
    setTimeout(() => {
        alertElement.classList.add('fade-out');
    }, 3000); // Adjust the delay (in milliseconds) as needed
}


//create a function to get the value from the select
async function getBrand(event) {
    brand = event.target.value;
    await getTobaccos();
}

async function getTobaccos() {

    const url = `backend/brand?name=${brand}`
    const response = await fetch(url);
    tobaccos = await response.json();

}

function tobSel(event) {

    let tname = event.target.value;

    let tobacco = tobaccos.find(t => t.name === tname);

    tobaccosCreate.update(tobaccosCreate => {
        tobaccosCreate[$tobaccoSelected].colour = tobacco.colour;
        tobaccosCreate[$tobaccoSelected].name = tobacco.brand + " " + tobacco.name;
        tobaccosCreate[$tobaccoSelected].tobaccoId = tobacco.id;
        return tobaccosCreate;
    })
}

function setPercent(event) {
    let percent = event.target.value;

    if (percent > max) {
        percent = max;
    }

    tobaccosCreate.update(tobaccosCreate => {
        tobaccosCreate[$tobaccoSelected].percentage = percent;
        return tobaccosCreate;
    })

}

function changeTobaccoNum(event) {
    let num = event.target.value;

    if(num > 4){
        num = 4;
        event.target.value = 4;
    }

    if (num < 1) {
        num = 1;
        event.target.value = 1;
    }

    tobaccosCreate.update(tobaccosCreate => {
        //hide the tobaccos that are not needed
        for (let i = 0; i < tobaccosCreate.length; i++) {
            tobaccosCreate[i].hidden = i >= num;
        }

        //iterate over the tobaccosCreate array and set the percentage to 100/num
        for (let i = 0; i < tobaccosCreate.length; i++) {
            tobaccosCreate[i].percentage = Math.round(100 / num);
        }
        return tobaccosCreate;
    })

}

function checkPercentage(){
    let total = 0;

    for (let i = 0; i < $tobaccosCreate.length; i++) {
        if (!$tobaccosCreate[i].hidden)
            //parse the percentage to int
            total += parseInt($tobaccosCreate[i].percentage);
    }
    return (total >= 99 && total <= 100);
}

async function submitMix(){

    //if the name is empty then show an error
    if($mixName === ""){
        error = true;
        errorText = "The name cannot be empty";
        setTimeout(() => {
            error = false;
        }, 3000);
        return;
    }


    if(!checkPercentage()){
        error = true;
        errorText = "The total percentage must be 100";
        setTimeout(() => {
            error = false;
        }, 3000);
        return;
    }


    const url = `backend/createMix`

        //do a post request to the backend to like the newmixes the data shloud go in the body
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tobaccos: $tobaccosCreate, name: $mixName })

    });

    if (response.ok) {
        //if the response is ok then redirect to the home page
        window.location.href = "/new";
    } else {
        //if the response is not ok then show an error
        error = true;
        errorText = await response.text();
        setTimeout(() => {
            error = false;
        }, 3000);
    }

}

onMount(async () => {

    tobaccosCreate.set(defaulT);

})

onDestroy(() => {
    tobaccosCreate.set(defaulT);
})

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

</style>



<div class="flex justify-center items-center h-full gap-20 flex-col"> <!-- Removed 'flex-row' -->

    {#if error}
    <div class="alert alert-error w-fit animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{errorText}</span>
    </div>
    {/if}

    <div class="flex justify-center items-center gap-12 flex-col md:flex-row"> <!-- Kept 'flex-row' here, if needed -->

        <!-- Wrapped 'CreationMixCard' in a separate div -->
        <div class="flex justify-start items-start h-full gap-7 flex-col">
            <CreationMixCard
                    name="The Mix"
            />
            <div class="flex justify-center items-center gap-12  flex-row  xs:max-md:gap-4 ">

                <h3 class="text-xl"> Tobacco Num</h3>

                <input type="number" placeholder="Num of Tobaccos" class="input input-bordered w-20" max="4" on:change={changeTobaccoNum}
                       value="4"/>
            </div>
        </div>

        <div class="flex justify-center items-center gap-12  flex-col">

            <h3 class="text-2xl">{$tobaccosCreate[$tobaccoSelected].name} </h3>

            <div class="flex justify-center items-center gap-4 flex-col sm:flex-row">
                <select class="select select-bordered w-40 max-w-xs mt-4 sm:mt-0" on:change={getBrand}>
                    <option disabled selected>Select a Brand</option>
                    {#each brands as b}
                        <option>{b}</option>
                    {/each}
                </select>

                <select class="select select-bordered w-full max-w-xs sm:mt-0" on:change={tobSel}>
                    <option>Select a Tobacco</option>
                    {#each tobaccos as t}
                        <option>{t.name}</option>
                    {/each}
                </select>
                <input type="number" placeholder="Percentage" class="input input-bordered w-40 max-w-xs" max={max} on:change={setPercent}
                       value={$tobaccosCreate[$tobaccoSelected].percentage}/>
            </div>
        </div>
    </div>

    <button class="btn btn-lg" on:click={submitMix}>Create Mix</button>

</div>


