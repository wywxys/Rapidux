'use client'

import { useState } from 'react'
import { Wand2, Eye, Code, Save, Plus } from 'lucide-react'

export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'prompt' | 'code' | 'preview'>('prompt')

  const generateComponent = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      
      const data = await response.json()
      if (data.component) {
        setGeneratedCode(data.component)
        setActiveTab('code')
      }
    } catch (error) {
      console.error('Error generating component:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-8">
          <Wand2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold">Visual Builder</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述您想要的组件
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如: 创建一个现代化的用户卡片组件，包含头像、姓名、职位和联系按钮..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={generateComponent}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                生成组件
              </>
            )}
          </button>

          {generatedCode && (
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              保存到项目
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex space-x-6">
            {[
              { id: 'prompt', label: '提示词', icon: Wand2 },
              { id: 'code', label: '代码', icon: Code },
              { id: 'preview', label: '预览', icon: Eye },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {activeTab === 'prompt' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">开始创建组件</h2>
              <p className="text-gray-600 mb-6">
                使用自然语言描述您想要的React组件，AI将为您生成现代化、响应式的代码。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                  <h3 className="font-medium mb-2">用户界面组件</h3>
                  <p className="text-sm text-gray-600">按钮、卡片、表单、导航等</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                  <h3 className="font-medium mb-2">数据展示</h3>
                  <p className="text-sm text-gray-600">表格、图表、列表、统计卡片</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                  <h3 className="font-medium mb-2">布局组件</h3>
                  <p className="text-sm text-gray-600">网格、侧边栏、头部、页脚</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                  <h3 className="font-medium mb-2">交互组件</h3>
                  <p className="text-sm text-gray-600">模态框、下拉菜单、选项卡</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="h-full">
              {generatedCode ? (
                <div className="h-full border border-gray-200 rounded-lg">
                  <pre className="p-4 h-full overflow-auto bg-gray-900 text-green-400 rounded-lg">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>生成的代码将显示在这里</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full">
              {generatedCode ? (
                <div className="h-full border border-gray-200 rounded-lg bg-white">
                  <div className="p-4 h-full overflow-auto">
                    <div className="text-center text-gray-500">
                      <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>组件预览功能正在开发中</p>
                      <p className="text-sm mt-2">您可以复制代码到React项目中测试</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>组件预览将显示在这里</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
