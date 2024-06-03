<script>
  import { applyAction, deserialize } from "$app/forms";
  import { invalidateAll } from "$app/navigation";

  export let form;
  $: console.log("form", form);

    //  Standard onSubmit event 
  async function handleForm(event) {
    //  this ==Form element
    
    //  Creating form data
    const data = new FormData(this);
    
    // Sending our own fetch post request
    const res = await fetch(this.action, {
      method: "POST",
      body: data,
    });

    //  Get data by deserialize it 
    const result = deserialize(await res.text());
    //  if success, reload all loaded data
    if (result.type === "success") {
        //  Reload all data
        await invalidateAll();
    }

    // populate form
    // will redirect if thrown redirect in action
    // show error page if thrown action
    applyAction(result)

  }
</script>

<!-- Fail -->
{#if form?.error_message}
  <p>
    {form.error_message}
  </p>
{/if}

<!-- Success -->
{#if form?.error_message}
  <p>
    {form.error_message}
  </p>
{:else}
  <!-- <form 
    use:enhance= {({ form, data, action, cancel}) => {
        // form -> form element
        // data -> FormData object
        // action -> url form posts to 
        // cancel() -> function to cancel form submission

        return ({result,update})=>{
            update();
            // result -> result of form submission
            // update() -> runs all of the default use:enhance
        }
    }}
    action="?/email"
    method="POST">
     -->
  <!--  Action = route + ?/ + action_name -->

  <form on:submit|preventDefault={handleForm} method="/contact?/email">
    <label for="name">
      Name: <input type="text" id="name" name="name" required />
    </label>
    <label for="email">
      email: <input type="email" id="email" name="email" required />
    </label>
    <label for="message">
      message: <textarea id="message" name="message" required />
    </label>
    <button type="submit">Send Email</button>
  </form>
{/if}

<style>
  form {
    padding: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
  }

  label {
    display: block;
  }
</style>
