# Content Gating Work Flow

This doc will go over how to remove content for users with different levels of
site access.

## Were to remove content

In this file `src/store/reducers/index.js` is were all data for `Sessions`,
`Speaker`, `Exhibitors` and `Posters` is set. So we can remove any data that
need to be remove for any user there and insure that the data never makes to any
component that is using the data from `store`.

- Example of data removal. The process below could be applied to any data listed
  above that is stored in a `redux store`.

```Javascript
const setSessions = (state, payload) => {
  const userType = getAuthType(state.user);
  //Check for any user that need to be Gated.
  const [isGroupA, isGroupB] = inGroup(
    [registrationTypes.groupA, registrationTypes.groupB],
    userType
  );

  /**
   * Remove data if user type is in GroupA
   */
  if (isGroupA) {
    return {
      ...state,
      sessions: payload.filter((s) => s.SessionTrack !== "Technical"),
    };
  }

  if (isGroupB) {
    return {
      ...state,
      sessions: payload.filter((s) => s.SessionTrack !== "Content"),
    };
  }

  return {
    ...state,
    sessions: payload,
  };
};
```

## Single page gating

Because we remove content in the store some deep links to content/pages that the
user shouldn't have access to will brake you site. Assume that the user
shouldn't have access to this page
`http://localhost:4211/live-stream/15337746/Create-engaging-interactions-with-your-live-and-virtual-audiences`
when we try to find the data for this page by `SessionId` `15337746` it will not
be found because it would have been removed before we set the data to the
`store`. Below is the fix will need to be applied to any `single` page that has
gated content,.

```Javascript
 const fetchSession = useCallback(
    (id, sessionsData) => {
      const data = sessionsData.find((s) => `${s.SessionId}` === id);
      /**
       * No data mean user should not be able to see this page. The content was filtered out.
       * Redirect to home page.
       */
      if (!data) {
        return history.push("/");
      }

      if (data.SubSessions) {
        setSpeakers((prev) => {
          return prev.concat(data.SubSessions.map((sub) => sub.Presenters));
        });
      }
      setSession(data);
    },
    [setSpeakers, history]
  );
```

## Navigation gating

How to remove navigation items for different user types. You will need to use
this hook `src/hooks/useNavGuarding.js`.

- Implementing the hook example from `src/Components/Header/HeaderWrapper.js`

```Javascript
  const getUser = getAuthType(user);
  // Different user that have different levels of site access
  const [isGroupA, isGroupB] = inGroup(
    [registrationTypes.groupA, registrationTypes.groupB],
    getUser
  );
  const navData = useNavGuarding(
    { groupA: isGroupA, groupB: isGroupB },
    staticData.header
  );
```

### How to remove navigation items

To remove different navigation items you will need to make a javascript
[hashMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
On the left hand side of the map aka the map key will be the navigation the you
want to remove or has item in it's drop down that you want to remove.

- Example of navigation removal for a dropdown item.

```Javascript
  if (groupA) {
    // Nav Items to remove if user is in GroupA
    // Left hand side is Nav Title
    // Right hand side is dropdown items name to be removed
    const groupAMap = new Map([
      ["About", ["FAQs"]],
    ]);

    return purgeData(groupAMap, deepCopy);
  }
```

In the example above the `FAQs` navigation would be removed from the `About`
dropdown list.

- Example of navigation removal for the entire node _ie(A main navigational item
  that may or may not have a dropdown)_

```Javascript
  if (groupA) {
    // Nav Items to remove if user is in GroupA
    // Left hand side is Nav Title
    // Right hand side is dropdown items name to be removed
    const groupAMap = new Map([
      ["About", ["About"]],
    ]);

    return purgeData(groupAMap, deepCopy);
  }
```

In the example above the `About` navigation would be removed from the main
navigation along with all of its dropdown items.
