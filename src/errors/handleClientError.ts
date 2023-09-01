import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  const errors: IGenericErrorMessage[] = [];
  let message = '';

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || "Record doesn't exist";

    errors.push({
      path: '',
      message,
    });
  }

  if (error.code === 'P2003' && error.message.includes('delete()` invocation:')) {
    message = 'Delete failed';

    errors.push({
      path: '',
      message,
    });
  }

  const statusCode = 400;
  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleClientError;
