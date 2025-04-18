export interface IBaseRepository<TQuery, TCommand> {
  findAll?(): Promise<TQuery[]>;
  findById?(id: string): Promise<TQuery | null>;
  create?(data: TCommand): Promise<string | void>;
  update?(id: string, data: TCommand): Promise<void>;
  delete?(id: string): Promise<void>;
}
