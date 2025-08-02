import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <>
            <Skeleton className="h-8 w-1/3 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3" />
        </>
    );
}
