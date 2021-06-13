//an action creator 
export const search = (parameter) => {
    return {
        type: 'SEARCH',
        payload: parameter
    }
}