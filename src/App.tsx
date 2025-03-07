import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { theme } from "./lib/mui";
import { queryClient } from "./lib/react-query";
import { CredentialSelectionPage } from "./pages/CredentialSelectionPage";
import { MainPage } from "./pages/MainPage";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route index element={<CredentialSelectionPage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export { App };
