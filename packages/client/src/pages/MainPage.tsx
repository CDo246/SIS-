<<<<<<< HEAD
//import { useState } from "react";
=======
// import { useState } from "react";
>>>>>>> acc6622e074476cf21fdc4832de418315d4a444f
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

=======
>>>>>>> acc6622e074476cf21fdc4832de418315d4a444f
      <body>
        <div id="footer">
          <button>Publish</button>
<<<<<<< HEAD
          <textarea name="Enter Topic" placeholder="Enter Topic Here...."></textarea>
        </div>
      </body>


=======
          <textarea
            name="Enter Topic"
            rows={2}
            cols={50}
            placeholder="Enter Topic Here...."
          ></textarea>
        </div>
      </body>
>>>>>>> acc6622e074476cf21fdc4832de418315d4a444f
      <p>{hello.data}</p>
    </>
  );
}
