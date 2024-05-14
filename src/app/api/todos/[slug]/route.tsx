// import { query } from 'firebase/firestore'
import { fetchTodo } from '@/data/firestore'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const searchParams = request.nextUrl.searchParams

    const search = searchParams.get('search')

    const todo = await fetchTodo(params.slug)

    if (todo === null) {
        return NextResponse.json(null, { status: 204 })
    }
    const resopnse = {
        id: params.slug,
        query: search,
        message: 'OK',
        data: todo,
    }
    return NextResponse.json(resopnse, { status: 200 })
}

export async function Post(request: NextRequest) {
    const { title } = await request.json()

    // const newTodo = {
    //     id: '4',
    //     title: 'test_newtitle',
    //     is_done: false,
    // }

    // const resopnse = {
    //     message: 'OK',
    //     data: 'testdata',
    // }

    return Response.json(title)
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const resopnse = {
        id: params.slug,
        message: 'test_delete',
        data: 'testdata',
    }

    return NextResponse.json(resopnse, { status: 200 })
}
