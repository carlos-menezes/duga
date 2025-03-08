import { Box, Grid2 } from "@mui/material";
import { AppLayout } from "../../layouts/AppLayout";
import { useCredentialStore } from "../../store/CredentialStore";
import { AddCredentialForm } from "./components/AddCredentialForm";
import { CredentialCard } from "./components/CredentialCard";

const CredentialSelectionPage = () => {
  const credentialStore = useCredentialStore();

  return (
    <AppLayout
      slots={{
        main: {
          component: (
            <Box p={2}>
              <AddCredentialForm />
              <Grid2 container spacing={2}>
                {Object.entries(credentialStore.items).map(
                  ([credentialId, credential]) => (
                    <Grid2 key={credentialId} size={{ xs: 12, md: 6, lg: 3 }}>
                      <CredentialCard
                        credentialId={credentialId}
                        credential={credential}
                      />
                    </Grid2>
                  )
                )}
              </Grid2>
            </Box>
          ),
        },
      }}
    />
  );
};

export { CredentialSelectionPage };
