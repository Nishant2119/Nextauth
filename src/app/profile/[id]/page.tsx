export default async function UserProfile({ params }: any) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-4">User Profile</h1>
        <div className="bg-neutral-800/50 border border-neutral-700/60 rounded-xl p-4">
          <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider">
            User ID
          </span>
          <p className="text-lg font-semibold text-white mt-1">
            {id}
          </p>
        </div>
      </div>
    </div>
  );
}
