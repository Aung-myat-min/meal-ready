export type MJWTPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};

export enum OperationStatus {
  default,
  success,
  fail,
  notfound,
}
