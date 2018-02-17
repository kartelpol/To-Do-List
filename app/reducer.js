import {cloneDeep} from 'lodash'
import {addState, undo, redo} from 'tools/usersActionsHistory'


export default function reducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case 'ADD_CATEGORY':
      var obj = {
        ...state,
        categories: state.categories.concat([action.payload.categories]),
      };
      addState(obj);
      return obj


    case 'DELETE_CATEGORY': 
      var obj = {
        ...state,
        categories: action.payload.newCategories  == undefined ? [] : action.payload.newCategories,
        tasks: action.payload.newTasks == undefined ? [] : action.payload.newTasks
      };
      addState(obj);  
      return obj


      case 'SET_CATEGORY_EDIT_MODE':
        return {
          ...state,
          categories: action.payload
        }
        

        case 'RENAME_CATEGORY':
          var obj = {
            ...state,
            categories : action.payload
          };
          addState(obj);
          return obj

          
          case 'SET_ADD_NEST_MODE':
            return {
              ...state,
              categories: action.payload
            }


            case "SAVE_NESTED_CATEGORY":
            var obj = {
              ...state,
              categories: action.payload
            };
            addState(obj);
            return obj


            case 'DISPLAY_NESTED_CATEGORIES':
              return {
                ...state,
                categories: action.payload
              }

            case 'ADD_TASK':
              var obj = {
                ...state,
                tasks: state.tasks.concat([action.payload.tasks]),
              };
              addState(obj);
              return obj
              

            case 'CHANGE_TASK_COMPLETENESS':
              var callHistory = false
              var obj = {
                ...state,
                tasks: state.tasks.map((item) => {
                  if(item.id == action.payload.id) {
                    if(item.done != action.payload.value) {
                      callHistory = true
                    }
                    item.done = action.payload.value;
                  }
                  return item;
                })
              };
              if(callHistory){
                addState(obj); 
              }
              
              return obj


            case 'EDIT_TASK':
              var obj = {
                ...state,
                tasks: action.payload 
              };
              addState(obj);
              return obj


            case 'CHANGE_CATEGORY':
              var obj = {
                ...state,
                tasks: action.payload,
              };
              addState(obj);
              return obj


              case 'FILTER_HANDLER':
                return {
                  ...state,
                  searchValue: action.payload
                }

              case 'UNDO':
                var obj = undo();
                if(obj == undefined) {
                  return {...state }
                } else return cloneDeep(obj)


              case 'REDO':
                var obj = redo();
                if(obj == undefined) {
                  return {...state}
                } else return cloneDeep(obj)

      default:
        return state;
  }
} 