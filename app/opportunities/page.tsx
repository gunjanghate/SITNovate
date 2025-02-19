'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FreelanceJobs() {
  // State Variables
  const [searchQuery, setSearchQuery] = useState('Data Engineer');
  const [location, setLocation] = useState('United States');
  const [jobResults, setJobResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Freelance Jobs from Upwork API
  const fetchFreelanceJobs = async () => {
    setLoading(true);

    const apiUrl = `https://upwork-jobs-api2.p.rapidapi.com/active-freelance-7d?search=${encodeURIComponent(searchQuery)}&location_filter=${encodeURIComponent(location)}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '2aa8b40d86msh53acbf451256540p183289jsnb9476ae1f59f',
          'x-rapidapi-host': 'upwork-jobs-api2.p.rapidapi.com',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Full API Response:", data);
      console.log("Keys in API Response:", Object.keys(data));

      // Extract job listings properly
      const jobListings = Array.isArray(data) ? data : data?.data || [];
      console.log("Extracted Job Listings:", jobListings);

      setJobResults(jobListings);

      if (jobListings.length === 0) alert('No freelance jobs found! Try a different search query.');
    } catch (error) {
      console.error('Error fetching jobs:', error);
      alert('Failed to fetch freelance jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Find Freelance Jobs</h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label className="text-gray-700">Search Query</Label>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="E.g., Web Developer, Data Engineer"
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-gray-700">Location</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="E.g., United States, Remote"
              className="mt-2"
            />
          </div>
        </div>

        {/* Fetch Jobs Button */}
        <div className="flex justify-end">
          <Button type="button" size="lg" onClick={fetchFreelanceJobs} disabled={loading}>
            {loading ? 'Loading...' : 'Find Jobs'}
          </Button>
        </div>

        {/* Job Results Display */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Freelance Job Listings</h2>

          {jobResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobResults.map((job, index) => (
                <div key={index} className="p-5 border rounded-lg shadow-lg bg-white">
                  {/* Job Title */}
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>

                  {/* Description (trimmed to 150 characters) */}
                  <p className="text-gray-600 mt-2 text-sm">
                    {job.description?.length > 150
                      ? job.description.substring(0, 150) + '...'
                      : job.description}
                  </p>

                  {/* Budget */}
                  <p className="text-green-600 font-medium mt-2">💰 Budget: {job.budget || 'Not specified'}</p>

                  {/* Location */}
                  <p className="text-gray-500">📍 {job.location || 'Remote'}</p>

                  {/* Job Type */}
                  <p className="text-blue-600 text-sm mt-2">🛠 {job.job_type || 'Freelance'}</p>

                  {/* Apply Link */}
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Job
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No freelance jobs found. Try a different search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
