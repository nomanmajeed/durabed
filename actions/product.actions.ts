"use server";

import { IFormStore } from "@/store/useFormStore";
import { convertToDateISOString } from "@/utils";
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

// Preprocess the data before creating the product
const preprocessData = (data: IFormStore): IFormStore => {
    // Clone the data object to avoid mutating the original object
    const processedData = { ...data };
  
    // Convert the dateRequired field to ISO format
    processedData.dateRequired = convertToDateISOString(data.dateRequired);
  
    return processedData;
  };
  
  // Call createProduct function with preprocessed data
export  const createProduct = async (data: IFormStore) => {
    const preprocessedData = preprocessData(data);
    return await prisma.product.create({
      data: preprocessedData,
    });
  };

