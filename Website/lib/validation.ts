import { z } from 'zod';
export const enquirySchema = z.object({
 fullName:z.string().min(2,'Full name must contain at least 2 characters.'),
 phone:z.string().min(7,'Enter a valid phone number.'),
 email:z.string().email('Enter a valid email address.'),
 packageId:z.string().optional(),
 travelDate:z.string().refine(v => !!v && new Date(v+'T00:00:00') > new Date(),'Travel date must be in the future.'),
 travellerCount:z.coerce.number().int().min(1).max(50),
 message:z.string().max(1000).optional()
});
export type Enquiry = z.infer<typeof enquirySchema>;
