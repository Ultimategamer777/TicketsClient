import { useHelper } from "../../../../shared/helpers/useHelper";

import { useGeneral } from "./useGeneral";
import { useAttentionHours } from "./useAttetionHours";

const objPayload = {
  info_general: {
    id: 1,
    content: { ...useGeneral().formGeneral },
    validations: useGeneral().validateGeneralSchema,
  },
  attention_hours: {
    id: 2,
    content: { ...useAttentionHours().formAttentionHours },
    // validations: useAttentionHours().validateAttentionHoursSchema
  },
};

export default function useCompanies() {
  const { api } = useHelper();

  const onSubmit = async (values, id) => {
    try {
      if (id) {
        const { data } = await api.patch(`companies/${id}`, values);
        return data;
      } else {
        const { data } = await api.post("companies", values);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    objPayload,
    onSubmit
  };
}
