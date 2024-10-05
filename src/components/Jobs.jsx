/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useJob } from '../contexts/JobContext';
import { useSwipeable } from 'react-swipeable';
// src/components/Jobs.js
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  
  const navigate = useNavigate();  // Added here
  const { setSelectedJob, bookmarkedJobs, setBookmarkedJobs } = useJob();  // Destructuring jobs state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
        if (response.data && Array.isArray(response.data.results)) {
          setJobs(prevJobs => [...prevJobs, ...response.data.results]);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [page]);

  // Navigate to Job Details page when a job is clicked
  const handleJobClick = (job) => {
    setSelectedJob(job);
    navigate(`/jobs/${job.id}`);
  };

  const handleSwipe = (direction, job) => {
    if (direction === 'right') {
      const updatedBookmarks = [...bookmarkedJobs, job];
      setBookmarkedJobs(updatedBookmarks);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
    } else if (direction === 'left') {
      setJobs(jobs.filter(j => j.id !== job.id));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => handleSwipe('left', eventData.job),
    onSwipedRight: (eventData) => handleSwipe('right', eventData.job),
  });

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setPage(prevPage => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="p-4 overflow-y-auto h-screen" ref={containerRef}>
      {isLoading && <div className="loading-spinner">Loading...</div>}
      {error && <p className="text-red-500">{error}</p>}
      {jobs.length === 0 && !isLoading && !error && <p>No jobs available</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border bg-white rounded-lg p-2 shadow-md cursor-pointer flex flex-col"
            onClick={() => handleJobClick(job)}  // Call handleJobClick on click
            {...handlers}
          >
            {job.creatives[0]?.thumb_url && (
              <div className="w-full h-32 mb-4 overflow-hidden rounded-lg">
                <img src={job.creatives[0].thumb_url} alt="Job thumbnail" className="object-cover w-full" height={100} />
              </div>
            )}
            <h2 className="text-m font-bold mb-2">{job.title}</h2>
            <h2 className="text-sm font-bold mb-2">Company: {job.company_name}</h2>
            <p>Location: {job.primary_details?.Place}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Jobs;