import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Counter from '../../components/counter'
import fetchCt, { setCt } from '@/data/firestore'

// import Image from 'next/image'

async function getInitCount() {
    // console.log('')
    await new Promise((f) => setTimeout(f, 1000))
    return 10
}

export default async function TodoPage() {
    const initCnt = await getInitCount()
    console.log('initCnt:' + initCnt)
    const fetchCta: number = await fetchCt()

    await setCt(fetchCta + 1)

    return (
        <div className="flex min-h-screen flex-col items-center p-24 space-y-16">
            <Counter initCnt={100}>
                <h1>子供パラメータ</h1>
            </Counter>
            <button>test</button>

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
