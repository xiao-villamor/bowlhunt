<script>
    import "../app.css";
    import NavBar from "$lib/components/NavBar.svelte";
    import {NotesListLocal} from "../NotesListLocal.js";
    import {FlavoursListLocal} from "../FlavoursListLocal.js";
    import {flavours} from "$lib/store.js";
    import {notes} from "$lib/store.js";

    let noteList = [];
    let flavourList = [];


    function updateNotes() {
        notes.set(noteList);

    }


    function  updateFlavours() {
        flavours.set(flavourList);
    }


    function handleCheckboxChangeNotes(event) {
        let checkboxLabel = event.target.labels[0].innerText;

        if (NotesListLocal.includes(checkboxLabel)) {
            //check if it is already in the array not a string
            if (noteList.includes(checkboxLabel)) {
                noteList = noteList.filter(item => item !== checkboxLabel);
            } else {
                noteList.push(checkboxLabel);
            }


        }
        updateNotes();
    }

    function handleCheckboxChangeFlavours(event) {
        let checkboxLabel = event.target.labels[0].innerText;

        if (FlavoursListLocal.includes(checkboxLabel)) {
            //check if it is already in the array not a string
            if (flavourList.includes(checkboxLabel)) {
                flavourList = flavourList.filter(item => item !== checkboxLabel);
            } else {
                flavourList.push(checkboxLabel);
            }
            localStorage.setItem('flavours', JSON.stringify(noteList));

        }

        updateFlavours();
    }



</script>

<html data-theme="garden" lang="es" class="md:mx-5 mx-3 sticky">

    <NavBar navbar_id="my-drawer-2"/>

    <div class="drawer lg:drawer-open my-8 lg:sticky  xs:max-md:items-center xs:max-md:justify-center" >
        <label for="my-drawer-2">
            Toggle Drawer
        </label>
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

        <div class="drawer-content m-6">
            <slot />
        </div>
        <div class="drawer-side z-50 lg:top-24 lg:h-[80vh]">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu-vertical lg:menu  px-4 w-60 h-auto text-base-content bg-base-100  overflow-x-hidden pt-10">

                    <li class="">
                        <a id="new" class="text-lg h-full flex items-center" href="/new" data-sveltekit-preload-data="hover">
                                <svg class="w-9 h-9 stroke-current mr-2" width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><path d="M30,52.16c.81-2.07,7.06-17,19.76-19.86a.09.09,0,0,0,0-.18c-2.14-.86-15.22-6.57-19.38-20.26a.09.09,0,0,0-.18,0c-.51,2.27-3.94,14.43-20,20a.1.1,0,0,0,0,.19c2.24.38,13.48,3.14,19.62,20.15A.1.1,0,0,0,30,52.16Z"/><path d="M48.79,25.08c.29-.74,2.52-6.07,7.06-7.09a0,0,0,0,0,0-.07c-.76-.3-5.43-2.34-6.92-7.23a0,0,0,0,0-.07,0c-.18.82-1.4,5.16-7.14,7.13a0,0,0,0,0,0,.07c.8.14,4.81,1.12,7,7.2A0,0,0,0,0,48.79,25.08Z"/></svg>
                                New
                        </a>
                    </li>
                    <li class="pt-4">
                        <a id="trend" class="flex items-center text-lg"  href="/trending">
                            <svg class="w-8 h-8 stroke-current mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M20 15C20 19.2545 17.3819 21.1215 15.3588 21.751C14.9274 21.8853 14.6438 21.3823 14.9019 21.0115C15.7823 19.7462 16.8 17.8159 16.8 16C16.8 14.0494 15.1559 11.7465 13.8721 10.3261C13.5786 10.0014 13.0667 10.2163 13.0507 10.6537C12.9976 12.1029 12.7689 14.0418 11.7828 15.5614C11.6241 15.806 11.2872 15.8262 11.1063 15.5975C10.7982 15.2079 10.4901 14.7265 10.182 14.3462C10.016 14.1414 9.71604 14.1386 9.52461 14.3198C8.77825 15.0265 7.73333 16.1286 7.73333 17.5C7.73333 18.4893 8.20479 19.7206 8.69077 20.6741C8.91147 21.1071 8.50204 21.615 8.08142 21.3715C6.24558 20.3088 4 18.1069 4 15C4 11.8536 8.31029 7.49484 9.95605 3.37694C10.2157 2.72714 11.0161 2.42181 11.5727 2.84585C14.9439 5.41391 20 10.3781 20 15Z" stroke="#000000" stroke-width="1.5"></path>
                                </g>
                            </svg>
                            Trending
                        </a>

                    </li>

                    <div class="divider"></div>
                    <span class="text-lg">Notes</span>

                    {#each NotesListLocal as note}
                    <li>
                        <label class="label cursor-pointer">
                            <span class="label-text">{note}</span>
                            <input type="checkbox"
                                   class="checkbox"
                                   on:change={handleCheckboxChangeNotes}
                            />
                        </label>
                    </li>
                    {/each}

                    <div class="divider"></div>
                    <span class="text-lg">Flavours</span>

                    {#each FlavoursListLocal as flavour}
                        <li>
                            <label class="label cursor-pointer">
                                <span class="label-text">{flavour}</span>
                                <input type="checkbox"
                                       class="checkbox"

                                       on:change={handleCheckboxChangeFlavours}
                                />
                            </label>
                        </li>
                    {/each}
                </ul>
            </div>
    </div>
</html>
