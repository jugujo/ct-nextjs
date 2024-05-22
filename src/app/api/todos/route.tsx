import { NextRequest, NextResponse } from 'next/server'
import { addTodo, fetchTodos } from '@/data/firestore'

//全体検索
export async function GET() {
    const todos = await fetchTodos()

    const resopnse = {
        message: 'test_get_all',
        data: todos,
    }
    return NextResponse.json(resopnse, { status: 200 })
}

//追加
export async function POST(request: NextRequest) {
    const { title } = await request.json()

    const addedTodo = await addTodo({ title })

    const resopnse = {
        message: 'add test data',
        data: addedTodo,
    }

    return Response.json(resopnse, { status: 201 })
}
