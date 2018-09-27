import Uuid from 'uuid/v4'

const LogMessage = message => {
    document.dispatchEvent(new CustomEvent('log-action', {
        detail: {
            id: Uuid(),
            message
        }
    }));
}

export {
    LogMessage,
}