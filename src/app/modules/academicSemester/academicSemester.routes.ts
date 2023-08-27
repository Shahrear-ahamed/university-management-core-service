import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidator } from './academicSemester.validation';

// Define your routes here
const router = express.Router();

router.get('/', academicSemesterController.getAllAcademicSemesters);

router.post(
  '/',
  validateRequest(AcademicSemesterValidator.createAcademicSemester),
  academicSemesterController.createAcademicSemester,
);

router.get('/:id', academicSemesterController.getAcademicSemesterById);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemeterController.updateOneInDB,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemeterController.deleteByIdFromDB,
);

export const AcademicSemesterRoutes = router;
