export const decodeJwt = (token) => {
  try {
    //JWT состоит из 3 часте, [1] забирает средний (payload)
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    //типизированный массив байтов (целых чисел от 0 до 255); atob - декодирует base64 в бин. строку
    //получаем массив байтов
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

