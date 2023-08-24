import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicSemesterSearchableFields } from './academicSemester.constants';
import { IAcademicSemesterFilterRequest } from './academicSemester.interfaces';

const createAcademicSemester = async (
  payload: AcademicSemester,
): Promise<AcademicSemester> => {
  return await prisma.academicSemester.create({
    data: payload,
  });
};

const getAllAcademicSemesters = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  // search
  if (searchTerm) {
    andCondition.push({
      OR: AcademicSemesterSearchableFields.map(filter => ({
        [filter]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // filter
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key]: { equals: (filterData as any)[key] },
      })),
    });
  }

  const whereCondition: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  // get data
  const result = await prisma.academicSemester.findMany({
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

  // total count
  const total = await prisma.academicSemester.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAcademicSemesterById = async (
  id: string,
): Promise<AcademicSemester | null> => {
  return await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
};

export const academicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemesterById,
};
