import { Outlet } from "react-router-dom";
import Navbar from "./customComponents/navbar";
import Footer from "./customComponents/footer";
import { Toaster } from "sonner";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Hearts } from "react-loader-spinner";
import { useAuthInit } from "./lib/useAuthInit";

// Lives inside <Provider> so it can use the store. Runs the auth check on load
// and holds the UI until we know whether the user is logged in.
function AppShell() {
  const loading = useAuthInit();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <Hearts
          height={80}
          width={80}
          color="var(--color-primary)"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        toastOptions={{
          classNames: {
            toast: "!bg-background !text-foreground !border-border",
            title: "!text-foreground",
            description: "!text-muted-foreground",
            success: "!bg-orange-100 !text-orange-700 !border-orange-200",
            error: "!bg-red-100 !text-red-700 !border-red-200",
            actionButton: "!bg-primary !text-primary-foreground",
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppShell />
    </Provider>
  );
}

export default App;
