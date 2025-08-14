export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-8 w-1/3 bg-muted rounded mb-6" />
            <div className="grid gap-4 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-muted rounded" />
                ))}
            </div>
            <div className="h-96 bg-muted rounded" />
            <div className="grid gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-56 bg-muted rounded" />
                ))}
            </div>
        </div>
    );
}
