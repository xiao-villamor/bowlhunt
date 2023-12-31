
//create  a writable store to store and id and the likes of multiple posts
import {writable} from "svelte/store";
import { browser } from "$app/environment";

import {defaulT} from "../defaulT.js";



export const liked = writable(
    browser && JSON.parse(localStorage.getItem("liked")) || []
);

liked.subscribe(value => {
    browser && localStorage.setItem("liked", JSON.stringify(value));
});

export const flavours = writable([]);

export const notes = writable([]);

export const tobaccosCreate = writable([]);

tobaccosCreate.set(defaulT);


export const mixName = writable("");

export const tobaccoSelected = writable(0);



