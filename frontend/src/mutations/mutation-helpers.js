export const invalidateQueries = (queryClient, queryKey) =>
  queryClient.invalidateQueries({ queryKey });

export const setListItemInCache = (queryClient, listQueryKey, updatedItem) => {
  queryClient.setQueriesData({ queryKey: listQueryKey }, (current) => {
    if (!current?.data) {
      return current;
    }

    return {
      ...current,
      data: current.data.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    };
  });
};

export const prependListItemInCache = (queryClient, listQueryKey, createdItem) => {
  queryClient.setQueriesData({ queryKey: listQueryKey }, (current) => {
    if (!current?.data) {
      return current;
    }

    return {
      ...current,
      data: [createdItem, ...current.data],
    };
  });
};
