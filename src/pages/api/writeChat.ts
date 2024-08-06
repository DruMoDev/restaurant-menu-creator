import type { NextApiRequest, NextApiResponse } from "next";
import { nangoNode } from "./nangoServer";

type ResponseData = {
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const channelId = "C07FD3N5FGS";

  const records = await nangoNode.listRecords({
    providerConfigKey: "slack",
    connectionId: "restaurants-app-connection",
    model: "SlackUser",
  });
  res.status(200).json({ records });
}
