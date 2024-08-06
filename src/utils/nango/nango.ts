import Nango from "@nangohq/frontend";

const nangoPublicKey: string = process.env.NEXT_PUBLIC_PUBLIC_NANGO_KEY ?? "";

const nangoFrontend = new Nango({ publicKey: nangoPublicKey });

const connectToNango = async () => {
  await nangoFrontend
    .auth("slack", "restaurants-app-connection", { user_scope: ["admin", "chat:write", "users:read", "channels:history", "groups:history", "mpim:history", "im:history", "channels:read"] })
    .then((result: { providerConfigKey: string; connectionId: string }) => {
      console.log(result);
    })
    .catch((err: { message: string; type: string }) => {
      console.log(err.message);
    });
};

export default connectToNango;
