export type StoreAction<TType, TPayload = any> = {
  type: TType;
  payload?: TPayload;
};

export type ExtractPayload<T> = T extends StoreAction<string, infer P> ? P : never;

export type ActionType<T> = T extends StoreAction<infer U, any> ? U : never;
