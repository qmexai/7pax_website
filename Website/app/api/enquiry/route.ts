import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validation';
export async function POST(req:Request){
 try{const body=await req.json();const parsed=enquirySchema.safeParse(body);if(!parsed.success)return NextResponse.json({ok:false,errors:parsed.error.flatten().fieldErrors},{status:400});
 // Connect this validated payload to the real CRM/email provider when credentials are supplied.
 console.log('7PAX enquiry:',parsed.data);
 return NextResponse.json({ok:true,message:'Enquiry received successfully.'});
 }catch{return NextResponse.json({ok:false,message:'Invalid request.'},{status:400})}
}
