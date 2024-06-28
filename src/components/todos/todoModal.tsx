'use client'

import { Todo, ModalType } from '@/data/types'

import { Button } from '@nextui-org/button'

import { ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { Switch } from '@nextui-org/switch'
import { useState } from 'react'

const TodoModal = ({
    todo,
    modalType,
    onClose,
    onEdit,
    onDelete,
}: {
    todo: Todo | null
    modalType: ModalType
    onClose: () => void
    onEdit: (id: string, title: string, is_done: boolean) => void
    onDelete: (id: string) => void
}) => {
    console.log('todo２:' + todo?.id)

    const [title, setTitle] = useState<string>(todo?.title + '')
    const [is_done, setDoneFlg] = useState<boolean>(
        todo?.is_done ? true : false
    )

    const [isLoading, setIsLoading] = useState<boolean>(false)

    let createdAt = null
    if (todo?.created_at != null) {
        createdAt = new Date(todo?.created_at.seconds * 1000)
        createdAt = createdAt.toLocaleDateString('ja')
    }

    const DetailModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">修正</ModalHeader>
                <ModalBody>
                    <p>
                        <span className="font-bold">id : </span>
                        {todo?.id}
                    </p>
                    <p>
                        <span className="font-bold">内容 : </span>
                        {title}
                    </p>
                    <p>
                        <span className="font-bold">完了 :</span>
                        {`${is_done ? 'やった' : 'やってない'}`}
                    </p>

                    <p>
                        <span className="font-bold">作成日 :</span>
                        {`${createdAt}`}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button disabled color="default" onPress={onClose}>
                        閉じる
                    </Button>
                </ModalFooter>
            </>
        )
    }

    const EditModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">修正</ModalHeader>
                <ModalBody>
                    <p>
                        <span className="font-bold">id : </span>
                        {todo?.id}
                    </p>
                    <Input
                        autoFocus
                        label="なにやる"
                        placeholder="内容入力してね。"
                        variant="bordered"
                        defaultValue={title}
                        onValueChange={setTitle}
                        isRequired
                    />

                    <div className="flex py-2 px-1 justify-between">
                        <Switch
                            defaultSelected={is_done}
                            onValueChange={setDoneFlg}
                            color="warning"
                        >
                            {`${is_done ? 'やった' : 'やってない'}`}
                        </Switch>
                    </div>
                    <div className="flex py-2 px-1 justify-between">
                        <span>作成日 : </span>
                        {`${createdAt}`}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {isLoading ? (
                        <>
                            <Button isLoading color="warning" variant="solid">
                                修正
                            </Button>
                            <Button disabled color="default">
                                閉じる
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="warning"
                                variant="solid"
                                onPress={() => {
                                    setIsLoading(true)
                                    onEdit(todo?.id + '', title + '', is_done)
                                }}
                            >
                                修正
                            </Button>
                            <Button disabled color="default" onPress={onClose}>
                                閉じる
                            </Button>
                        </>
                    )}
                </ModalFooter>
            </>
        )
    }
    const DeleteModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">削除</ModalHeader>
                <ModalBody>
                    <p>
                        <span className="font-bold">id : </span>
                        {todo?.id}
                    </p>
                    <p>
                        <span className="font-bold">内容 : </span>
                        {title}
                    </p>
                    <p>
                        <span className="font-bold">完了 :</span>
                        {`${is_done ? 'やった' : 'やってない'}`}
                    </p>

                    <p>
                        <span className="font-bold">作成日 :</span>
                        {`${createdAt}`}
                    </p>
                </ModalBody>
                <ModalFooter>
                    {isLoading ? (
                        <>
                            <Button isLoading color="danger" variant="solid">
                                削除
                            </Button>
                            <Button disabled color="default">
                                閉じる
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="warning"
                                variant="solid"
                                onPress={() => {
                                    setIsLoading(true)
                                    onDelete(todo?.id + '')
                                }}
                            >
                                削除
                            </Button>
                            <Button disabled color="default" onPress={onClose}>
                                閉じる
                            </Button>
                        </>
                    )}
                </ModalFooter>
            </>
        )
    }

    const getModal = () => {
        switch (modalType) {
            case 'detail':
                return DetailModal()
            case 'edit':
                return EditModal()
            case 'delete':
                return DeleteModal()
            default:
                break
        }
    }

    return <>{getModal()}</>
}

export default TodoModal
