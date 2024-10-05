import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: string): string => {
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};