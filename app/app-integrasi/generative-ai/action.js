"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_AI_KEY);

export async function submitPrompt(formData) {
  const prompt = formData.get("prompt");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Count tokens in a prompt without calling text generation.
    const countResult = await model.countTokens(prompt);

    // Here you would typically send the prompt to your AI service
    // For this example, we'll just simulate a response
    const result = await model.generateContent(prompt);

    // In a real application, you might store the response in a database
    // For this example, we'll just revalidate the page
    revalidatePath("/");

    return {
      success: true,
      response: result.response.text(),
      countResult: countResult.totalTokens,
    };
  } catch (e) {
    return { success: false, response: e.message, countResult: 0 };
  }
}
