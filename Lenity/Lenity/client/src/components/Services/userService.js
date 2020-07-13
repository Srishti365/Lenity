import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';
import { useSnackbar } from 'notistack';

export function useGetUsers() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: 
            { 
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('JWT_TOKEN'),
                  }
    };

    const getUsers = () => {
        return fetch(
            "http://localhost:8080/users/chat",
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>
                enqueueSnackbar('Could not load Users', {
                    variant: 'error',
                })
            );
    };

    return getUsers;
}
