import * as yup from "yup";


export const userFormSchema = yup
  .object({
    // Prismaが生成する型と整合性を取るために nullable() を追加している
    // name: yup.string().nullable(),
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
  })
  .required();
 
  // const MAX_FILE_SIZE = 102400; //100KB

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

export type UserFormData = yup.InferType<typeof userFormSchema>;

// Same as...
/*
type UserFormData = {
  name: string | null | undefined;
  email: string;
  password: string;
  employeeID: string;
  departmentId: string;
  image :String
};
*/