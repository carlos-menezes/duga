import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { AppLayout } from "../../layouts/AppLayout";
import { theme } from "../../lib/mui";
import { useCredentialStore } from "../../store/CredentialStore";
import { AddCredentialForm } from "./components/AddCredentialForm";

const CredentialSelectionPage = () => {
  const credentialStore = useCredentialStore();
  const navigate = useNavigate();

  return (
    <AppLayout
      slots={{
        main: {
          component: (
            <Box p={2}>
              <AddCredentialForm />
              <Grid2 container spacing={2}>
                {Object.entries(credentialStore.items).map(
                  ([key, { provider }]) => (
                    <Grid2 key={key} size={{ xs: 12, md: 6, lg: 3 }}>
                      <Card variant="outlined">
                        <CardActionArea
                          onClick={() => {
                            credentialStore.setActiveCredential(key);
                            navigate("/main");
                          }}
                        >
                          <CardContent>
                            <Box display="flex" flexDirection="column">
                              <Typography
                                variant="body1"
                                fontFamily="monospace"
                                fontWeight={theme.typography.fontWeightBold}
                              >
                                {provider.name ?? "-"}
                              </Typography>
                              <Typography variant="overline">
                                {provider.url}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button variant="contained" size="small" disabled>
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              credentialStore.removeCredential(key);
                            }}
                          >
                            Remove
                          </Button>
                        </CardActions>
                      </Card>
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
