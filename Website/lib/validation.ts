import { z } from 'zod';
export const enquirySchema = z.object({
 fullName:z.string().min(2,'Full name must contain at least 2 characters.'),
 phone:z.string().min(7,'Enter a valid phone number.'),
 email:z.string().email('Enter a valid email address.'),
 message:z.string().min(10,'Please tell us a little about your travel plans.').max(1000,'Please keep your enquiry under 1000 characters.')
});
export type Enquiry = z.infer<typeof enquirySchema>;
