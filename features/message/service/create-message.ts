import { CreateMessageFormValue, createMessageSchema } from "@/features/message/model/schema/create-message-schema";
import { CustomError } from "@/util/custom-error";
import { pushMessage } from "../model/repository/create-message";

// 사용자가 입력한 데이터를 받아 메시지를 저장하는 서비스 함수
export const createMessage = async (data: CreateMessageFormValue) => {
  // 런타임에서는 CreateMessageFormValue가 아닌 값이 들어올 가능성이 있다.
  // safeParse를 통해 작성된 스키마에 맞는 값만을 추출한다.
  const parsed = createMessageSchema.safeParse(data);

  if (!parsed.success) {
    throw new CustomError("유효하지 않은 메시지 형식입니다.", 400);
  }

  // 현재 시각을 생성 시간으로 추가
  const created = new Date().toISOString();

  const createMessage = {
    ...parsed.data,
    created,
  };

  const result = await pushMessage(createMessage);

  return result;
};
