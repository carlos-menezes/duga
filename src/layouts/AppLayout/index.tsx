import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Header, THeaderProps } from "../../components/molecules/Header";
import { Footer } from "../../components/molecules/Footer";

export type TSlot = {
  component: ReactNode;
};

type TAppLayoutProps = {
  slots: {
    header?: THeaderProps;
    main: TSlot;
  };
};

const AppLayout = ({ slots }: TAppLayoutProps) => {
  return (
    <Box height="100vh" width="100vw">
      <Box display="flex" flexDirection="column" height="100%">
        <Header {...slots.header} />
        <Box overflow="hidden" flexGrow={1}>
          {slots.main.component}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export { AppLayout };
