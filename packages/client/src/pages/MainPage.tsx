//import { useState } from "react";
import { trpc } from "../utils/trpc";

export function MainPage() {
  const hello = trpc.greeting.useQuery();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank"></a>
      </div>
      <body>
        <div id="footer">
          <button>Publish</button>
          <textarea
            name="Enter Topic"
            rows={2}
            cols={50}
            placeholder="Enter Topic Here...."
          ></textarea>
        </div>
      </body>
      <p>{hello.data}</p>
    </>
  );
}
