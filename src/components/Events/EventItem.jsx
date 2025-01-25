import { Link } from 'react-router-dom';
import React from 'react';

export default function EventItem({ event }) {
  return (
    <div className="event-item">
      <h3>{event.name}</h3>
      <p>Created: {new Date(event.dateCreated).toLocaleDateString()}</p>
      <Link to={`/event/${event.id}/exhibitors`}>Manage Exhibitors</Link>
    </div>
  );
}