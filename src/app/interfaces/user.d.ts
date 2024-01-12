export interface IUserBase {
  email: Email;
  nombre: string;
  apellidos: string;
  telefono?: number | string;
}

export interface IUserPayload {
  id: string;
  email: Email;
  nombre: string;
  apellidos: string;
  telefono?: number | string;
  avatarUrl?: string | URL;
  rol: number | string
  token: string
}

export interface IFullUser extends IUserBase {
  id?: Guid;
  avatar?: File;
  avatarUrl?: string | URL;
  password?: string;
  rol?: number | string
  isAdmin?: boolean
}

export interface IRegisterUser extends IUserBase {
  avatar?: File;
  password: string;
}

export interface ILoginUser
  extends Omit<IUserBase, 'nombre' | 'apellidos' | 'telefono'> {
  password: string;
}

export interface IUserChangePassword extends Omit<ILoginUser, 'password'> {
  oldPassword?: string;
  newPassword: string;
}

export type Email = `${string}@${string}.${string}` | string;
export type Guid = `${string}-${string}-${string}-${string}-${string}`;
export type Token = `${string}.${string}.${string}`;
