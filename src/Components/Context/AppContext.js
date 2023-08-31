// Data now come from Redux
// import React, { useCallback } from "react";
// import axios from "axios";
// export const AppContext = React.createContext();

// export const AppContextProvider = ({ children }) => {
//   const [sessions, setSessions] = React.useState(null);
//   const [posters, setPosters] = React.useState(null);
//   const [speakers, setSpeakers] = React.useState(null);
//   const [exhibitors, setExhibitors] = React.useState(null);

//   const fetchSessions = useCallback(async () => {
//     const { data } = await axios.get(
//       `${process.env.REACT_APP_API_HOST}/sessions`
//     );
//     setSessions(data);
//   }, [setSessions]);

//   const fetchPosters = useCallback(async () => {
//     const { data } = await axios.get(
//       `${process.env.REACT_APP_API_HOST}/posters`
//     );
//     setPosters(data);
//   }, [setPosters]);

//   const fetchSpeakers = useCallback(async () => {
//     const { data } = await axios.get(
//       `${process.env.REACT_APP_API_HOST}/presenters`
//     );
//     setSpeakers(data);
//   }, [setSpeakers]);

//   const fetchExhibitors = useCallback(async () => {
//     const { data } = await axios.get(
//       `${process.env.REACT_APP_API_HOST}/exhibitors`
//     );
//     setExhibitors(data);
//   }, [setExhibitors]);

//   React.useEffect(() => {
//     fetchSessions();
//     fetchSpeakers();
//     fetchPosters();
//     fetchExhibitors();
//   }, [fetchSessions, fetchSpeakers, fetchPosters, fetchExhibitors]);

//   return (
//     <AppContext.Provider value={{ sessions, posters, speakers, exhibitors }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
