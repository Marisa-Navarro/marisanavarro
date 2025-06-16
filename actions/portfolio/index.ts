"use server";

import { prisma } from "@/lib/prisma";
import { PortfolioType } from "@prisma/client";
export interface PortfolioItem {
  title: string;
  url: string;
  category: string;
  type: PortfolioType;
  description: string;
}
export async function onCreatePortfolio(formData: PortfolioItem) {
  const { title, url, category, type, description } = formData;

  try {
    const newPortfolioItem = await prisma.portfolio.create({
      data: {
        title,
        url,
        category,
        type,
        description,
      },
    });

    return {
      status: 201,
      message: "Portfolio item created successfully",
      data: newPortfolioItem,
    };
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return {
      status: 500,
      message: "Failed to create portfolio item",
    };
  }
}
export async function onGetPortfolio() {
  try {
    try {
      const portfolioItems = await prisma.portfolio.findMany();
      
      if(!portfolioItems || portfolioItems.length === 0) {
        return {
          status: 404,
          message: "No portfolio items found",
        };
      }

      return {
        status: 200,
        message: "Portfolio items retrieved successfully",
        data: portfolioItems,
      };
    } catch (error) {
      console.error("Error retrieving portfolio items:", error);
      return {
        status: 500,
        message: "Failed to retrieve portfolio items",
      };
    }
  } catch (error) {
    console.error("Error retrieving portfolio items:", error);
    return {
      status: 500,
      message: "Failed to retrieve portfolio items",
    };
  }
}
export async function onDeletePortfolio(id: string) {
  try {
    await prisma.portfolio.delete({
      where: { id },
    });
    return {
      status: 200,
      message: "Portfolio item deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return {
      status: 500,
      message: "Failed to delete portfolio item",
    };
  }
}
