import * as crypto from "crypto";
import { config } from "dotenv";
import * as OAuth1a from "oauth-1.0a";

config();

export const auth = (request: { method: string; url: string }) => {
  const oauth = new OAuth1a({
    consumer: {
      key: process.env.TWITTER_API_KEY as string,
      secret: process.env.TWITTER_API_SECRET_KEY as string,
    },
    signature_method: "HMAC-SHA1",
    hash_function(baseString: string, key: string) {
      return crypto.createHmac("sha1", key).update(baseString).digest("base64");
    },
  });

  const authorization = oauth.authorize(request, {
    key: process.env.TWITTER_ACCESS_TOKEN as string,
    secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
  });

  return oauth.toHeader(authorization).Authorization;
};
