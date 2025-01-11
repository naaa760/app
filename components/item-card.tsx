"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface Item {
  id: string;
  title: string;
  description: string;
  user: {
    name: string;
  };
}

export default function ItemCard({ item }: { item: Item }) {
  const isOwner = true;

  const handleDelete = async () => {
    try {
      console.log("Deleting item:", item.id);

      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete item");
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border border-purple-100/50 bg-white/70 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-50/50 to-gray-50/50 border-b border-purple-100/20">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-gray-600 bg-clip-text text-transparent">
          {item.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-r from-purple-200 to-gray-200 flex items-center justify-center text-white font-medium">
            {item.user.name.charAt(0)}
          </span>
          <span>Created by: {item.user.name}</span>
        </div>
      </CardContent>

      {isOwner && (
        <CardFooter className="bg-gradient-to-r from-purple-50/30 to-gray-50/30 border-t border-purple-100/20">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="group-hover:bg-red-500 transition-colors duration-300 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
