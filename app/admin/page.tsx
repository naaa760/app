"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { redirect } from "next/navigation";
import { Sparkles, UserPlus, Loader } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      redirect("/");
    }
    fetchUsers();
  }, [session]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleCreateUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      setNewUser({ name: "", email: "", password: "" });
      await fetchUsers();
      toast({
        title: "Success",
        description: "User created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-100 to-purple-100 p-8">
      <div className="container mx-auto relative">
        {/* Floating background elements */}
        <div className="fixed top-20 left-[20%] w-64 h-64 bg-gradient-to-r from-purple-300/20 to-gray-200/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="fixed bottom-20 right-[20%] w-72 h-72 bg-gradient-to-r from-gray-300/20 to-purple-200/20 rounded-full blur-3xl animate-[float-delay_6s_ease-in-out_infinite]" />

        {/* Header Section */}
        <div className="relative group mb-8 p-6 bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-purple-100">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 via-gray-200 to-purple-200 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-1000" />
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent">
                Admin Console
              </h1>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/90 backdrop-blur-md border border-purple-100">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent">
                    Create New User
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="bg-white/50 border-purple-100 focus:border-purple-300"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="bg-white/50 border-purple-100 focus:border-purple-300"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="bg-white/50 border-purple-100 focus:border-purple-300"
                  />
                  <Button
                    onClick={handleCreateUser}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 via-gray-200 to-purple-200 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-1000" />
          <div className="relative overflow-hidden bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-purple-100">
            <table className="min-w-full divide-y divide-purple-200">
              <thead className="bg-purple-50/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-purple-50/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
