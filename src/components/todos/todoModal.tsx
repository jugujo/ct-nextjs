'use client'

import { Todo, ModalType } from '@/data/types'

import { Button } from '@nextui-org/button'

import { ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal'

const TodoModal = ({
    todo,
    modalType,
    onClose,
}: {
    todo: Todo | null
    modalType: ModalType
    onClose: () => void
}) => {
    console.log('todo:' + todo?.id)
    return (
        <div>
            <>
                <ModalHeader className="flex flex-col gap-1">
                    {modalType}
                </ModalHeader>
                <ModalBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor
                        quam.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                        Action
                    </Button>
                </ModalFooter>
            </>
        </div>
    )
}

export default TodoModal
