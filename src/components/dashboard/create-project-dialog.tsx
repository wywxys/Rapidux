'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { CreateProjectRequest } from '@/types/real-project';

interface Template {
  id: string;
  name: string;
  description: string;
  framework: string;
  tags: string[];
  preview?: string;
}

interface CreateProjectDialogProps {
  onProjectCreated?: () => void;
}

export function CreateProjectDialog({ onProjectCreated }: CreateProjectDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [formData, setFormData] = useState<CreateProjectRequest & { template?: string }>({
    name: '',
    description: '',
    framework: 'nextjs',
    template: ''
  });

  // 获取可用模板
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates');
        if (response.ok) {
          const templatesData = await response.json();
          setTemplates(templatesData);
          // 默认选择第一个模板
          if (templatesData.length > 0) {
            setSelectedTemplate(templatesData[0].id);
            setFormData(prev => ({ ...prev, template: templatesData[0].id }));
          }
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    if (open) {
      fetchTemplates();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Project "${formData.name}" created successfully!`);
        setOpen(false);
        setFormData({ name: '', description: '', framework: 'nextjs', template: '' });
        setSelectedTemplate('');
        
        // 回调通知父组件刷新
        onProjectCreated?.();
        
        // 可选：跳转到AI生成器页面
        // router.push(`/generator?project=${data.project.id}`);
      } else {
        toast.error(data.error || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!loading) {
      setOpen(newOpen);
      if (!newOpen) {
        // 重置表单
        setFormData({ name: '', description: '', framework: 'nextjs', template: '' });
        setSelectedTemplate('');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-9" data-dialog-trigger>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Choose a template and create a new project. A complete project structure will be created for you.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 模板选择 */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Choose Template</Label>
            <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
              {templates.map((template) => (
                <Card 
                  key={template.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate === template.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setFormData(prev => ({ ...prev, template: template.id, framework: template.framework }));
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                          {template.framework}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {template.description}
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        {template.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <Sparkles className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              placeholder="My Awesome Project"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={loading}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.name.trim() || !selectedTemplate}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
