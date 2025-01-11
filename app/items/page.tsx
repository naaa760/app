import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Sparkles } from "lucide-react";

// Sample data to replace prisma query
const sampleItems = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A cutting-edge solution for modern problems",
    status: "Active",
    createdAt: "2025-01-01T00:00:00.000Z",
    user: { name: "John Doe" },
  },
  {
    id: 2,
    title: "Beta Initiative",
    description: "Innovative approach to digital transformation",
    status: "In Progress",
    createdAt: "2025-01-02T00:00:00.000Z",
    user: { name: "Jane Smith" },
  },
  {
    id: 3,
    title: "Gamma Project",
    description: "Next-generation technology implementation",
    status: "Review",
    createdAt: "2025-01-03T00:00:00.000Z",
    user: { name: "Alex Johnson" },
  },
];

interface Item {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  user: { name: string };
}

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-purple-100/50 hover:border-purple-200/50 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-gray-400 bg-clip-text text-transparent">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500">
              <User className="w-4 h-4" />
              <span className="text-sm">{item.user.name}</span>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-300 to-gray-300 hover:from-purple-400 hover:to-gray-400">
            {item.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-2">{item.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-purple-50 pt-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <div className="w-4 h-4 text-purple-400" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default function ItemsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-100 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 via-gray-200 to-purple-200 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative px-8 py-6 bg-white/50 backdrop-blur-md rounded-xl shadow-lg border border-purple-100 flex items-center justify-between">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-gray-500 bg-clip-text text-transparent">
              Your Items
            </h1>
            <Sparkles className="text-purple-400 w-6 h-6 animate-pulse" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Floating background elements */}
      <div className="fixed top-20 left-[20%] w-64 h-64 bg-gradient-to-r from-purple-300/20 to-gray-200/20 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-20 right-[20%] w-72 h-72 bg-gradient-to-r from-gray-300/20 to-purple-200/20 rounded-full blur-3xl animate-float-delay" />
    </div>
  );
}
