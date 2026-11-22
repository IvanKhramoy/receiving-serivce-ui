import { QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000, // 30 секунд не считать данные устаревшими
      refetchOnWindowFocus: true, // отключение автофокуса при фокусе на окно
    }
  }
})

export default queryClient;