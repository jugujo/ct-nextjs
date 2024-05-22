// import { query } from 'firebase/firestore'
import { fetchTodo, deleteTodo, editTodo } from '@/data/firestore'
import { NextRequest, NextResponse } from 'next/server'

//1件検索
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

// export async function POST(request: NextRequest) {
//     const { title } = await request.json()

//     const addedTodo = await addTodo({ title })

//     const resopnse = {
//         message: 'add test data',
//         data: addedTodo,
//     }

//     return Response.json(resopnse, { status: 201 })
// }

//1件削除
export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const deletedTodo = await deleteTodo(params.slug)

    if (deletedTodo === null) {
        return Response.json(null, { status: 204 })
    }

    const resopnse = {
        id: params.slug,
        message: 'test_delete',
        data: 'testdata',
    }

    return NextResponse.json(resopnse, { status: 200 })
}

//1件更新
export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { title, is_done } = await request.json()
    const editedTodo = await editTodo(params.slug, { title, is_done })

    if (editedTodo === null) {
        const errMessage = {
            message: 'データなし',
        }
        return Response.json(errMessage, { status: 422 })
    }

    const resopnse = {
        message: 'test_edited',
        data: editedTodo,
    }

    return NextResponse.json(resopnse, { status: 200 })
}
