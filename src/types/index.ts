export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: string;
  lastActiveAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  userId: string;
  templateId?: string;
  generatedCode: string;
  status: 'draft' | 'generating' | 'ready';
  settings: {
    viewMode: 'code' | 'preview' | 'split';
    fontSize: number;
    borderRadius: number;
    autoSaveCode: boolean;
    showLineNumbers: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'web-app' | 'landing-page' | 'dashboard' | 'e-commerce' | 'component';
  framework: 'nextjs' | 'react' | 'vue' | 'svelte';
  features: string[];
  basePrompt: string;
  exampleCode: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
}
