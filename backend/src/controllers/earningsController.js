import { getEarnings } from "../models/earningsModel.js";

export async function listEarnings(req, res, next) {
  try {
    res.json(await getEarnings(Number(process.env.OWNER_ID || 1)));
  } catch (error) {
    next(error);
  }
}
