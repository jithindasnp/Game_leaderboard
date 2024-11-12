const leaderBoardService = async (body, res) => {
  try {
    const { search } = body;

    if (search) {
      const playerData = await player.findOne({
        $or: [
          { name: { $regex: new RegExp(search, "i") } },
          { id: search },
        ],
      });

      if (playerData) {
        const allPlayers = await player.find({}).sort({ score: -1, name: 1 });

        const rank =
          allPlayers.findIndex(
            (p) => p.id.toString() === playerData.id.toString()
          ) + 1;

        res.status(200).json({
          statusCode: 200,
          message: "Player details fetched",
          player: {
            rank,
            name: playerData.name,
            id: playerData.id,
            score: playerData.score,
            email: playerData.email,
          },
        });
      } else {
        return res.status(404).json({
          statusCode: 404,
          message: "Player not found",
        });
      }
    } else {
      const topPlayers = await player
        .find({})
        .sort({ score: -1, name: 1 })
        .limit(10);

      if (topPlayers) {
        const leaderboard = topPlayers.map((player, index) => ({
          rank: index + 1,
          name: player.name,
          id: player.id,
          score: player.score,
          email: player.email,
        }));
        res.status(200).json({
          statusCode: 200,
          message: "Leaderboard details fetched",
          leaderboard,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Something went wrong",
        });
      }
    }
  } catch (error) {
    console.error("Error while fetching leaderboard:", error);
    return res.status(500).json({ statusCode: 500, message: "Internal error" });
  }
};

export default {
  leaderBoardService,
};
