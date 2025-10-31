import type { NextApiRequest, NextApiResponse } from "next";

const tokens = [
  { name: "Crypto Cat", symbol: "CAT", balance: 5 },
  { name: "Moon Token", symbol: "MOON", balance: 12 }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(tokens);
}
