"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, User, Calendar, Sparkles } from "lucide-react";

interface Item {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

function ItemCard({
  item,
  onDelete,
}: {
  item: Item;
  onDelete: (id: number) => void;
}) {
  const { data: session } = useSession();
  const isOwner = session?.user?.email === item.user.email;

  return (
    <Card className="relative transform hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent">
            {item.title}
          </h3>
          {isOwner && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(item.id)}
              className="text-gray-400 hover:text-red-400 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{item.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="w-4 h-4" />
          <span>{item.user.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function ItemsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    fetchItems();
  }, [session, router]);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items");
      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch items",
        variant: "destructive",
      });
    }
  };

  const handleCreateItem = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) throw new Error("Failed to create item");

      setNewItem({ title: "", description: "" });
      await fetchItems();
      toast({ title: "Success", description: "Item created successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create item",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(`/api/items?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete item");

      await fetchItems();
      toast({ title: "Success", description: "Item deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative group mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 via-gray-200 to-purple-200 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
        <div className="relative px-8 py-6 bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-purple-100 flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent">
            Items Management
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" /> Create Item
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-lg border border-purple-100">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Create New Item
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Title"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  className="border-purple-100 focus:border-purple-300 bg-white/50"
                />
                <Textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className="border-purple-100 focus:border-purple-300 bg-white/50"
                />
                <Button
                  onClick={handleCreateItem}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-400 to-gray-400 hover:from-purple-500 hover:to-gray-500"
                >
                  {isLoading ? "Creating..." : "Create"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onDelete={handleDeleteItem} />
        ))}
      </div>
    </div>
  );
}
