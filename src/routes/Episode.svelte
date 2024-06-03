<script>
    export let episode;
</script>

<nav>
    <ul>
        {#each episode as ep}
        <li>
            <a href={`/show/${ep.number}`}>{ep.title}</a>
        </li>
        {/each}
    </ul>
</nav>