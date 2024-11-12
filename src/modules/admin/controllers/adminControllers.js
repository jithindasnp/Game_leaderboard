

const leaderBoard = async (req, res) => {
  try {
    const leaderBoardResponse = await authenticationServices.leaderBoardService(
      req.body,
      res
    );
    return leaderBoardResponse;
  } catch (error) {
    console.log("error", error);
  }
};

export default {  leaderBoard };
