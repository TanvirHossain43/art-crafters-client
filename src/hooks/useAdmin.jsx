import { useQuery } from "react-query"
import useAuth from "./useAuth"
import useSecureAxious from "./useSecureAxious"

const useAdmin = () => {
    const { user } = useAuth()
    const [axiosSecure] = useSecureAxious()
    const { data: isAdmin,isLoading:isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/admin/${user?.email}`)
            console.log('admin response', response)
            return response.data.admin;
        }
    })
    return [isAdmin,isAdminLoading]
}
export default useAdmin;