import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

//--------------here send the question of the user and get its answer---------------
export const askAI = async ({ question, chatId }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/chat/ask`,
      { question, chatId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Axios error", error);
    throw error.response?.data || { message: "Server not reachable" };
  }
};

//-------------------here call the backend api to get all the chat titles to show in sidebar-----------------------
export const fetchChatTitles = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/chat/titles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Axios error", error);
    throw error.response?.data || { message: "Error fetching chat titles" };
  }
};

//-----------------chat fetch karna on the basis of id (jab user sidebar pr click kare tab)-----------------------
export const fetchChatById = async (chatId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/chat/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Axios error", error);
    throw error.response?.data || { message: "Error fetching data" };
  }
};

//--------------questions fetch karna of particular topic on the basis of button click ------------------
export const getQuestionsByTopic = async (topic) => {
  try{
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/chat/topic`,
      {
        params: {topic},
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  }
  catch(error){
    console.error("Axios error", error);
    throw error.response?.data || {message: "Something went wrong"}
  }
}
