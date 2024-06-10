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
import { Spinner } from '@nextui-org/spinner'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    // DropdownSection,
    DropdownItem,
} from '@nextui-org/dropdown'

import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useRouter } from 'next/navigation'

import { Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { VerticalDotsIcon } from '../Icons'
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
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const notify = (msg: string) => toast(msg)
    const addTodo = async () => {
        if (todoAddText.length < 1) {
            console.log('入力して')
            return
        }

        setTodoAddEnable(false)
        setIsLoading(true)

        // setTimeout(() => {
        //     console.log('delay')
        // }, 5000)
        await new Promise((f) => setTimeout(f, 1000))

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: 'post',
            body: JSON.stringify({ title: todoAddText }),
            cache: 'no-store',
        })
        console.log(`追加完了：${todoAddText}`)

        setTodoAddText('')
        router.refresh()
        setIsLoading(false)
        notify('追加完了！！')
    }

    const todoRow = (todo: Todo) => {
        return (
            <TableRow key={todo.id}>
                <TableCell>{todo.id.slice(10)}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.is_done ? '✅' : '📌'}</TableCell>
                <TableCell>{`${new Date(todo.created_at.seconds * 1000)}`}</TableCell>
                <TableCell>
                    {' '}
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </TableCell>
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
        <div className="flex flex-col space-y-2">
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
                            await addTodo()
                        }}
                    >
                        追加
                    </Button>
                ) : (
                    disAddButton()
                )}
            </div>
            <div className="h-9">
                {isLoading && <Spinner size="sm" color="warning" />}
            </div>
            <Table aria-label="Example table with dynamic content">
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>DONE</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>ACT</TableColumn>
                </TableHeader>
                <TableBody>
                    {todos && todos.map((todo: Todo) => todoRow(todo))}
                </TableBody>
            </Table>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                // transition:Bounce
            />
        </div>
    )
}
export default TodosTable
