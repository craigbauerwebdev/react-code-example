import { useMemo, useReducer } from "react";

function toggler(currentValue, newValue) {
  return typeof newValue === "boolean" ? newValue : !currentValue;
}
export function useToggle(initialValue = false) {
  return useReducer(toggler, initialValue);
}

/* Example:
  const [
    isOpen,
    {
      on: openMobileFilter,
      off: closeMobileFilter,
      toggle: toggleMobileFilter,
    },
  ] = useBoolean();
*/
export function useBoolean(initialValue = false) {
  const [value, toggle] = useToggle(initialValue);

  const handlers = useMemo(
    () => ({
      toggle,
      on: () => toggle(true),
      off: () => toggle(false),
    }),
    [toggle]
  );

  return [value, handlers];
}
