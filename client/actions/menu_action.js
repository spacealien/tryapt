export const LIST_VIEW = 'LIST_VIEW';

export function setListView() {
    return {
        type: LIST_VIEW,
        payload: 'list'
    };
}

export function setGridView() {
    return {
        type: LIST_VIEW,
        payload: 'grid'
    };
}



