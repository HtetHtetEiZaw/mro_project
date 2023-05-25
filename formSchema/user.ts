import * as yup from "yup";

// export const userFormSchema = yup.object().shape({
//   name:  yup
//   .string().nullable()
//   .required('Name is a required field'),
//   email: yup
//     .string()
//     .email("Invalid mail format.")
//     .required("Email is a required field"),
//   password: yup.string().min(4).required("password is a required field"),
//   imageUrl: yup.mixed<string>().required('Image is required'),
  // imageUrl: yup
  //   .mixed<string>()
  //   .test('isImage', 'Invalid image format', (value) => {
  //     if (!value) {
  //       return true; // Allow empty value
  //     }
  //     const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
  //     return supportedFormats.includes(value.type);
  //   })
  //   .required('Image is required'),
// });

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
    // employeeID: yup.string().required(),
    // departmentId: yup.string().required(),
    imageUrl:yup.string()
    // .mixed<File>()
    // .required("Please select an image")
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
// };

// export const userFormSchema = yup
//   .object({
//     name:  yup
//     .string().nullable()
//     .required('Name is a required field'),
//     email: yup
//       .string()
//       .email("Invalid mail format.")
//       .required("Email is a required field"),
//     password: yup.string().min(4).required("password is a required field"),
    // employeeID: yup.string().required(),
    // departmentId: yup.string().required(),
    // image: yup
    // .mixed<File>()
    // .required("Please select an image")
  // }) 
  // .shape({
  //   image: yup
  //   .mixed<File>()
  //   .required("Please select an image")
  // })
  // .shape({
  //   image: yup.mixed<File>()
  //     .required('Please select an image')
  //     .test({
  //       name: 'fileFormat',
  //       message: 'Unsupported file format',
  //       test: function (value) {
  //         if (!value) return true; // Allow empty values (optional field)
  //         const file = value as File;
  //         return ['image/jpeg', 'image/png'].includes(file.type);
  //       },
  //     })
  //     .test({
  //       name: 'fileSize',
  //       message: 'File size is too large',
  //       test: function (value) {
  //         if (!value) return true; // Allow empty values (optional field)
  //         const file = value as File;
  //         return file.size <= 1048576; // 1MB in bytes
  //       },
  //     }),
  //   })
  // .required()
  
  


//   const MAX_FILE_SIZE = 102400; //100KB

// const validFileExtensions:any = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

// function isValidFileType(fileName: any, fileType: any) {
//   return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
// }

// yup.object().shape({
//   image: yup
//       .mixed()
//       .required("Required")
//       .test("is-valid-type", "Not a valid image type",
//         value => isValidFileType(value && value.name.toLowerCase(), "image"))
//       .test("is-valid-size", "Max allowed size is 100KB",
//         value => value && value.size <= MAX_FILE_SIZE)
// });
