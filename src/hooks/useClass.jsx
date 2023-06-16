import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { useQuery } from 'react-query';
import useSecureAxious from './useSecureAxious';
import useAuth from './useAuth';

const useClass = () => {
    const { user } = useAuth();

    // const token = localStorage.getItem('access-token')
    const [axiosSecure] = useSecureAxious();

    const { refetch, data: selectedClass = [] } = useQuery({

        queryKey: ['selectedClass', user?.email],

        queryFn: async () => {

            const response = await axiosSecure(`/users/selectedClass?email=${user?.email}`)
            return response.data;
        }
    })
    return [selectedClass, refetch]
};

export default useClass;