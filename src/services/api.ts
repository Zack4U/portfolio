const API_URL = import.meta.env.VITE_PORTFOLIO_API;

export const sendEmail = async (
  name: string,
  email: string,
  message: string
) => {
  try {
    const response = await fetch(`${API_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from_email: email,
        from_name: name,
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email");
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
