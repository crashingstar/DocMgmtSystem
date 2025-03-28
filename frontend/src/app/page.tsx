import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 content-center">
      <div className="mx-auto max-w-2xl py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            The easiest way to manage your documents
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Start uploading your files in less than a minute.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/documents"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
