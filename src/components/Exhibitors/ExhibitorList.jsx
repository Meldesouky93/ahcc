import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import ExhibitorItem from './ExhibitorItem';

export default function ExhibitorList({ eventId }) {
  const { currentUser } = useAuth();
  const [exhibitors, setExhibitors] = useState([]);

  useEffect(() => {
    if (currentUser && eventId) {
      const exhibitorsRef = ref(db, `users/${currentUser.uid}/events/${eventId}/exhibitors`);
      const unsubscribe = onValue(exhibitorsRef, (snapshot) => {
        const data = snapshot.val();
        const exhibitorsArray = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })) : [];
        setExhibitors(exhibitorsArray);
      });
      return () => unsubscribe();
    }
  }, [currentUser, eventId]);

  return (
    <div className="exhibitor-list">
      <h2>Exhibitors</h2>
      {exhibitors.length === 0 ? (
        <p>No exhibitors found. Add your first exhibitor!</p>
      ) : (
        exhibitors.map(exhibitor => (
          <ExhibitorItem key={exhibitor.id} exhibitor={exhibitor} />
        ))
      )}
    </div>
  );
}