'use client'

import React, { useState } from 'react'
import { Button } from '@nextui-org/button'

// export default function Counter() {
const Counter = ({
    initCnt,
    children,
}: {
    initCnt: number
    children: React.ReactNode
}) => {
    // const fetchCta = await fetchCt()

    const [count, setCount] = useState(0)

    const incrementCount = () => {
        setCount(count + 1)
    }

    const decreasementCount = () => {
        setCount(count - 1)
    }

    return (
        <div>
            <h1>Counter</h1>
            <p>Count: {count}</p>
            <button onClick={incrementCount}>Increase Count2</button>
            <br />
            <button onClick={decreasementCount}>Decrease Count2</button>
            <br />
            <Button onPress={() => incrementCount()}>nextuiのボタン</Button>
            {children}
            {initCnt}
        </div>
    )
}
export default Counter
