import { NextRequest, NextResponse } from 'next/server'
import { addTodo, fetchTodos } from '@/data/firestore'

export async function GET() {
    const todos = await fetchTodos()

    const resopnse = {
        message: 'test_get_all',
        data: todos,
    }
    return NextResponse.json(resopnse, { status: 200 })
}

export async function POST(request: NextRequest) {
    const { title } = await request.json()
    const rtn = await addTodo({ title })
    // console.log(title)
    console.log(request)
    // const data = await request.json()

    // const newTodo = {
    //     id: '4',
    //     title: 'test_newtitle',
    //     is_done: false,
    // }

    // const resopnse = {
    //     message: 'test_add',
    //     data: 'testdata',
    // }

    return NextResponse.json(rtn, { status: 200 })

    // return Response.json(title)
}
