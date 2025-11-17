export const dynamicParams = false;

export async function generateStaticParams() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    return data.slice(0, 3).map((item: any) => {
        return {
            id: String(item.id)
        }
    })
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        next: {
            revalidate: 10
        }
    });
    const data = await res.json();

    return (
        <div>page {(await params).id}
            <h2>Title : {data.title} {Date.now()}</h2>
        </div>
    )
}

export default page





