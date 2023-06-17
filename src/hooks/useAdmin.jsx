import { useQuery } from 'react-query';
import useAuth from './useAuth';
import useSecureAxious from './useSecureAxious';

const useAdmin = () => {
    const { user } = useAuth();
    const [axiosSecure] = useSecureAxious();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery(
        ['isAdmin', user?.email],
        async () => {
            if (user?.email) {
                const response = await axiosSecure.get(`/users/admin/${user.email}`);
                return response.data.admin;
            }
            return null;
        }
    );

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
