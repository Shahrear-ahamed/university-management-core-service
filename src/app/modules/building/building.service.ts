import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { buildingSearchableFields } from './building.constants';
import { IBuildingFilterRequest } from './building.interfaces';

const createBuilding = async (data: Building): Promise<Building> => {
  return await prisma.building.create({
    data,
  });
};

const getAllBuildings = async (
  filters: IBuildingFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Building[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andCondition = [];

  // search
  if (searchTerm) {
    andCondition.push({
      OR: buildingSearchableFields.map(filter => ({
        [filter]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereCondition: Prisma.BuildingWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.building.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.building.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Building | null> => {
  return await prisma.building.findUnique({
    where: {
      id,
    },
  });
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Building>,
): Promise<Building> => {
  return await prisma.building.update({
    where: {
      id,
    },
    data: payload,
  });
};

const deleteByIdFromDB = async (id: string): Promise<Building> => {
  return await prisma.building.delete({
    where: {
      id,
    },
  });
};

export const BuildingService = {
  createBuilding,
  getAllBuildings,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
