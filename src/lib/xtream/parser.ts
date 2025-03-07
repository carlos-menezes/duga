import { TCredential } from "../../store/CredentialStore";

type TXtreamUrlToCredentialParams = {
  url: string;
  name?: string;
};

export const xtreamUrlToCredential = ({
  url,
  name,
}: TXtreamUrlToCredentialParams): TCredential => {
  const urlParts = new URL(url);

  const username = urlParts.searchParams.get("username");
  if (!username) throw new Error("Username not found in URL");

  const password = urlParts.searchParams.get("password");
  if (!password) throw new Error("Password not found in URL");

  return {
    type: "xtream",
    provider: {
      name,
      url: urlParts.origin,
    },
    user: {
      name: username,
      password,
    },
  };
};
