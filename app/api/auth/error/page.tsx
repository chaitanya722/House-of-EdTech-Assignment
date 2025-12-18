export default function AuthErrorPage() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold">Authentication Error</h1>
          <p className="text-gray-600">
            Invalid credentials or something went wrong.
          </p>
          <a href="/login" className="text-blue-600 underline">
            Go back to login
          </a>
        </div>
      </div>
    )
  }
  