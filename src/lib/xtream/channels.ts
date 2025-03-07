import { TCredential } from "../../store/CredentialStore";
import { TLivestream } from "./types";

export type TGetChannelsForCategoryParams = {
  credential: TCredential;
  categoryId: number;
};

export const getChannelsForCategory = async ({
  credential,
  categoryId,
}: TGetChannelsForCategoryParams): Promise<TLivestream[]> => {
  const url = new URL("player_api.php", credential.provider.url);

  url.searchParams.append("username", credential.user.name);
  url.searchParams.append("password", credential.user.password);
  url.searchParams.append("action", "get_live_streams");
  url.searchParams.append("category_id", `${categoryId}`);

  return await fetch(url).then((res) => res.json());
};

export type TGetLivestreamParams = {
  credential: TCredential;
  livestreamId: number;
};

export const getLivestream = ({
  credential,
  livestreamId,
}: TGetLivestreamParams) => {
  return new URL(
    `live/${credential.user.name}/${credential.user.password}/${livestreamId}.m3u8`,
    credential.provider.url
  );
};
