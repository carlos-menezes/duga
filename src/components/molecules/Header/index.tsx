import { KeyboardBackspaceSharp } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router";
import { version } from "../../../../package.json";
import { theme } from "../../../lib/mui";

export type THeaderProps = {
  back?: {
    href: "/" | "/main";
  };
};

const Header = ({ back }: THeaderProps) => {
  return (
    <Box
      p={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom={`1px solid ${theme.palette.divider}`}
    >
      <Box>
        {back ? (
          <NavLink to={back.href}>
            <IconButton aria-label="back" size="small">
              <KeyboardBackspaceSharp />
            </IconButton>
          </NavLink>
        ) : (
          <Box width={34} height={34} />
        )}
      </Box>
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography
          fontWeight={theme.typography.fontWeightBold}
          variant="overline"
        >
          duga (дуга)
        </Typography>
        <Typography variant="overline">VERSION {version}</Typography>
      </Box>
      <Box></Box>
    </Box>
  );
};

export { Header };
