import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database'; // Import Realtime Database functions
import { db } from '../../services/firebase'; // Import your Realtime Database instance
import { useAuth } from '../../contexts/AuthContext'; // To get the current authenticated user
import EventItem from './EventItem';
import React from 'react';

export default function EventList() {
  const { currentUser } = useAuth(); // Get the current authenticated user
  const [events, setEvents] = useState([]); // Store events data in state

  useEffect(() => {
    if (currentUser) {
      // Use Realtime Database reference to fetch events for the current user
      const eventsRef = ref(db, `events/${currentUser.uid}`); // Use the correct path for your event data
      const unsubscribe = onValue(eventsRef, (snapshot) => {
        const data = snapshot.val();
        const eventsArray = data
          ? Object.keys(data).map(key => ({
              id: key,
              ...data[key],
          }))
          : [];
        setEvents(eventsArray); // Set the events data into state
      });

      // Cleanup subscription on component unmount
      return () => unsubscribe();
    }
  }, [currentUser]); // Re-run effect when currentUser changes

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
