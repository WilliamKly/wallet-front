import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { AppProvider } from "./contexts";

export function App() {

  return (
    <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>
    </BrowserRouter>
  )
}
