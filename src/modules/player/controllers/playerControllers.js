const updateScore = async (req, res) => {
  try {
    const updateScoreResponse = await authenticationServices.updateScoreService(
      req.body,
      res
    );
    return updateScoreResponse;
  } catch (error) {
    console.log("error", error);
  }
};

const checkScore = async (req, res) => {
  try {
    const checkScoreResponse = await authenticationServices.checkScoreService(
      req.body,
      res
    );
    return checkScoreResponse;
  } catch (error) {
    console.log("error", error);
  }
};

export default { updateScore, checkScore };
