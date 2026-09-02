import { QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
  queries: {
    retry: 1,
    scaleTime: 30_000, // 30 секунд не считать данные устаревшими
    refetchOnWindowFocus: true, // отключение автофокуса при фокусе на окно
  }
})

export default queryClient;