import * as React from "react";
import type { Action } from "./types";
import { useKBar } from "./useKBar";

export function useRegisterActions(
  actions: Action[],
  dependencies: React.DependencyList = []
) {
  const { query } = useKBar();

  console.log('useRegisterActions', actions, dependencies);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actionsCache = React.useMemo(() => actions, dependencies);

  React.useEffect(() => {
    console.log('register actions hook', query, actionsCache)
    if (!actionsCache.length) {
      return;
    }

    const unregister = query.registerActions(actionsCache);
    return () => {
      unregister();
    };
  }, [query, actionsCache]);
}
