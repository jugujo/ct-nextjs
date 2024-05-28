'use client'

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from '@nextui-org/table'
import { Timestamp } from 'firebase/firestore'
// import { Timestamp } from 'firebase/firestore'

export type Todo = {
    id: string
    title: string
    is_done: boolean
    created_at: Timestamp
}

// export default function Counter() {
const TodosTable = ({ todos }: { todos: Todo[] }) => {
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
    return (
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
    )
}
export default TodosTable
