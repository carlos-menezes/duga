import { Box, Typography } from "@mui/material";
import { theme } from "../../../lib/mui";

export type TFooterProps = object;

const Footer = () => {
  return (
    <Box
      p={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderTop={`1px solid ${theme.palette.divider}`}
    >
      <Box></Box>
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Typography
          fontWeight={theme.typography.fontWeightBold}
          variant="overline"
        >
          DUGA IS LICENSED UNDER THE MIT LICENSE.
        </Typography>
      </Box>
      <Box></Box>
    </Box>
  );
};

export { Footer };
