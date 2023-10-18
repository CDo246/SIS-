import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { NavBar } from "./nav/NavBar.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { About } from "./pages/About.tsx";
import { createWSClient, httpBatchLink, wsLink } from "@trpc/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/About",
    element: <About />,
  },
]);

const trpcHost = import.meta.env.DEV ? "localhost:4000" : location.host;
const secure = location.protocol === "https:";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        wsLink({
          client: createWSClient({
            url: `${secure ? "wss" : "ws"}://${trpcHost}/trpc/socket`,
          }),
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
