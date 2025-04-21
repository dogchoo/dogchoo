export interface IBaseRepository<TQuery, TCommand, TUpdate extends { id: string } = { id: string }> {
  findAll?(): Promise<TQuery[]>;
  findById?(id: string): Promise<TQuery | null>;
  create?(data: TCommand): Promise<string | void>;
  update?(data: TUpdate): Promise<void>;
  delete?(id: string): Promise<void>;
}
