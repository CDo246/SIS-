import { useState } from "react";
import { trpc } from "../utils/trpc";

export function MainPage() {


  const hello = trpc.greeting.useQuery();

  return (
    <>

      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank"></a>
      </div>
<<<<<<< HEAD
      <body>


        <div id="footer" >
          <button>Publish</button>
          <textarea name="Enter Topic" rows={2} cols={50} placeholder="Enter Topic Here...."></textarea>
        </div>
      </body>
=======
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs bg-red-600">
        Click on the Vite and React logos to learn more
      </p>
>>>>>>> 1546544716855bc03cf2b9cb88f44e9b39228467
      <p>{hello.data}</p>
    </>
  );
}
