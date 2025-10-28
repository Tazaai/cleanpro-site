import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function CPRegistrationForm({ onClose }) {
  const [formData, setFormData] = useState({
    business_name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    service_radius: 25,
    tax_id: '',
    insurance_info: '',
    business_type: 'individual',
    coverage_areas: '',
    references: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare submission data
      const submissionData = {
        ...formData,
        service_radius: parseInt(formData.service_radius),
        coverage_areas: formData.coverage_areas.split(',').map(area => area.trim()).filter(area => area),
        references: formData.references.split(',').map(ref => ref.trim()).filter(ref => ref)
      };

      const response = await fetch(`${API_BASE}/api/adminsheet/cp/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        toast.success('Registration application submitted successfully!');
      } else {
        toast.error(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Network error. Please check your connection and try again.');
    }

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8">
          <div className="text-center">
            <div className="text-green-600 text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted!</h2>
            <div className="text-left bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3">Next Steps:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Admin review of application (1-3 business days)</li>
                <li>• Identity verification via Stripe</li>
                <li>• Onboarding and training materials</li>
                <li>• Platform activation</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Estimated approval time:</strong> 3-5 business days
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="text-sm text-blue-700">
                <strong>What happens next?</strong>
                <br />
                Our team will review your application and contact you via email with further instructions. 
                You'll receive training materials and platform access once approved.
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Join as Coordination Point</h2>
              <p className="text-gray-600">Become a verified cleaning service provider in your area</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Business Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business/Service Name *
              </label>
              <input
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Crystal Clean Services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person *
              </label>
              <input
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Service Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Address/Location *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your primary service address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Radius (km)
              </label>
              <select
                name="service_radius"
                value={formData.service_radius}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="15">15 km</option>
                <option value="25">25 km</option>
                <option value="40">40 km</option>
                <option value="50">50 km</option>
                <option value="75">75 km</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                name="business_type"
                value={formData.business_type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="individual">Individual/Sole Proprietor</option>
                <option value="llc">LLC</option>
                <option value="corporation">Corporation</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>
          </div>

          {/* Business Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax ID/EIN (if applicable)
              </label>
              <input
                type="text"
                name="tax_id"
                value={formData.tax_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="XX-XXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Information
              </label>
              <input
                type="text"
                name="insurance_info"
                value={formData.insurance_info}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Insurance provider and policy details"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Coverage Areas (optional)
            </label>
            <input
              type="text"
              name="coverage_areas"
              value={formData.coverage_areas}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Additional cities or areas you serve (comma-separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional References (optional)
            </label>
            <textarea
              name="references"
              value={formData.references}
              onChange={handleInputChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Previous clients, business references, or professional certifications"
            />
          </div>

          {/* Terms Agreement */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Terms and Requirements</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Maintain professional standards and quality service</li>
              <li>• Respond to customer inquiries within 24 hours</li>
              <li>• Complete services according to agreed specifications</li>
              <li>• Maintain appropriate insurance coverage</li>
              <li>• Follow platform communication guidelines</li>
              <li>• Comply with regional tax and business requirements</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}