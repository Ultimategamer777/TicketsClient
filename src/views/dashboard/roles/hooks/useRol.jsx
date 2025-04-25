import { useHelper } from "../../../../shared/helpers/useHelper";

export default function useRoles(){
    const { api } = useHelper(); 

    const getRoles = async() => {
        const {data: { data }} = await api.get('/roles');
        return data;
    }

      const getRolesById = async (id) => {
        const response = await api.get(`/roles/${id}`);
        return response.data;
      };
      
      const handleRoles = async (values, isEdit) => {
        const { data: { data } } = await api.post(`/roles/${isEdit ? values.id : ''}`, values);
        return data;
      };
      
      const onSubmit = async (values, isEdit = false, id = "") => {
        if (isEdit) {
            const { data } = await api.patch(`/roles/${id}`, values);
            return data;
        } else {
            const { data } = await api.post('/roles', values);
            return data;
        }
      };

     return{
        getRoles, 
        getRolesById, 
        handleRoles, 
        onSubmit
    }
}