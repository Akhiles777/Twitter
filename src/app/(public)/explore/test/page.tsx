
export default function TestPage({ searchParams }: { searchParams: { tag?: string } }) {
    const { tag } = searchParams;
    return (
        <h1 className="text-3xl font-bold">Добро пожаловать {!!tag && `#${tag}`}</h1>
    );
}
