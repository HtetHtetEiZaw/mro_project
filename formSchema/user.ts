import * as yup from "yup";

export const userFormSchema = yup
  .object({
    name:  yup
    .string().nullable()
    .required('Name is a required field'),
    email: yup
      .string()
      .email("Invalid mail format.")
      .required("Email is a required field"),
    password: yup.string().min(4).required("password is a required field"),
    imageUrl:yup.string(),
    imageData: yup.mixed(),
  }) 
  .required()

 export type UserFormData = yup.InferType<typeof userFormSchema>;

// Same as...

// export type UserFormData = {
//   name: string ;
//   email: string;
//   password: string;
//   // employeeID: string;
//   // departmentId: string;
//   imageUrl: string;
//   imageData:string;
// };


// export const userFormSchema = yup.object().shape({
//   name:  yup
//   .string().nullable()
//   .required('Name is a required field'),
//   email: yup
//     .string()
//     .email("Invalid mail format.")
//     .required("Email is a required field"),
//   password: yup.string().min(4).required("password is a required field"),
  // imageUrl: yup.mixed<string>().required('Image is required'),
  // imageData: yup.mixed<string>()
    // .test('fileType', 'Invalid file type', value => {
    //   if (value) {
    //     return value instanceof Blob && value.type.includes('image/');
    //   }
    //   return true;
    // })
    // .required('Image is required'),
// });

  
  
