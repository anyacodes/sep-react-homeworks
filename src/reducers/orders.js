import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

const positions =  [
  {name : 'clients' },
  {name: 'conveyor_1'},
  {name: 'conveyor_2'},
  {name: 'conveyor_3'},
  {name: 'conveyor_4'},
  {name: 'finish'},
];

export default (state = [], action) => {
  const { payload } = action;
  let newOrder, index;

  switch (action.type) {
    case CREATE_NEW_ORDER:
      return [
        ...state,
        {
          id: payload.id,
          recipe: payload.recipe,
          ingredients: [],
          position: 'clients'
        }
      ];

    case MOVE_ORDER_NEXT:
      newOrder = changeOrderPosition(state, payload, 'next');
      index = state.findIndex(order => order.id === payload);

      return state.map((order, key) => (key === index ? newOrder : order));

    case MOVE_ORDER_BACK:
      newOrder = changeOrderPosition(state, payload, 'prew');
      index = state.findIndex(order => order.id === payload);
      return state.map((order, key) => (key === index ? newOrder : order));

    case ADD_INGREDIENT:
      newOrder = state.find(order => order.position === payload.from);

      if (!newOrder) {
        return state;
      }

      index = state.findIndex(order => order.id === newOrder.id);
      newOrder = {...newOrder, ingredients: [...newOrder.ingredients, payload.ingredient]};

      return state.map((order, key) => (key === index ? newOrder : order));

    default:
      return state;
  }
};

export const getOrdersFor = (state, position) =>
  state.orders.filter(order => order.position === position);

function changeOrderPosition(state, payload, direction) {
  let currentOrder = state.find(order => order.id === payload);

  if (!currentOrder) {
    return null;
  }

  return {...currentOrder, position: getNewtPosition(currentOrder, direction)};
}

function getNewtPosition(order, direction) {
  let positionIndex = positions.findIndex(
    positionInList => positionInList.name === order.position
  ), difference = checkOrderDifference(order.recipe, order.ingredients);

  if (direction === 'next') {
    if ((positions[(positionIndex + 1)].name === 'finish') && (difference.length!==0)) {
      return order.position
    } else {
      return positions[(positionIndex + 1)].name;
    }
  } else if (direction === 'prew') {
    if (positionIndex === 1) {
      return order.position;
    } else {
      return positions[--positionIndex].name;
    }
  }
  return order.position;
}

function checkOrderDifference(order, result) {
  return result.filter(i => !order.includes(i)).concat(order.filter(i => !result.includes(i)));
}