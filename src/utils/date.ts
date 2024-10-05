// converter 2023-10-26T10:00:00.000Z para "26 de outubro de 2023"

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: string): string => {
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};