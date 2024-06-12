import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Counter from '@/components/counter'
import fetchCt, { setCt } from '@/data/firestore'
import TodosTable from '@/components/todos/todoTable'

// import Image from 'next/image'

async function getInitCount() {
    // console.log('')
    await new Promise((f) => setTimeout(f, 1000))
    return 10
}

async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/todos`, {
        cache: 'no-cache',
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function TodoPage() {
    const initCnt = await getInitCount()
    console.log('initCntnew:' + initCnt)

    const response = await getData()
    // console.log('datas:' + response.data)
    const fetchCta: number = await fetchCt()

    await setCt(fetchCta + 1)

    return (
        <div className="flex min-h-screen flex-col items-center p-24 space-y-16">
            <Counter initCnt={100}>
                <h1>子供パラメータ</h1>
            </Counter>
            <button>test</button>
            <TodosTable todos={response.data ?? []}></TodosTable>

            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>訪問者4</CardTitle>
                    <CardDescription>
                        Deploy your new project in one-click.
                    </CardDescription>
                </CardHeader>
                <CardContent>{fetchCta}</CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
            </Card>
        </div>
    )
}
