import { Suspense } from "react";
import { PenSquare } from "lucide-react";

import { ThreadsList, ThreadsSkeleton } from "./_components/threads-list";

const MyThreadsPage = () => {
  return (
    <div className="container md:px-7 px-2 py-8">
      <h1 className="text-3xl font-bold flex items-center mb-6">
        <PenSquare className="mr-2 h-8 w-8 text-primary" />
        My Threads
      </h1>

      <Suspense fallback={<ThreadsSkeleton />}>
        <ThreadsList />
      </Suspense>
    </div>
  );
};

export default MyThreadsPage;
