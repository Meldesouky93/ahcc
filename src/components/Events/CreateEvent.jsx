import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';

export default function CreateEvent() {
  const { currentUser } = useAuth();
  const [eventName, setEventName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(db, `users/${currentUser.uid}/events`), {
        name: eventName,
        dateCreated: new Date().toISOString()
      });
      setEventName('');
      setError('');
    } catch (err) {
      setError('Error creating event: ' + err.message);
    }
  };

  return (
    <div className="event-form">
      <h2>Create New Event</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}