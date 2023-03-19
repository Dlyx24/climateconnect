import { apiRequest } from "./apiOperations";

export async function getMessageFromServer(message_id, token, locale) {
  try {
    const resp = await apiRequest({
      method: "GET",
      url: "/api/message/" + message_id + "/",
      token: token,
      locale: locale,
    });
    return resp.data;
  } catch (error) {
    console.error(error);
  }
}

export async function startPrivateChat(profile, token, locale) {
  try {
    const resp = await apiRequest({
      method: "POST",
      url: "/api/start_private_chat/",
      payload: { profile_url_slug: profile.url_slug },
      token: token,
      locale: locale,
    });
    return resp.data;
  } catch (e) {
    throw e;
  }
}

export async function joinIdeaGroupChat({ idea, token, locale }) {
  try {
    const resp = await apiRequest({
      method: "POST",
      url: `/api/ideas/${idea.url_slug}/join_chat/`,
      payload: {},
      token: token,
      locale: locale,
    });
    return resp.data;
  } catch (error) {
    console.error(error);
  }
}
