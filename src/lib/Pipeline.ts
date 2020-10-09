import { StageError } from "./Errors";

export class Pipeline {
  private _pipeline: PipelineStage[] = [];

  get pipeline() {
    return this._pipeline;
  }

  constructor() {}

  skip(n: number) {
    if (!Number.isInteger(n)) {
      throw new StageError("Only integer values are allowed.");
    }

    if (n < 0) {
      throw new StageError("Only non negative integers are allowed.");
    }

    const stage = { $skip: n };

    this._pipeline.push(stage);

    return this;
  }

  limit(n: number) {
    if (!Number.isInteger(n)) {
      throw new StageError("Only integer values are allowed.");
    }

    if (n < 0) {
      throw new StageError("Only positive integers are allowed.");
    }

    const stage = { $limit: n };

    this._pipeline.push(stage);

    return this;
  }

  sort(...args: SortProperty[]) {
    const stage = { $sort: {} };

    Object.assign(stage.$sort, ...args);

    this._pipeline.push(stage);

    return this;
  }

  match(...args: MatchAttribute[]) {
    const stage: PipelineStage = { $match: {} };

    Object.assign(stage.$match, ...args);

    this._pipeline.push(stage);

    return this;
  }

  lookup(
    from: string,
    as: string,
    localField: string,
    foreignField: string,
  ) {
    const stage: PipelineStage = {
      $lookup: { from, localField, foreignField, as },
    };

    this._pipeline.push(stage);

    return this;
  }
}

type MatchAttribute = { [key: string]: any };

type SortProperty = { [key: string]: 1 | -1 };

type PipelineOperator =
  | "$match"
  | "$lookup"
  | "$skip"
  | "$limit"
  | "$sort";

type PipelineStage = {
  [key in PipelineOperator]?: any;
};
