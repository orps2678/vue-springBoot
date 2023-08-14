import { ref } from 'vue';

// 定義一個方法
export function useMessageHandler(message) {
  const changeMessage = () => {
    message.value = 'Message changed!';
  };

  return changeMessage;
}
