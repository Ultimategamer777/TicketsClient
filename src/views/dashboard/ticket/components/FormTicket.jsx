import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import MainCard from "../../../../ui-component/cards/MainCard";
import { toast, Toaster } from "sonner";
import { AxiosError } from "axios";

import useTicket from "../hooks/useTicket";
import { useTags } from "../../tags/hooks/useTags";
import { usePrioridades } from "../../prioridades/hooks/usePrioridades";
import useClientes from "../../clientes/hooks/useClientes";
import { useAuthStore } from "../../../../store/auth.store";
import { WhatsappIcon, PhoneIcon, EmailIcon } from "../../../../shared/icons"
import TicketFormInner from "./TicketFormInner";
import { useHelper } from "../../../../shared/helpers/useHelper";

export default function FormTicket() {
  const { id } = useParams();
  const { navigation } = useHelper();
  const { user } = useAuthStore();
  const { onSubmit, getTicketById } = useTicket();
  const { getTag } = useTags();
  const { getPrioridad } = usePrioridades();
  const { getClientes } = useClientes();

  const contactOptions = [
    { value: "email", Icon: EmailIcon },
    { value: "whatsapp", Icon: WhatsappIcon },
    { value: "telefono", Icon: PhoneIcon },
  ];

  const { data: ticketData } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id),
    enabled: !!id,
  });

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: getTag,
  });

  const { data: prioridades } = useQuery({
    queryKey: ["prioridades"],
    queryFn: getPrioridad,
  });

  const { data: clientes } = useQuery({
    queryKey: ["clientes"],
    queryFn: getClientes,
  });


  const mutation = useMutation({
    mutationFn: (values) => onSubmit(values, !!id, id),
    onSuccess: async () => {
      toast.success("Ticket guardado correctamente");
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation(-1);
    },
    onError: (error) => {
      const message = error instanceof AxiosError
        ? error.response?.data?.message
        : "Ocurrió un error inesperado";
      toast.error(message || "Error al guardar");
    },
  });
// no trae los datos al editar
  return (
    <>
      <MainCard title={id ? "Editar Ticket" : "Nuevo Ticket"}>
        <TicketFormInner
          id={id}
          user={user}
          ticketData={ticketData}
          clientes={clientes}
          tags={tags}
          prioridades={prioridades}
          nodos={ticketData?.client?.nodos || []}
          contactOptions={contactOptions}
          mutation={mutation}
        />
      </MainCard>
      <Toaster position="top-right" richColors />
    </>
  );
}
