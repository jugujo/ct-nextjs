'use client'

import { useState } from 'react'

// export default function Counter() {
const Counter: React.FC = () => {
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
            <button onClick={incrementCount}>Increase Count</button>
            <br />
            <button onClick={decreasementCount}>Decrease Count</button>
        </div>
    )
}
export default Counter
