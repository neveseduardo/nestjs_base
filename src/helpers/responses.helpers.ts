export function response(
  message: string,
  data: any,
  statusCode = 200,
  status = 'OK',
  error = false,
) {
  return {
    message,
    data,
    status,
    statusCode,
    error,
  };
}
