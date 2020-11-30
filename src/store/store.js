import { createStore } from 'redux';

const initialState = {
  response: {},
  query: '',
  perPage: 10,
}

export const actions = {
  change: (name, value) => ({
    type: 'ON_CHANGE',
    name,
    value,
  }),
  search: async(getImages, query, perPage) => ({
    type: 'ON_SEARCH',
    response: await getImages(query, perPage)
  })
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE': {
      return {
        ...state,
        [action.name]: action.value,
      }
    }

    case 'ON_SEARCH': {
      return {
        ...state,
        response: action.response,
      }
    }

    default: {
      return state;
    }
  }
}

export const store = createStore(reducer, initialState);
