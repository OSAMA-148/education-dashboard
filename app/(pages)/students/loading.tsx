export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="h-8 w-1/4 bg-muted rounded" />
                <div className="h-10 w-32 bg-muted rounded" />
            </div>
            <div className="h-12 w-1/2 bg-muted rounded" />
            <div className="h-96 bg-muted rounded" />
        </div>
    );
}
