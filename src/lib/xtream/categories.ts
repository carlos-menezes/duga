import { TCredential } from "../../store/CredentialStore";

export type TGetCategoryParams = {
  credential: TCredential;
};

export type TGetCategoryReturnType = Array<{
  category_id: string;
  category_name: string;
  parent_id: number;
}>;

export const getLivestreamsCategories = async ({
  credential,
}: TGetCategoryParams): Promise<TGetCategoryReturnType> => {
  const url = new URL("player_api.php", credential.provider.url);

  url.searchParams.append("username", credential.user.name);
  url.searchParams.append("password", credential.user.password);
  url.searchParams.append("action", "get_live_categories");

  return await fetch(url).then((res) => res.json());
};

export const getVodCategories = async ({
  credential,
}: TGetCategoryParams): Promise<TGetCategoryReturnType> => {
  const url = new URL("player_api.php", credential.provider.url);

  url.searchParams.append("username", credential.user.name);
  url.searchParams.append("password", credential.user.password);
  url.searchParams.append("action", "get_vod_categories");

  return await fetch(url).then((res) => res.json());
};

export const getSeriesCategories = async ({
  credential,
}: TGetCategoryParams): Promise<TGetCategoryReturnType> => {
  const url = new URL("player_api.php", credential.provider.url);

  url.searchParams.append("username", credential.user.name);
  url.searchParams.append("password", credential.user.password);
  url.searchParams.append("action", "get_series_categories");

  return await fetch(url).then((res) => res.json());
};
