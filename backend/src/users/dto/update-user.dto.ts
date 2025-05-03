import { UserRole } from '../../utils/prisma-types';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { CreateUserSchema } from './create-user.dto';

// Define the Zod schema for user updates - making all fields optional
export const UpdateUserSchema = CreateUserSchema.partial();

// Create a DTO class from the Zod schema
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}