import { useJob } from '../contexts/JobContext';

const JobDetails = () => {
  const { selectedJob } = useJob();

  if (!selectedJob) {
    return <p>No job selected</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{selectedJob.title}</h1>
      <p>Location: {selectedJob.primary_details?.Place}</p>
      <p>Salary: {selectedJob.primary_details?.Salary}</p>
      <p>Phone: {selectedJob.whatsapp_no}</p>
      {selectedJob.creatives && selectedJob.creatives[0]?.thumb_url && (
        <div className="my-4">
          <img src={selectedJob.creatives[0].thumb_url} alt="Job" />
        </div>
      )}
    </div>
  );
};

export default JobDetails;


