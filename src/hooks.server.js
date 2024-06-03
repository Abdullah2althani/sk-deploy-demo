import { sequence } from "@sveltejs/kit/hooks";

import { auth } from "$db/fake_auth";

// run 1st
async function logger({ event, resolve }) {
  const start_time = Date.now();
  console.log("start_time:" + start_time);
  //   wait for response then run response
  const response = await resolve(event);

  console.log(
    `${Date.now() - start_time}ms  {event.request.method} ${event.url.pathname}`
  );

  return resolve(event);
}

// run 2nd
function authorize({ event, resolve }) {
  const user = auth();
  event.locals.user = user;
  return resolve(event);
}

export const handle = sequence(logger, authorize);

// // Interception Fetch
// export function handleFetch ({request,fetch}){
//     return fetch(request)
// }

// export function handelError({error,event}) {
//     return{
//         message:"Oops, im intercwpting in a hook",
//         code : error.code
//     }
// }
