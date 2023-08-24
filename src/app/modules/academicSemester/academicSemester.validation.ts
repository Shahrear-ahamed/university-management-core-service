// Define your validations here

import { z } from 'zod';

const createAcademicSemester = z.object({
  body: z.object({
    year: z.number({ required_error: 'Year is required' }),
    title: z.string({ required_error: 'Title is required' }),
    code: z.string({ required_error: 'Code is required' }),
    startMonth: z.string({ required_error: 'Start Month is required' }),
    endMonth: z.string({ required_error: 'End Month is required' }),
  }),
});

export const AcademicSemesterValidator = {
  createAcademicSemester,
};
