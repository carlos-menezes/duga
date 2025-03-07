import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { TLivestream } from "../../../../../../../lib/xtream/types";
import { LivestreamSubcategoryListSkeleton } from "./skeleton";

export type TLivestreamSubcategoryListProps = {
  data?: TLivestream[];
  selected?: TLivestream;
  onSelected: (livestream: TLivestream) => void;
};

export const LivestreamSubcategoryList = ({
  data,
  onSelected,
  selected,
}: TLivestreamSubcategoryListProps) => {
  if (!data) return <LivestreamSubcategoryListSkeleton />;

  const handleOnClick = (index: number) => {
    onSelected(data[index]);
  };

  return (
    <List>
      {data.map((livestream, index) => (
        <ListItem
          disablePadding
          key={livestream.stream_id}
          onClick={() => handleOnClick(index)}
        >
          <ListItemButton selected={livestream === selected}>
            <ListItemAvatar>
              <Avatar
                variant="square"
                alt={`${livestream.name} logo`}
                src={livestream.stream_icon}
                slotProps={{
                  img: {
                    style: {
                      objectFit: "contain",
                    },
                  },
                }}
              />
            </ListItemAvatar>
            <ListItemText
              slotProps={{
                primary: {
                  sx: {
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    display: "block",
                  },
                },
              }}
              primary={livestream.name}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
