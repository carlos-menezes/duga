import { Box, Grid2, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import { theme } from "../../../../../lib/mui";
import {
  getChannelsForCategory,
  getLivestream,
} from "../../../../../lib/xtream/channels";
import { TLivestream } from "../../../../../lib/xtream/types";
import { useCredentialStore } from "../../../../../store/CredentialStore";
import {
  LivestreamSubcategoryList,
  TLivestreamSubcategoryListProps,
} from "./components/LivestreamSubcategoryList";

type TLivestreamsTabContentProps = {
  categoryId: number;
};

export const LivestreamsTabContent = ({
  categoryId,
}: TLivestreamsTabContentProps) => {
  const credentialStore = useCredentialStore();

  const [selectedLivestream, setSelectedLivestream] = useState<TLivestream>();
  const [playerUrl, setPlayerUrl] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();

  const {
    isPending: isLivestreamListPending,
    isError: isLivestreamListError,
    data: livestreamListData,
    error: livestreamListError,
  } = useQuery({
    queryKey: ["livestreams", categoryId],
    queryFn: async () => {
      if (!credentialStore.activeCredential) return;

      return getChannelsForCategory({
        credential: credentialStore.activeCredential,
        categoryId,
      });
    },
    initialData: [],
  });

  useEffect(() => {
    if (!credentialStore.activeCredential) return;
    if (!selectedLivestream) return;

    const url = getLivestream({
      credential: credentialStore.activeCredential,
      livestreamId: selectedLivestream.stream_id,
    });

    setPlayerUrl(url.toString());
  }, [credentialStore.activeCredential, selectedLivestream]);

  const filteredData = useMemo(() => {
    if (!livestreamListData) return;
    if (!searchValue) return livestreamListData;

    const filteredData = livestreamListData.filter((livestream) =>
      livestream.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return filteredData;
  }, [livestreamListData, searchValue]);

  if (isLivestreamListError)
    return <span> Error: {livestreamListError.message} </span>;
  if (isLivestreamListPending) return "Loading...";

  const handleOnSelected: TLivestreamSubcategoryListProps["onSelected"] = (
    livestream
  ) => {
    setSelectedLivestream(livestream);
  };

  return (
    <Grid2 container overflow="hidden" height="100%">
      <Grid2
        height="100%"
        size={{ xs: 1, md: 2 }}
        pb={4}
        overflow="hidden"
        display="flex"
        flexDirection="column"
        borderRight={`1px solid ${theme.palette.divider}`}
      >
        <TextField
          variant="outlined"
          placeholder="SEARCH"
          fullWidth
          onChange={({ target: { value } }) => setSearchValue(value)}
        />
        <Box overflow="scroll">
          <LivestreamSubcategoryList
            data={filteredData}
            onSelected={handleOnSelected}
            selected={selectedLivestream}
          />
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 11, md: 10 }} height="100%" overflow="scroll">
        {selectedLivestream ? (
          <Box display="flex" flexDirection="column" overflow="scroll">
            <Box flexGrow={1}>
              <ReactPlayer
                url={playerUrl}
                controls={true}
                playing={true}
                width="100%"
                height="auto"
                config={{
                  file: {
                    forceHLS: true,
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                background: theme.palette.background.paper,
              }}
            >
              epg will be here... eventually
            </Box>
          </Box>
        ) : (
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="overline">
              Select a livestream from the list on the left.
            </Typography>
          </Box>
        )}
      </Grid2>

      {playerUrl}
    </Grid2>
  );
};
