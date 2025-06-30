import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { generateComponent } from './services/component-generator.js';

const app = new Hono();

app.use('*', cors());
app.use('*', logger());

app.post('/api/generate-component', async (c) => {
  try {
    const { prompt, style = 'modern', framework = 'react' } = await c.req.json();
    
    if (!prompt) {
      return c.json({ error: 'Prompt is required' }, 400);
    }

    const component = await generateComponent(prompt, style, framework);
    return c.json({ component });
  } catch (error) {
    console.error('Error generating component:', error);
    return c.json({ error: 'Failed to generate component' }, 500);
  }
});

app.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'ai-service' });
});

const port = process.env.PORT || 8000;
console.log(`AI Service running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
