import { Timestamp } from 'firebase/firestore'

export type Todo = {
    id: string
    title: string
    is_done: boolean
    created_at: Timestamp
}

export type ModalType = 'detail' | 'edit' | 'delete'

export type ModalStatusType = {
    selectedTodo: Todo | null
    modalType: ModalType
}
