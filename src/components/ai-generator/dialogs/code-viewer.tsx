import { Copy, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeViewerDialogProps {
  showCodeDialog: boolean;
  setShowCodeDialog: (show: boolean) => void;
  generatedCode: string;
}

export function CodeViewerDialog({
  showCodeDialog,
  setShowCodeDialog,
  generatedCode,
}: CodeViewerDialogProps) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode || '// No code generated yet');
  };

  return (
    <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
      <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Generated Code
          </DialogTitle>
          <DialogDescription>
            View and copy the generated code for your component
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="relative">
              <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code className="text-foreground">
                  {generatedCode || `// Generated code will appear here
function AIComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          AI Component Generator
        </h1>
        <p className="text-gray-600 mb-6">
          This is a sample generated component. Use the AI input to create your own custom components.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default AIComponent;`}
                </code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleCopyCode}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
