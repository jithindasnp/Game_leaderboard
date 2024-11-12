import player from "../../../models/playerModel";

const updateScoreService = async (body, res) => {
  const { playerId, score } = body;
  try {
    const updatedPlayer = await player.findOneAndUpdate(
      { id: playerId },
      { score: score },
      { new: true }
    );

    if (!updatedPlayer) {
      return handleResponse({
        res,
        statusCode: 404,
        message: "Player not found",
        data: null,
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        message: "Player score updated successfully",
        data: updatedPlayer,
      });
    }
  } catch (error) {
    console.error("Error while updating player score:", err);
    return res.status(500).json({ statusCode: 500, message: "Internal error" });
  }
};

const checkScoreService = async (body, res) => {
  try {
    const { playerId } = body;

    if (!playerId) {
      return res.status(400).json({
        statusCode: 400,
        message: "Player ID is required",
      });
    }

    const allPlayers = await player.find({}).sort({ score: -1, name: 1 });
    if (!allPlayers) {
      return res.status(400).json({
        statusCode: 400,
        message: "Something went wrong",
      });
    }

    const isPlayer = allPlayers.find((p) => p.id === playerId);

    if (!isPlayer) {
      return res.status(404).json({
        statusCode: 404,
        message: "Player not found",
      });
    }

    const playerRank = allPlayers.findIndex((p) => p.id === playerId) + 1;
    const isInTop10 = playerRank <= 10;

    const updatedPlayer = {
      id: isPlayer.id,
      name: isPlayer.name,
      score: isPlayer.score,
      rank: playerRank,
      isInTop10,
    };

    return res.status(200).json({
      statusCode: 200,
      message: "Player rank fetched successfully",
      data: updatedPlayer,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Error fetching player rank",
      error,
    });
  }
};

export default {
  updateScoreService,
  checkScoreService,
};
