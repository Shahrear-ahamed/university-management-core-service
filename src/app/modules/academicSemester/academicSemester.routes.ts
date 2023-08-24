import express from 'express';
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

export const AcademicSemesterRoutes = router;
