// export interface IUser {
//   idUsuario?: number;
//   email: Email;
//   password?: string;
//   roles_IdRol: number;
//   token?: string;
//   refreshToken?: string;
//   avatar?: string;
//   rol?: string;
// }

// export interface IUserChangePassword {
//   email: Email;
//   oldPassword?: string;
//   newPassword: string;
// }

//  /**************************************/
 
// export interface ILogin {
//   email: Email;
//   password: string;
// }

// export interface ILoginResponse {
//   id: Guid,
//   nombre: string,
//   avatarUrl: string,
//   email: Email,
//   token: string
// }

// export interface IRegister {
//   email: Email;
//   nombre: string;
//   apellidos: string;
//   telefono?: number | string;
//   avatar?: File;
//   password: string;
// }

// export type Email = `${string}@${string}.${string}` | string;
// export type Guid = `${string}-${string}-${string}-${string}-${string}`;
// export type Token = `${string}.${string}.${string}`