import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generates a message using the Gemini model.
 * @param prompt - The prompt to send to the model.
 * @returns The generated text content.
 */
export const generateAIMessage = async (prompt: string): Promise<string> => {
    if (!ai) {
        return Promise.resolve("AI service is not configured. (Missing API_KEY)");
    }

    try {
        console.log("Sending prompt to Gemini:", prompt);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a helpful assistant for a youth golf academy. You help parents and coaches communicate effectively. Be friendly, concise, and professional.",
                temperature: 0.7,
                topP: 1,
                topK: 32,
                // Disable thinking for faster, more conversational responses in the chat context.
                thinkingConfig: { thinkingBudget: 0 }
            }
        });

        const text = response.text;
        console.log("Received response from Gemini:", text);
        return text.trim();

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate AI response.");
    }
};

/**
 * Generates a swing analysis using the Gemini model.
 * @param studentNotes - The notes provided by the student.
 * @param studentName - The name of the student.
 * @param studentAge - The age of the student.
 * @returns The generated text content.
 */
export const analyzeSwing = async (studentNotes: string, studentName: string, studentAge: number): Promise<string> => {
    if (!ai) {
        return Promise.resolve("AI service is not configured. (Missing API_KEY)");
    }

    const prompt = `
        You are a world-class youth golf coach providing remote video analysis.
        A student named ${studentName}, who is ${studentAge} years old, has submitted a swing for review.

        Their notes are: "${studentNotes}"

        Based ONLY on the student's notes, provide structured, positive, and actionable feedback.
        Assume you are looking at a video and the notes are highlighting their main concern.
        Address common faults related to their notes for a golfer of this age.
        
        Structure your response in Markdown format with the following sections:
        - **AI Swing Analysis:** (A brief intro)
        - **Potential Strengths:** (Based on what might be going right if they are focusing on this issue, be positive)
        - **Areas for Improvement:** (Directly address the student's notes with clear, simple advice)
        - **Drills to Practice:** (List 1-2 simple, effective drills they can do)

        Keep the tone encouraging and easy for a young person to understand.
    `;

    try {
        console.log("Sending swing analysis prompt to Gemini:", prompt);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a helpful and encouraging youth golf coach.",
                temperature: 0.8,
                topP: 1,
                topK: 40,
            }
        });

        const text = response.text;
        console.log("Received swing analysis from Gemini:", text);
        return text.trim();

    } catch (error) {
        console.error("Error calling Gemini API for swing analysis:", error);
        throw new Error("Failed to generate AI swing analysis.");
    }
};