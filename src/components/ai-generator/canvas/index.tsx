import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ViewMode } from '../types';

interface CanvasProps {
  viewMode: ViewMode;
  generatedCode: string;
}

export function Canvas({ viewMode, generatedCode }: CanvasProps) {
  return (
    <main className="flex-1 flex flex-col">
      {/* Canvas Area */}
      <div className="flex-1 bg-muted/30 p-8 overflow-auto">
        <div className={`mx-auto h-full ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'}`}>
          {generatedCode ? (
            <Card className="p-8">
              <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-medium">JD</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                      <p className="text-gray-600">john@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center -mt-16">
                <div className="mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                    <Sparkles className="relative h-16 w-16 mx-auto text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Describe the component you want to create
                </h3>
                <p className="text-muted-foreground text-base">
                  AI will generate React + Tailwind CSS code for you
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
