// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from '@/components/ui/card'
// import Counter from '../components/ui/count'
import fetchCt, { setCt } from '@/data/firestore'

// import Image from 'next/image'

export default async function Home() {
    const fetchCta: number = await fetchCt()

    await setCt(fetchCta + 1)

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            HOME
            {/* <Counter></Counter>
            <button>test</button>

            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>訪問者</CardTitle>
                    <CardDescription>
                        Deploy your new project in one-click.
                    </CardDescription>
                </CardHeader>
                <CardContent>{fetchCta}</CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
            </Card> */}
        </main>
    )
}
