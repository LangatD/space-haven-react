const API_URL = process.env.REACT_APP_API_URL;

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await fetch(`${API_URL}/api/refresh`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${refreshToken}` }
    });
  
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      return data.access_token;
    } else {
      console.error("Refresh token expired. Please log in again.");
      return null;
    }
  };
