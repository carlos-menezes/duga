import {
  Box,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import base64 from "base-64";
import { useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import utf8 from "utf8";
import { theme } from "../../../../../lib/mui";
import {
  getChannelsForCategory,
  getLivestream,
} from "../../../../../lib/xtream/channels";
import { getLivestreamEpg } from "../../../../../lib/xtream/epg";
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

  const { data: livestreamEpgData } = useQuery({
    queryKey: ["livestream-epg", categoryId, selectedLivestream?.stream_id],
    queryFn: async () => {
      if (!credentialStore.activeCredential) return;

      if (!selectedLivestream) return;

      return getLivestreamEpg({
        credential: credentialStore.activeCredential,
        streamId: selectedLivestream.stream_id,
      });
    },
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
    <Grid2 container height="100%">
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
      <Grid2 size={{ xs: 11, md: 10 }} overflow="scroll" height="100%" pb={12}>
        {selectedLivestream ? (
          <Box display="flex" flexDirection="column">
            <Box flex={1}>
              <ReactPlayer
                url={playerUrl}
                controls={true}
                playing={true}
                width="100%"
                height="100%"
                style={{ aspectRatio: "16/9" }}
                config={{
                  file: {
                    forceHLS: true,
                  },
                }}
              />
            </Box>
            <Box>
              <TableContainer sx={{ maxWidth: "100%" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="overline">START</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="overline">TITLE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="overline">DESCRIPTION</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {livestreamEpgData &&
                    livestreamEpgData.epg_listings.length > 0 ? (
                      livestreamEpgData?.epg_listings.map((epg) => (
                        <TableRow key={epg.id}>
                          <TableCell sx={{ minWidth: 200 }}>
                            {new Date(epg.start).toLocaleTimeString()} -{" "}
                            {new Date(epg.end).toLocaleTimeString()}
                          </TableCell>
                          <TableCell>
                            {utf8.decode(base64.decode(epg.title))}
                          </TableCell>
                          <TableCell>
                            {epg.description.length > 0
                              ? utf8.decode(base64.decode(epg.description))
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography
                            variant="overline"
                            fontWeight={theme.typography.fontWeightBold}
                          >
                            No EPG data for this livestream.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
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
