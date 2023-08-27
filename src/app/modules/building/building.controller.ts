import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterableFields } from './building.constants';
import { BuildingService } from './building.service';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.createBuilding(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Building created successfully',
    data: result,
  });
});

const getAllBuildings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BuildingService.getAllBuildings(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Building created successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const BuildingController = {
  createBuilding,
  getAllBuildings,
};
