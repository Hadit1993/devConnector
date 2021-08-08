export default interface BaseResponse<T> {
  success: boolean;

  message: string;

  statusCode: number;

  data?: T;

  error?: { [key: string]: string };
}
