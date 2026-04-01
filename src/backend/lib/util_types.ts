export type MJWTPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};

export enum OperationStatus {
  success,
  fail,
  notfound,
}
