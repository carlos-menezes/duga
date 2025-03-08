import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import {
  TCredential,
  useCredentialStore,
} from "../../../../store/CredentialStore";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router";
import { theme } from "../../../../lib/mui";
import { toast } from "sonner";

type TCredentialCardProps = {
  credentialId: string;
  credential: TCredential;
};

export const CredentialCard = ({
  credential,
  credentialId,
}: TCredentialCardProps) => {
  const credentialStore = useCredentialStore();
  const navigate = useNavigate();

  const handleOnClickActionArea: MouseEventHandler<HTMLButtonElement> = () => {
    toast(credentialId);
    credentialStore.setActiveCredential(credentialId);
    navigate("/main");
  };

  const handleOnClickRemove: MouseEventHandler<HTMLButtonElement> = () => {
    credentialStore.removeCredential(credentialId);
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleOnClickActionArea}>
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body1"
              fontFamily="monospace"
              fontWeight={theme.typography.fontWeightBold}
            >
              {credential.provider.name ?? "-"}
            </Typography>
            <Typography variant="overline">
              {credential.provider.url}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="small" disabled>
          Edit
        </Button>
        <Button variant="outlined" size="small" onClick={handleOnClickRemove}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};
