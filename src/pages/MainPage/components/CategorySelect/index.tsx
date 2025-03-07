import { Tab, Tabs, TabsOwnProps } from "@mui/material";

type TCategorySelectProps = {
  selectedTab?: number;
  setSelectedTab?: (newValue: number) => void;
  labels: {
    name: string;
    disabled?: boolean;
  }[];
  tabsProps?: TabsOwnProps;
};

export const CategorySelect = ({
  selectedTab,
  setSelectedTab,
  labels,
  tabsProps,
}: TCategorySelectProps) => {
  const handleOnChangeTab: TabsOwnProps["onChange"] = (_, newValue) =>
    setSelectedTab?.(newValue);

  return (
    <Tabs
      value={selectedTab}
      onChange={handleOnChangeTab}
      variant="scrollable"
      scrollButtons="auto"
      {...tabsProps}
    >
      {Object.values(labels).map((label, index) => (
        <Tab key={index} label={label.name} disabled={label.disabled} />
      ))}
    </Tabs>
  );
};
