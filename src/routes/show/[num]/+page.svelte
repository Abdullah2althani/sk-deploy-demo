<script>
  export let data;
  $: ({ episode,user } = data);
</script>

<h1>{episode.title}</h1>
<ul>
  <li>{episode.date}</li>
  <li>{episode.displayDate}</li>
  <li><a href={episode.youtube_url} target="_blank">youtube_url</a></li>
</ul>

<h2>name: {user.name}</h2>
<p>email: {user.email}</p>
<p>roles: {user.roles}</p>

<div>
<!-- {@html  episode.content} -->
</div>