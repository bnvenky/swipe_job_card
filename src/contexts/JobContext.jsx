/* eslint-disable react/prop-types */

import { createContext, useState, useContext } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  return (
    <JobContext.Provider value={{ selectedJob, setSelectedJob, bookmarkedJobs, setBookmarkedJobs }}>
      {children}
    </JobContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useJob = () => useContext(JobContext);
