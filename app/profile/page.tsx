"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { useToast } from "@/hooks/use-toast"
import type { User } from "@/lib/db" // Import User type

export default function UserProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    domain: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [isSavingDetails, setIsSavingDetails] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/")
        return
      }

      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/") // Redirect to login if token is invalid
          }
          throw new Error("Failed to fetch user profile")
        }

        const data = await response.json()
        setUser(data.user)
        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          gender: data.user.gender || "",
          age: data.user.age?.toString() || "",
          domain: data.user.domain || "",
        })
      } catch (error) {
        console.error("Error fetching user profile:", error)
        toast({
          title: "Error",
          description: "Failed to load user profile.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [router, toast])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSelectChange = (value: string, id: string) => {
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.id]: e.target.value,
    })
  }

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingDetails(true)
    const token = localStorage.getItem("token")

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          age: Number.parseInt(formData.age) || null,
          domain: formData.domain,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update profile")
      }

      const data = await response.json()
      setUser(data.user)
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      })
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      })
    } finally {
      setIsSavingDetails(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangingPassword(true)
    const token = localStorage.getItem("token")

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      setIsChangingPassword(false)
      return
    }

    try {
      const response = await fetch("/api/user/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to change password")
      }

      toast({
        title: "Success",
        description: "Password changed successfully. Please log in again.",
      })
      // Log out user after password change for security
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/")
    } catch (error: any) {
      console.error("Error changing password:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to change password.",
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Should redirect to login if user is null after loading
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="User Profile" text="Manage your account details and preferences." />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>Update your name, email, gender, age, and domain.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateDetails} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" value={formData.name} onChange={handleFormChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleFormChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, "gender")} value={formData.gender}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                      <SelectItem value="O">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" min="1" value={formData.age} onChange={handleFormChange} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="domain">Domain/Field</Label>
                <Input
                  id="domain"
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={formData.domain}
                  onChange={handleFormChange}
                />
              </div>
              <Button type="submit" disabled={isSavingDetails}>
                {isSavingDetails ? "Saving..." : "Save Details"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? "Changing..." : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
