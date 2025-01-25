import { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';

export default function ExhibitorForm({ eventId }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    booth: '',
    products: '',
    numProducts: 0,
  });

  useEffect(() => {
    const count = formData.products.split(',')
      .filter(p => p.trim() !== '').length;
    setFormData(prev => ({ ...prev, numProducts: count }));
  }, [formData.products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(db, `users/${currentUser.uid}/events/${eventId}/exhibitors`), {
        ...formData,
        dateCreated: new Date().toISOString()
      });
      setFormData({
        name: '',
        section: '',
        booth: '',
        products: '',
        numProducts: 0,
      });
    } catch (error) {
      console.error("Error adding exhibitor:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Company Name"
        required
      />
      <input
        type="text"
        value={formData.products}
        onChange={(e) => setFormData({...formData, products: e.target.value})}
        placeholder="Products (comma-separated)"
      />
      <input
        type="number"
        value={formData.numProducts}
        readOnly
        placeholder="Product Count"
      />
      <button type="submit">Add Exhibitor</button>
    </form>
  );
}