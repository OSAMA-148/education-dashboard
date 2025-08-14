export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 bg-muted rounded" />
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 h-96 bg-muted rounded" />
                <div className="col-span-3 h-96 bg-muted rounded" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-56 bg-muted rounded" />
                ))}
            </div>
        </div>
    );
}
