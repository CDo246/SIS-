import { useState } from "react";
import { MainPage } from "./pages/MainPage";
import { NavBar } from "./nav/NavBar.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { About } from './pages/About.tsx';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
          // You can pass any HTTP headers you wish here
          async headers() {
            return {};
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <About />
        <MainPage />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
