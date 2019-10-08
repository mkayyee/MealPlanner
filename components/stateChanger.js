
// Returns a function that updates a single field within a state (Object)
const stateChanger = () => {
    // Parameters: 
    //         [0]                      [1]             [2]                 [3]
    // (The field you want to update, New value, Component's state, Component's state's setState function)
  const changeState = (field, value, state, setState) => {
    for (let s in state) {
      if (s == field) {
        setState((states) => ({
          ...states,
          [field]: value
        }));
      }
    }
  };
  return {changeState};
};

export default stateChanger;
