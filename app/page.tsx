"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ClipboardCheck, Eye, EyeOff, Mail, Lock, ArrowRight, Users, Award, BarChart3 } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Store the token in localStorage (in a real app, consider using httpOnly cookies)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>

      <div className="relative flex min-h-screen">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-md">
            {/* Logo */}
            <div className="flex items-center mb-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <ClipboardCheck className="h-7 w-7 text-white" />
              </div>
              <h1 className="ml-3 text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Testify
              </h1>
            </div>

            {/* Tagline */}
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Master Your Skills with
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Smart Testing
              </span>
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Experience the future of online assessments with our comprehensive MCQ platform designed for excellence.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Collaborative Learning</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Connect with peers and track progress together
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Instant Results</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get detailed feedback and performance analytics
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Smart Analytics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Advanced insights to improve your performance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center mb-8 lg:hidden">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <ClipboardCheck className="h-7 w-7 text-white" />
              </div>
              <h1 className="ml-3 text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Testify
              </h1>
            </div>

            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold text-center text-slate-900 dark:text-white">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center text-slate-600 dark:text-slate-400">
                  Sign in to access your personalized learning dashboard
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                      />
                      <Label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400">
                        Remember me
                      </Label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 group disabled:opacity-50"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                    {!isLoading && (
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-slate-800 px-2 text-slate-500">Or</span>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Don't have an account?{" "}
                      <Link
                        href="/register"
                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                      >
                        Create one now
                      </Link>
                    </p>
                    <Link
                      href="/admin/login"
                      className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      Admin Portal
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Trusted by 10,000+ students and educators worldwide
              </p>
              <div className="flex items-center justify-center space-x-6 opacity-60">
                <div className="text-xs font-medium text-slate-400">256-bit SSL</div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="text-xs font-medium text-slate-400">GDPR Compliant</div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="text-xs font-medium text-slate-400">SOC 2 Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
