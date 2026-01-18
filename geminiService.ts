import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchAutomatedNews(lang: Language, category: string): Promise<{ news: NewsItem[], sources: any[] }> {
  const languageNames = {
    [Language.ENGLISH]: 'English',
    [Language.HINDI]: 'Hindi',
    [Language.ARABIC]: 'Arabic',
    [Language.URDU]: 'Urdu'
  };

  const prompt = `Act as a world-class news editor for "Al Hind News". 
  Fetch the latest top news headlines and summaries for the category "${category}" specifically from these sources: Al Jazeera, BBC, India Today, India Times, and New York Times.
  
  Format the output as a list of news articles. 
  For each article, provide:
  - title (in ${languageNames[lang]})
  - summary (a 2-3 sentence overview in ${languageNames[lang]})
  - source name
  - category
  - approximate timestamp
  
  Ensure the tone is professional and neutral. If the news is from India or global events affecting the Middle East/Asia, prioritize those.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            articles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  source: { type: Type.STRING },
                  category: { type: Type.STRING },
                  timestamp: { type: Type.STRING }
                },
                required: ["title", "summary", "source", "category"]
              }
            }
          }
        }
      },
    });

    const result = JSON.parse(response.text || '{"articles": []}');
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Enriching articles with IDs and mapping sources from grounding if possible
    const enrichedNews: NewsItem[] = result.articles.map((item: any, index: number) => ({
      ...item,
      id: `news-${Date.now()}-${index}`,
      url: groundingChunks[index]?.web?.uri || 'https://news.google.com',
      imageUrl: `https://picsum.photos/seed/${index + Math.random()}/800/450`
    }));

    return {
      news: enrichedNews,
      sources: groundingChunks
    };
  } catch (error) {
    console.error("Error fetching news from Gemini:", error);
    throw error;
  }
}
