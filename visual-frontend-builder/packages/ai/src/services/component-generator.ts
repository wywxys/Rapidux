import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const COMPONENT_PROMPT = `
You are an expert React/Next.js developer. Generate a functional React component based on the user's description.

Requirements:
1. Use modern React patterns (hooks, functional components)
2. Include TypeScript types
3. Use Tailwind CSS for styling
4. Make the component responsive and accessible
5. Include proper prop validation
6. Return only the component code, no explanations

User request: {prompt}
Style preference: {style}
Framework: {framework}

Generate a complete, production-ready component:
`;

export async function generateComponent(
  prompt: string, 
  style: string = 'modern', 
  framework: string = 'react'
): Promise<string> {
  try {
    const model = openai('gpt-4o-mini'); // 使用更便宜的模型
    
    const { text } = await generateText({
      model,
      prompt: COMPONENT_PROMPT
        .replace('{prompt}', prompt)
        .replace('{style}', style)
        .replace('{framework}', framework),
      temperature: 0.7,
      maxTokens: 2000,
    });

    return text;
  } catch (error) {
    console.error('Error in generateComponent:', error);
    
    // 降级到备用模型
    try {
      const fallbackModel = anthropic('claude-3-haiku-20240307');
      const { text } = await generateText({
        model: fallbackModel,
        prompt: COMPONENT_PROMPT
          .replace('{prompt}', prompt)
          .replace('{style}', style)
          .replace('{framework}', framework),
        temperature: 0.7,
        maxTokens: 2000,
      });
      
      return text;
    } catch (fallbackError) {
      console.error('Fallback model also failed:', fallbackError);
      throw new Error('Failed to generate component with all available models');
    }
  }
}
