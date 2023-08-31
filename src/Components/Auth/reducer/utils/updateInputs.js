/**
 * Update state for new input value
 * @param {object} state
 * @param {string} name
 * @param {string} name
 * @returns {object} updated state
 */
export default function updateInputs(state, { name, value }) {
  const update = {};
  const inputUpdate = state.inputs.map((input) => {
    // Avoid state mutations
    const copyInput = { ...input };
    if (copyInput.label === name) {
      copyInput.value = value;

      if (copyInput.type === "email") {
        update.emailAddress = value;
      } else {
        update.confirmationNumber = value;
      }
    }

    return copyInput;
  });

  return {
    ...state,
    inputs: inputUpdate,
    ...update,
  };
}
