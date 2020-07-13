import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';
import { useSnackbar } from 'notistack';

// Receive global messages
export function useGetGlobalMessages() {
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

    const getGlobalMessages = () => {
        return fetch(
            "http://localhost:8080/messages/global",
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>
                enqueueSnackbar('Could not load Global Chat', {
                    variant: 'error',
                })
            );
    };

    return getGlobalMessages;
}

// Send a global message
export function useSendGlobalMessage() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const sendGlobalMessage = body => {
        const requestOptions = {
            method: 'POST',
            headers: 
            { 
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('JWT_TOKEN'),
                  },
            body: JSON.stringify({ body: body, global: true }),
        };

        return fetch(
            "http://localhost:8080/messages/global",
            requestOptions
        )
            .then(handleResponse)
            .catch(err => {
                console.log(err);
                enqueueSnackbar('Could send message', {
                    variant: 'error',
                });
            });
    };

    return sendGlobalMessage;
}

// Get list of users conversations
export function useGetConversations() {
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

    const getConversations = () => {
        return fetch(
            "http://localhost:8080/messages/conversations",
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>
                enqueueSnackbar('Could not load chats', {
                    variant: 'error',
                })
            );
    };

    return getConversations;
}

// get conversation messages based on
// to and from id's
export function useGetConversationMessages() {
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

    const getConversationMessages = id => {
        return fetch(
            `http://localhost:8080/messages/conversations/query?userId=${id}`,
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>
                enqueueSnackbar('Could not load chats', {
                    variant: 'error',
                })
            );
    };

    return getConversationMessages;
}

export function useSendConversationMessage() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const sendConversationMessage = (id, body) => {
        const requestOptions = {
            method: 'POST',
            headers: 
            { 
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('JWT_TOKEN'),
                  },
            body: JSON.stringify({ to: id, body: body }),
        };

        return fetch(
            "http://localhost:8080/messages/",
            requestOptions
        )
            .then(handleResponse)
            .catch(err => {
                console.log(err);
                enqueueSnackbar('Could send message', {
                    variant: 'error',
                });
            });
    };

    return sendConversationMessage;
}
