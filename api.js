import axios from "axios";

export const verifyClaim = async (claimText) => {
  const response = await axios.post(
    "http://localhost:8001/verify-claim",
    {
      claim: claimText,
    }
  );

  return response.data;
};