'use client'

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from '@nextui-org/table'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover'

import { Timestamp } from 'firebase/firestore'
import { useState } from 'react'
// import { Timestamp } from 'firebase/firestore'

export type Todo = {
    id: string
    title: string
    is_done: boolean
    created_at: Timestamp
}

// export default function Counter() {
const TodosTable = ({ todos }: { todos: Todo[] }) => {
    const [todoAddEnable, setTodoAddEnable] = useState(false)
    const [todoAddText, setTodoAddText] = useState('')
    const addTodo = async () => {
        alert('ss2')
        if (todoAddText.length < 1) {
            alert('ss3')
            return
        }

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: 'post',
            body: JSON.stringify({ title: todoAddText }),
            cache: 'no-store',
        })
        alert('ss4')
        console.log(`追加完了：${todoAddText}`)
    }
    const todoRow = (todo: Todo) => {
        return (
            <TableRow key={todo.id}>
                <TableCell>{todo.id.slice(10)}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.is_done ? '✅' : '📌'}</TableCell>
                <TableCell>{`${new Date(todo.created_at.seconds * 1000)}`}</TableCell>
            </TableRow>
        )
    }
    const disAddButton = () => {
        return (
            <Popover placement="right">
                <PopoverTrigger>
                    <Button color="default" className="h-14">
                        追加
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <div className="text-small font-bold">
                            Popover Content
                        </div>
                        <div className="text-tiny">内容なし</div>
                    </div>
                </PopoverContent>
            </Popover>
        )
    }
    return (
        <div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                    type="text"
                    label="何やる？"
                    value={todoAddText}
                    onValueChange={(changedInput) => {
                        setTodoAddText(changedInput)
                        setTodoAddEnable(changedInput.length > 0)
                    }}
                />
                {todoAddEnable ? (
                    <Button
                        color="warning"
                        className="h-14"
                        onPress={async () => {
                            alert('ss')
                            await addTodo()
                        }}
                    >
                        追加
                    </Button>
                ) : (
                    disAddButton()
                )}
            </div>
            <Table aria-label="Example table with dynamic content">
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>DONE</TableColumn>
                    <TableColumn>DATE</TableColumn>
                </TableHeader>
                <TableBody>
                    {todos && todos.map((todo: Todo) => todoRow(todo))}
                </TableBody>
            </Table>
        </div>
    )
}
export default TodosTable
