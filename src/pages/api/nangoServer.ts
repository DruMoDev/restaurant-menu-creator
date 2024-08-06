import { Nango as NangoNode } from "@nangohq/node";

const nangoSecretKey: string = process.env.NEXT_PUBLIC_SECRET_NANGO_KEY ?? "";

export const nangoNode = new NangoNode({ secretKey: nangoSecretKey });
