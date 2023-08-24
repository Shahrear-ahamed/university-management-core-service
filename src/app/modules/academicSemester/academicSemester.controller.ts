import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academicSemester.service';
// Your controller code here

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result =
      await academicSemesterService.createAcademicSemester(payload);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  },
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      'startMonth',
      'endMonth',
      'code',
      'title',
    ]);
    const pagination = pick(req.query, [
      'limit',
      'page',
      'sortBy',
      'sortOrder',
    ]);

    const result = await academicSemesterService.getAllAcademicSemesters(
      filters,
      pagination,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semesters fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
};
