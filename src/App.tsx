import { Outlet } from "react-router-dom";
import Navbar from "./customComponents/navbar";
import Footer from "./customComponents/footer";
import { Toaster } from "sonner";
import { store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </div>
    </Provider>
  );
}

export default App;
