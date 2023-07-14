
//create  a writable store to store and id and the likes of multiple posts
import {writable} from "svelte/store";
import { browser } from "$app/environment";

export const liked = writable(
    browser && JSON.parse(localStorage.getItem("liked")) || []
);

liked.subscribe(value => {
    browser && localStorage.setItem("liked", JSON.stringify(value));
});