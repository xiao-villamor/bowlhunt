<script>
import CreationMixCard from "$lib/components/CreationMixCard.svelte";

//import the brands
import {brands} from "../../brands.js";
import {tobaccosCreate} from "$lib/store.js";
import {tobaccoSelected} from "$lib/store.js";
import {mixName} from "$lib/store.js";
import {onMount} from "svelte";
import {defaulT} from "../../defaulT.js";

let brand = "";
let max = 100;
let tobaccos = [];


//create a function to get the value from the select
async function getBrand(event) {
    brand = event.target.value;
    console.log(brand);
    await getTobaccos();
}

async function getTobaccos() {

    const url = `backend/brand?name=${brand}`
    const response = await fetch(url);
    tobaccos = await response.json();

}

function tobSel(event) {
    let tname = event.target.value;

    //get the tobacco object from the array
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

    console.log(tobaccosCreate);
}

async function submitMix(){

    const url = `backend/createMix`
    console.log($tobaccosCreate);

        //do a post request to the backend to like the newmixes the data shloud go in the body
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tobaccos: $tobaccosCreate, name: $mixName })

    });

    console.log(response)

    if (response.ok) {
        //if the response is ok then redirect to the home page
        window.location.href = "/new";
    } else {
        //if the response is not ok then show an error
    }


}

onMount(async () => {
    tobaccosCreate.set(defaulT);
})

</script>

<div class="flex justify-center items-center h-full gap-20 flex-col"> <!-- Removed 'flex-row' -->


    <div class="flex justify-center items-center gap-12 flex-col sm:flex-row"> <!-- Kept 'flex-row' here, if needed -->

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


