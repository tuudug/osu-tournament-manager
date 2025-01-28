import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";
import { OsuProfile } from "next-auth/providers/osu";

export default function OsuProvider<P extends OsuProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "osu",
    name: "Osu!",
    type: "oauth",
    token: "https://osu.ppy.sh/oauth/token",
    authorization: {
      url: "https://osu.ppy.sh/oauth/authorize",
      params: {
        scope: "identify public",
      },
    },
    userinfo: "https://osu.ppy.sh/api/v2/me",
    profile(profile) {
      return {
        id: profile.id,
        email: null,
        name: profile.username,
        image: profile.avatar_url,
      };
    },
    options,
  };
}
