import { getEarnings } from "../models/earningsModel.js";

export async function listEarnings(req, res, next) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "You must be logged in to view your earnings.",
      });
    }

    const ownerId = Number(req.user.id);

    const earnings = await getEarnings(ownerId);

    res.json(earnings);
  } catch (error) {
    next(error);
  }
}