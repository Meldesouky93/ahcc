import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database'; // Import Realtime Database functions
import { db } from '../../services/firebase'; // Import your Realtime Database instance
import { useAuth } from '../../contexts/AuthContext'; // To get the current authenticated user
import EventItem from './EventItem';
import React from 'react';

export default function EventList() {
  const { currentUser } = useAuth(); // Get the current authenticated user
  const [events, setEvents] = useState([]); // Store events data in state
  const [loading, setLoading] = useState(true); // Loading state for when data is being fetched
  const [error, setError] = useState(null); // Error state to capture any errors

  useEffect(() => {
    if (currentUser) {
      // Use Realtime Database reference to fetch events for the current user
      const eventsRef = ref(db, `events/${currentUser.uid}`); // Use the correct path for your event data
      
      // Subscribe to the events data
      const unsubscribe = onValue(eventsRef, (snapshot) => {
        const data = snapshot.val();
        
        if (data) {
          const eventsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setEvents(eventsArray); // Set the events data into state
        } else {
          setEvents([]); // If no events, set empty array
        }

        setLoading(false); // Mark loading as complete
      }, (err) => {
        setError(err.message); // Capture any errors from Firebase
        setLoading(false); // Mark loading as complete even if there's an error
      });

      // Cleanup subscription on component unmount
      return () => unsubscribe();
    } else {
      setLoading(false); // If no user is logged in, stop loading
      setEvents([]); // Clear events if no user
    }
  }, [currentUser]); // Re-run effect when currentUser changes

  if (loading) {
    return <p>Loading your events...</p>; // Show loading message while data is being fetched
  }

  if (error) {
    return <p>Error fetching events: {error}</p>; // Show error message if there is an issue
  }

  return (
    <div className="event-list">
      <h2>Your Events</h2>
      {events.length === 0 ? (
        <p>No events found. Create your first event!</p>
      ) : (
        events.map(event => (
          <EventItem key={event.id} event={event} />
        ))
      )}
    </div>
  );
}
