"use server";

import { IFormStore } from "@/store/useFormStore";
import { PrismaClient } from "@prisma/client";
import exp from "constants";

const prisma = new PrismaClient();

// action to get all products
export const getProducts = async () => {
  return await prisma.product.findMany();
};

// action to get a single product
export const getProduct = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};

// action to create a product
export const createProduct = async (data: IFormStore) => {
  return await prisma.product.create({
    data: data,
  });
};

// action to delete a product
export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: {
      id: id,
    },
  });
};
