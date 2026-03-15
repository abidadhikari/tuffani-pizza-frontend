import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 font-sans sm:p-6 lg:p-8">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="h-2 bg-linear-to-r from-red-500 via-red-600 to-rose-600"></div>

        <div className="p-6 text-center sm:p-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 sm:h-20 sm:w-20">
            <ShieldAlert className="h-8 w-8 text-red-500 sm:h-10 sm:w-10" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Access Denied
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            You do not have the necessary permissions to view this page.
          </p>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:mt-8">
            <p className="text-sm text-slate-600">
              If you believe this is an error, please contact your administrator
              for assistance.
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
