import client from "./client";
import Cookies from "js-cookie";

// サインアップ
export const signUp = (params) => {
  return client.post("api/v1/auth", params);
};

// サインイン
export const signIn = (params) => {
  return client.post("api/v1/auth/sign_in", params);
};

// サインアウト
export const signOut = () => {
  return client.delete("api/v1/auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid"),
    },
  });
};

// ログインユーザーの取得
export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;

  return client.get("api/v1/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
