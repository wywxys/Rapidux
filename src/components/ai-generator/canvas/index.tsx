'use client';

import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ViewMode } from '../types';
import { useEffect, useState } from 'react';
import { Project } from '@/types/real-project';

interface CanvasProps {
  viewMode: ViewMode;
  generatedCode: string;
  currentProject?: Project;
}

export function Canvas({ viewMode, generatedCode, currentProject }: CanvasProps) {
  const [renderComponent, setRenderComponent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (currentProject) {
      // 渲染实际项目信息
      const ProjectRenderer = () => (
        <div className="space-y-8">
          {/* 项目标题 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{currentProject.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{currentProject.description}</p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {currentProject.framework} project
              </span>
              <span>•</span>
              <span className="capitalize">{currentProject.status}</span>
              <span>•</span>
              <span>Created {new Date(currentProject.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* 项目信息卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI代码生成区域 */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">AI Code Generation</h3>
                  <Sparkles className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-700 mb-2">Ready for AI Generation</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Use the AI input below to generate components for this project
                  </p>
                  <div className="text-xs text-gray-400">
                    Generated code will appear here
                  </div>
                </div>
              </div>
            </Card>

            {/* 项目结构信息 */}
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Project Structure</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Framework:</span>
                    <span className="capitalize font-medium">{currentProject.framework}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className={`capitalize font-medium ${
                      currentProject.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {currentProject.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Updated:</span>
                    <span className="font-medium">
                      {new Date(currentProject.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Project Path:</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {currentProject.path.split('/').slice(-2).join('/')}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 如果有生成的代码，显示预览 */}
          {generatedCode && (
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Generated Component Preview</h3>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Generated Code</h4>
                    <span className="text-xs text-gray-400">TypeScript React Component</span>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{generatedCode.slice(0, 500)}...</code>
                  </pre>
                </div>
              </div>
            </Card>
          )}

          {/* 项目功能说明 */}
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-4">What you can do with this project:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="font-medium mb-1">AI Generation</h4>
                <p className="text-gray-600">Generate React components with AI assistance</p>
              </div>
              <div className="p-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="font-medium mb-1">Real Files</h4>
                <p className="text-gray-600">Generated code is saved to actual project files</p>
              </div>
              <div className="p-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-medium mb-1">Export Ready</h4>
                <p className="text-gray-600">Download complete project structure anytime</p>
              </div>
            </div>
          </div>
        </div>
      );

      setRenderComponent(<ProjectRenderer />);
    } else {
      // 如果没有当前项目，显示欢迎界面
      const WelcomeRenderer = () => (
        <div className="text-center py-16">
          <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Welcome to Rapidux AI Generator</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Select a project from your dashboard or create a new one to start generating components with AI.
          </p>
          <Card className="max-w-md mx-auto p-6 text-left">
            <h3 className="font-semibold mb-4">Getting Started:</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li>1. Go back to your dashboard</li>
              <li>2. Create a new project or open an existing one</li>
              <li>3. Use AI to generate components</li>
              <li>4. Export your complete project</li>
            </ol>
          </Card>
        </div>
      );

      setRenderComponent(<WelcomeRenderer />);
    }
  }, [currentProject, generatedCode]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 overflow-auto bg-white dark:bg-gray-950">
        <div className="min-h-full p-8">
          {renderComponent}
        </div>
      </div>
    </div>
  );
}
