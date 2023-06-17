import React from 'react';
import useAuth from './useAuth';
import useSecureAxious from './useSecureAxious';
import { useQuery } from 'react-query';

const useInstructor = () => {
    const { user } = useAuth();
    const [axiosSecure] = useSecureAxious();

    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery(
        ['isInstructor', user?.email],
        async () => {
            if (user?.email) {
                const response = await axiosSecure.get(`/users/instructor/${user.email}`);
                return response.data.instructor;
            }
            return false;
        }
    );

    return [isInstructor, isInstructorLoading];
};

export default useInstructor;
