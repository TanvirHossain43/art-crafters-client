import React from 'react';
import useAuth from './useAuth';
import useSecureAxious from './useSecureAxious';
import { useQuery } from 'react-query';

const useInstructor = () => {
    const { user } = useAuth()
    const [axiosSecure] = useSecureAxious()
    const { data: isInstructor,isLoading:isInstructorLoading } = useQuery({
        queryKey: ['isInstructor', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/instructor/${user?.email}`)
            console.log('instructors response', response)
            return response.data.instructor;
        }
    })
    return [isInstructor,isInstructorLoading]
};

export default useInstructor;