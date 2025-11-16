import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function CoordinationPointCard({ cp, onEdit, onDelete, canEdit = false, showActions = true }) {
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(cp);
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this coordination point?')) {
      onDelete(cp.id);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatRating = (rating) => {
    if (!rating || rating === 0) return 'No ratings';
    return `${rating.toFixed(1)} ⭐`;
  };

  const formatDistance = (distance) => {
    if (!distance) return '';
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)}m away`;
    }
    return `${distance.toFixed(1)}km away`;
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard`);
    }).catch(() => {
      toast.error('Failed to copy to clipboard');
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${isMobile ? 'w-full' : 'max-w-sm'}`}>
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-600">
        {cp.image_url && !imageError ? (
          <img
            src={cp.image_url}
            alt={cp.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-4xl mb-2">🏢</div>
              <div className="font-medium">{cp.name}</div>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cp.status)}`}>
            {cp.status || 'Active'}
          </span>
        </div>

        {/* Rating Badge */}
        {cp.rating && cp.rating > 0 && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
            {formatRating(cp.rating)}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{cp.name}</h3>
          {cp.location && (
            <div className="flex items-start gap-1 text-sm text-gray-600">
              <span className="mt-0.5">📍</span>
              <span className="flex-1">{cp.location}</span>
            </div>
          )}
          {cp.distance && (
            <div className="text-xs text-gray-500 mt-1">
              {formatDistance(cp.distance)}
            </div>
          )}
        </div>

        {/* Description */}
        {cp.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {cp.description}
          </p>
        )}

        {/* Contact Information */}
        <div className="space-y-2 mb-4">
          {cp.phone && (
            <div className="flex items-center gap-2 text-sm">
              <span>📞</span>
              <button
                onClick={() => copyToClipboard(cp.phone, 'Phone number')}
                className="text-blue-600 hover:text-blue-800 hover:underline flex-1 text-left"
              >
                {cp.phone}
              </button>
            </div>
          )}
          {cp.email && (
            <div className="flex items-center gap-2 text-sm">
              <span>📧</span>
              <button
                onClick={() => copyToClipboard(cp.email, 'Email')}
                className="text-blue-600 hover:text-blue-800 hover:underline flex-1 text-left truncate"
              >
                {cp.email}
              </button>
            </div>
          )}
          {cp.website && (
            <div className="flex items-center gap-2 text-sm">
              <span>🌐</span>
              <a
                href={cp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline flex-1 truncate"
              >
                {cp.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>

        {/* Services */}
        {cp.services && cp.services.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Services:</div>
            <div className="flex flex-wrap gap-1">
              {cp.services.slice(0, isMobile ? 2 : 3).map((service, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
              {cp.services.length > (isMobile ? 2 : 3) && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{cp.services.length - (isMobile ? 2 : 3)} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Hours */}
        {cp.hours && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-1">Hours:</div>
            <div className="text-sm text-gray-600">{cp.hours}</div>
          </div>
        )}

        {/* Stats */}
        {(cp.total_bookings || cp.completion_rate) && (
          <div className={`grid grid-cols-2 gap-3 mb-4 text-center`}>
            {cp.total_bookings !== undefined && (
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-bold text-gray-800">{cp.total_bookings}</div>
                <div className="text-xs text-gray-600">Bookings</div>
              </div>
            )}
            {cp.completion_rate !== undefined && (
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-bold text-gray-800">{cp.completion_rate}%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className={`flex gap-2 ${isMobile ? 'flex-col' : ''}`}>
            <button className={`${isMobile ? 'w-full' : 'flex-1'} bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium`}>
              📞 Contact
            </button>
            {canEdit && (
              <>
                <button
                  onClick={handleEdit}
                  className={`${isMobile ? 'w-full' : 'flex-1'} bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium`}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={handleDelete}
                  className={`${isMobile ? 'w-full' : 'flex-1'} bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium`}
                >
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Last Updated */}
      {cp.updated_at && (
        <div className="px-4 pb-3">
          <div className="text-xs text-gray-400 text-center border-t pt-2">
            Updated {new Date(cp.updated_at).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
}