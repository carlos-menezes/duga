import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Skeleton,
} from "@mui/material";

export const LivestreamSubcategoryListSkeleton = () => {
  return (
    <List>
      {Array.from({ length: 20 }).map((_, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <Skeleton variant="text" width="100%" sx={{ fontSize: "1.4rem" }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
