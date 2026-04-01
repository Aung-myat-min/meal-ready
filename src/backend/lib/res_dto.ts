import { OperationStatus } from "./util_types";

export default class ResDto<T> {
  status: OperationStatus;
  message?: string;
  data?: T;

  private constructor(status: OperationStatus, message?: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static Default<T>(): ResDto<T> {
    return new ResDto(
      OperationStatus.default,
      "Hey Developer, You have forgotten to complete here",
    );
  }

  static Success<T>(message?: string, data?: T): ResDto<T> {
    return new ResDto(OperationStatus.success, message, data);
  }

  static Fail<T>(message?: string, data?: T): ResDto<T> {
    return new ResDto(OperationStatus.fail, message, data);
  }

  static NotFound<T>(message?: string, data?: T): ResDto<T> {
    return new ResDto(OperationStatus.notfound, message, data);
  }
}
