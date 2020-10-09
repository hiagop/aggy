class StageError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

const ErrorCodes = {
  SKIP_ALLOWED_TYPE: () =>
    new StageError("$skip: only integer values are allowed."),
  SKIP_ALLOWED_RANGE: () =>
    new StageError("$skip: only non negative integers are allowed."),
  LIMIT_ALLOWED_TYPE: () =>
    new StageError("$limit: only integer values are allowed."),
  LIMIT_ALLOWED_RANGE: () =>
    new StageError("$limit: only positive integers are allowed."),
};

export default ErrorCodes;
