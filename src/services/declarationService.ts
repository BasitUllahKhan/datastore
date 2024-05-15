// services/declarationService.ts

import { Declaration, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeclarationService {
  async create(data: Partial<Declaration>): Promise<Declaration> {
    return await prisma.declaration.create({
      data: await this.validate(data),
    });
  }

  // validation
  async validate(data: Partial<Declaration>): Promise<Declaration> {
    if (!data.image) {
      throw new Error("Image is required");
    }

    if (!data.weaponId) {
      throw new Error("Weapon ID is required");
    }

    if (!data.userId) {
      throw new Error("User ID is required");
    }

    if (!data.declarationDate) {
      data.declarationDate = new Date();
    }

    if (!data.retrivalDate) {
      data.retrivalDate = new Date();
    }

    return data as Declaration;
  }

  async getAll(): Promise<Declaration[]> {
    return await prisma.declaration.findMany();
  }

  async findById(id: number): Promise<Declaration | null> {
    return await prisma.declaration.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<Declaration>
  ): Promise<Declaration | null> {
    return await prisma.declaration.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.declaration.delete({ where: { id } });
  }
}
