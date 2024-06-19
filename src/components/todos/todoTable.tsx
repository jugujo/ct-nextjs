'use client'
import { Todo, ModalType, ModalStatusType } from '@/data/types'
import TodoModal from '@/components/todos/todoModal'
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
    DropdownItem,
} from '@nextui-org/dropdown'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'

import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { VerticalDotsIcon } from '../Icons'

const TodosTable = ({ todos }: { todos: Todo[] }) => {
    const [todoAddEnable, setTodoAddEnable] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    // const [backdrop, setBackdrop] = useState('opaque')
    const [todoAddText, setTodoAddText] = useState('')
    const [currentModalStatus, setCurrentModalStatus] =
        useState<ModalStatusType>({
            selectedTodo: null,
            modalType: 'detail' as ModalType,
        })

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

    const editTodo = async (
        id: string,
        editedTitle: string,
        editedIsDone: boolean
    ) => {
        if (editedTitle.length < 1) {
            console.log('入力して')
            return
        }

        await new Promise((f) => setTimeout(f, 1000))

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
            method: 'post',
            body: JSON.stringify({ title: editedTitle, is_done: editedIsDone }),
            cache: 'no-store',
        })
        console.log(`更新完了：${editedTitle}`)

        router.refresh()

        notify('更新完了！！')
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
                            <DropdownMenu
                                onAction={(parm) => {
                                    console.log(
                                        parm + `test:${parm},id:${todo.id}`
                                    )
                                    setCurrentModalStatus({
                                        selectedTodo: todo,
                                        modalType: parm as ModalType,
                                    })
                                    onOpen()
                                }}
                            >
                                <DropdownItem key="detail">詳細</DropdownItem>
                                <DropdownItem key="edit">修正</DropdownItem>
                                <DropdownItem key="delete">削除</DropdownItem>
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

    const modalComp = () => {
        // if (currentModalStatus.selectedTodo == null) {
        //     return null
        // }

        return (
            <div>
                <Modal
                    backdrop="blur"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                >
                    <ModalContent>
                        {(onClose) => (
                            <TodoModal
                                todo={currentModalStatus.selectedTodo}
                                modalType={currentModalStatus.modalType}
                                onClose={onClose}
                                onEdit={async (id, title, is_done) => {
                                    await editTodo(id, title, is_done)
                                    onClose()
                                }}
                            ></TodoModal>
                        )}
                    </ModalContent>
                </Modal>
            </div>
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
            {modalComp()}
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
