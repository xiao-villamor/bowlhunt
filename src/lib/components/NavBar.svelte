<script>
    export let navbar_id;

</script>


<div class="sticky top-0 z-30 ">
    <div class="navbar bg-base-100  border-b-2 dark:border-gray-300">
        <div class="flex-none lg:hidden">
            <label for="{navbar_id}" class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
        </div>
        <div class="flex-1">
            <img src="/logo_tiny.webp" alt="Logo" width="54" height="54" />
            <a href="/" class=" normal-case text-xl w-fit">
                Bowlhunt
            </a>
        </div>
        <div class="flex gap-1 ">


            <div>
                <a class="btn btn-square btn-ghost"  href="/create" aria-label="Create New Item">
                    <!-- add an add svg -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </a>
            </div>
        </div>

    </div>

</div>
