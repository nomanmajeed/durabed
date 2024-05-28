"use server";

import { IFormStore } from "@/store/useFormStore";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async () => {
  return await prisma.product.findMany();
};

export const getProduct = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};
  
  // Call createProduct function with preprocessed data
export  const createProduct = async (data: IFormStore) => {
    return await prisma.product.create({
      data: data,
    });
};

