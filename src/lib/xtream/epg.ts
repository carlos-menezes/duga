import { TCredential } from "../../store/CredentialStore";

type TGetLivestreamEpgParams = {
  credential: TCredential;
  streamId: number;
};

type TGetLivestreamEpgReturnType = {
  epg_listings: Array<{
    id: string;
    epg_id: string;
    title: string;
    lang: string;
    start: string;
    end: string;
    description: string;
    channel_id: string;
    start_timestamp: string;
    stop_timestamp: string;
    stream_id: string;
  }>;
};

export const getLivestreamEpg = async ({
  credential,
  streamId,
}: TGetLivestreamEpgParams): Promise<TGetLivestreamEpgReturnType> => {
  const url = new URL("player_api.php", credential.provider.url);

  url.searchParams.append("username", credential.user.name);
  url.searchParams.append("password", credential.user.password);
  url.searchParams.append("action", "get_short_epg");
  url.searchParams.append("stream_id", `${streamId}`);

  return await fetch(url).then((res) => res.json());
};
