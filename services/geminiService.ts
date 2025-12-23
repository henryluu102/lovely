
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateMealDescription = async (mealName: string, ingredients: string[]) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy viết một đoạn mô tả hấp dẫn, ấm cúng kiểu cơm nhà làm cho món ăn: "${mealName}" với các nguyên liệu chính: ${ingredients.join(', ')}. Viết bằng tiếng Việt, tối đa 2 câu.`,
    });
    return response.text || "Món ăn nhà làm thơm ngon, đậm đà hương vị gia đình.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Món ăn nhà làm thơm ngon, đảm bảo vệ sinh.";
  }
};

export const suggestWeeklyMenu = async (preferences: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gợi ý thực đơn cơm nhà cho 7 ngày dựa trên sở thích: "${preferences}". Trả về danh sách tên các món ăn kèm mô tả ngắn gọn.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Không thể lấy gợi ý thực đơn lúc này.";
  }
};
