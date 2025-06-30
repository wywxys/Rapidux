import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // 调用AI服务
    const aiResponse = await fetch('http://localhost:8000/api/generate-component', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    if (!aiResponse.ok) {
      throw new Error('Failed to generate component')
    }

    const data = await aiResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json(
      { error: 'Failed to generate component' },
      { status: 500 }
    )
  }
}
