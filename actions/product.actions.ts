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
      include: {
        topPanelFillings: true,
        bottomPanelFillings: true,
        borderPanelFillings: true,
      },
    });
  };

// action to create a product
export const createProduct = async (data: IFormStore) => {
    return await prisma.product.create({
      data: {
        productName: data.productName,
        productDetails: data.productDetails,
        deliveryAddress: data.deliveryAddress,
        tickSupplier: data.tickSupplier,
        tickQuality: data.tickQuality,
        tickNumberRef: data.tickNumberRef,
        tickColourRef: data.tickColourRef,
        composition: data.composition,
        issuedTo: data.issuedTo,
        dateRequired: data.dateRequired,
        comments: data.comments,
        labelType: data.labelType,
        springType: data.springType,
        quiltType: data.quiltType,
        accessories: data.accessories,
        patternNumber: data.patternNumber,
        borderType: data.borderType,
        borderDepth: data.borderDepth,
        topPanelFillings: {
          create: data.panelFillingTopLayer.map((filling) => ({
            layer: filling.layer,
            description: filling.description,
            weight: filling.weight,
            sizeWidth: filling.sizeWidth,
            supplier: filling.supplier,
          })),
        },
        bottomPanelFillings: {
          create: data.panelFillingBottomLayer.map((filling) => ({
            layer: filling.layer,
            description: filling.description,
            weight: filling.weight,
            sizeWidth: filling.sizeWidth,
            supplier: filling.supplier,
          })),
        },
        borderPanelFillings: {
          create: data.borderFilling.map((filling) => ({
            layer: filling.layer,
            description: filling.description,
            weight: filling.weight,
            sizeWidth: filling.sizeWidth,
            supplier: filling.supplier,
          })),
        },
      },
    });
  };


// action to update a product
export const updateProduct = async (id: number, data: IFormStore) => {
    return await prisma.product.update({
      where: { id: id },
      data: {
        productName: data.productName,
        productDetails: data.productDetails,
        deliveryAddress: data.deliveryAddress,
        tickSupplier: data.tickSupplier,
        tickQuality: data.tickQuality,
        tickNumberRef: data.tickNumberRef,
        tickColourRef: data.tickColourRef,
        composition: data.composition,
        issuedTo: data.issuedTo,
        dateRequired: data.dateRequired,
        comments: data.comments,
        labelType: data.labelType,
        springType: data.springType,
        quiltType: data.quiltType,
        accessories: data.accessories,
        patternNumber: data.patternNumber,
        borderType: data.borderType,
        borderDepth: data.borderDepth,
        topPanelFillings: {
          deleteMany: {}, // Delete all existing top panel fillings
          create: data.panelFillingTopLayer.map((filling) => ({
            layer: filling.layer,
            description: filling.description,
            weight: filling.weight,
            sizeWidth: filling.sizeWidth,
            supplier: filling.supplier,
          })),
        },
        bottomPanelFillings: {
          deleteMany: {}, // Delete all existing bottom panel fillings
          create: data.panelFillingBottomLayer.map((filling) => ({
            layer: filling.layer,
            description: filling.description,
            weight: filling.weight,
            sizeWidth: filling.sizeWidth,
            supplier: filling.supplier,
          })),
        },
        borderPanelFillings: {
          deleteMany: {}, // Delete all existing border panel fillings
          create: data.borderFilling.map((filling) => ({
            layer: filling.layer,
            description: filling.description,
            weight: filling.weight,
            sizeWidth: filling.sizeWidth,
            supplier: filling.supplier,
          })),
        },
      },
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
