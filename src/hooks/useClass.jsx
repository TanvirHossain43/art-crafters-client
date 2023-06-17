import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { useQuery } from 'react-query';
import useSecureAxious from './useSecureAxious';
import useAuth from './useAuth';

const useClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = useSecureAxious();

    const { refetch, data: selectedClass = [] } = useQuery(
        ['selectedClass', user?.email],
        async () => {
            if (user?.email) {
                const response = await axiosSecure.get(`/users/selectedClass?email=${user.email}`);
                return response.data;
            }
            return [];
        }
    );

    return [selectedClass, refetch];
};

export default useClass;
