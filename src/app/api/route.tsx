import { NextRequest, NextResponse } from 'next/server'
import { fetchTodos } from '@/data/firestore'

export async function GET(request: NextRequest) {
    const todos = await fetchTodos()

    console.log(request)
    const resopnse = {
        message: 'test_get_all',
        data: todos,
    }
    return NextResponse.json(resopnse, { status: 200 })
}
