import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { ProfileForm } from '../components/ProfileForm';
import { formatPrice, formatDate } from '../lib/utils';

export function ProfilePage() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const bookings = useStore((state) => state.bookings);
  const events = useStore((state) => state.events);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
        <Button>Sign In</Button>
      </div>
    );
  }

  const userBookings = bookings.map(booking => ({
    ...booking,
    event: events.find(event => event.id === booking.eventId)
  }));

  const handleUpdateProfile = (data: Partial<typeof user>) => {
    setUser({ ...user, ...data });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <ProfileForm user={user} onSubmit={handleUpdateProfile} />
        ) : (
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Role:</span> {user.role}</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">My Bookings</h2>
        <div className="space-y-4">
          {userBookings.map(booking => (
            <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {booking.event?.title}
                  </h3>
                  <p className="text-gray-600">
                    {booking.event && formatDate(booking.event.date)}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Tickets: {booking.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(booking.totalPrice)}</p>
                  <span className="inline-block px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {userBookings.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              You haven't made any bookings yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}