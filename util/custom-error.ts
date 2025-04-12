export const ERROR_CODES = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  422: "UNPROCESSABLE_ENTITY",
  429: "TOO_MANY_REQUESTS",
  500: "INTERNAL_SERVER_ERROR",
};

export class CustomError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = ERROR_CODES[statusCode as keyof typeof ERROR_CODES] ?? "UNKNOWN_ERROR";
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  /** 예상치 못한 오류를 안전하게 감싸는 정적 헬퍼 */
  static wrap(err: unknown): CustomError {
    // 개발자 콘솔에 디버깅 로그 출력 (stack 포함)
    console.error("🔥 [UNEXPECTED ERROR]");
    if (err instanceof Error) {
      console.error("Message:", err.message);
      console.error("Stack:", err.stack);
    } else {
      console.error("Non-error object:", err);
    }

    // 사용자에겐 안전한 메시지만 전달
    return new CustomError("서버 내부 오류", 500);
  }
}
