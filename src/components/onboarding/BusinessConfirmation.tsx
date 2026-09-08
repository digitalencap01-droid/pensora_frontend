import React, { useState } from 'react';
import { Check, Edit3, MapPin, Briefcase, FileText, Users, Eye, Target, Sparkles, ShieldCheck } from 'lucide-react';
import { Business } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface BusinessConfirmationProps {
  business: Business;
  onConfirm: (updatedBusiness: Business) => void;
}

export const BusinessConfirmation: React.FC<BusinessConfirmationProps> = ({
  business,
  onConfirm
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(business.name);
  const [editedDesc, setEditedDesc] = useState(business.description);
  const [editedLocation, setEditedLocation] = useState(business.location);
  const [editedServices, setEditedServices] = useState(business.services.join(', '));
  
  // New Client Intake Fields
  const [editedAudience, setEditedAudience] = useState(business.targetAudience || '');
  const [editedCompetitors, setEditedCompetitors] = useState(business.competitors?.join(', ') || '');
  const [editedTone, setEditedTone] = useState<Business['toneOfVoice']>(business.toneOfVoice || 'friendly');
  const [editedBudget, setEditedBudget] = useState(business.monthlyBudget || '$0 - $500');
  const [editedConsent, setEditedConsent] = useState(business.consentGranted || false);

  const handleSave = () => {
    onConfirm({
      ...business,
      name: editedName,
      description: editedDesc,
      location: editedLocation,
      services: editedServices.split(',').map(s => s.trim()).filter(Boolean),
      targetAudience: editedAudience,
      competitors: editedCompetitors.split(',').map(c => c.trim()).filter(Boolean),
      toneOfVoice: editedTone,
      monthlyBudget: editedBudget,
      consentGranted: editedConsent
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Confirm your business profile</h2>
        <p className="text-sm text-slate-500">I've generated this strategy context. Verify and refine the details below.</p>
      </div>

      <Card className="border-brand-100 bg-white">
        {isEditing ? (
          <div className="space-y-4 text-xs font-semibold text-slate-650">
            <div>
              <label className="block mb-1">Business Name</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
                rows={2}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  value={editedLocation}
                  onChange={(e) => setEditedLocation(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block mb-1">Monthly Marketing Budget</label>
                <select
                  value={editedBudget}
                  onChange={(e) => setEditedBudget(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white"
                >
                  <option value="$0 - $500">$0 - $500 / month</option>
                  <option value="$500 - $2,000">$500 - $2,000 / month</option>
                  <option value="$2,000+">$2,000+ / month</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1">Main Services / Products (comma separated)</label>
              <input
                type="text"
                value={editedServices}
                onChange={(e) => setEditedServices(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Product A, Product B"
              />
            </div>

            <div>
              <label className="block mb-1">Target Audience / Ideal Customer</label>
              <textarea
                value={editedAudience}
                onChange={(e) => setEditedAudience(e.target.value)}
                rows={2}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="e.g. minimalist eco-conscious apparel buyers"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Key Competitors (comma separated)</label>
                <input
                  type="text"
                  value={editedCompetitors}
                  onChange={(e) => setEditedCompetitors(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  placeholder="Competitor A, Competitor B"
                />
              </div>
              <div>
                <label className="block mb-1">Brand Tone of Voice</label>
                <select
                  value={editedTone}
                  onChange={(e) => setEditedTone(e.target.value as any)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white"
                >
                  <option value="friendly">Friendly & Warm</option>
                  <option value="professional">Professional & Trustworthy</option>
                  <option value="bold">Bold & Direct</option>
                  <option value="luxurious">Luxurious & Elegant</option>
                </select>
              </div>
            </div>

            {/* Consent Toggle */}
            <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
              <input
                type="checkbox"
                id="audit-consent"
                checked={editedConsent}
                onChange={(e) => setEditedConsent(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-slate-200 text-brand-500 focus:ring-brand-500 cursor-pointer mt-0.5"
              />
              <label htmlFor="audit-consent" className="cursor-pointer select-none leading-normal">
                I authorize Aura to run search audits and draft automated content in Co-Pilot mode.
              </label>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save Details
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{business.name}</h3>
                <a href={business.website} target="_blank" rel="noreferrer" className="text-xs text-brand-600 font-medium hover:underline mt-0.5 block">{business.website || 'No website provided'}</a>
              </div>
              <Badge variant={business.toneOfVoice ? 'brand' : 'neutral'} className="capitalize shrink-0">
                {business.toneOfVoice || 'Friendly'} Tone
              </Badge>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-700 mb-0.5">Description</h4>
                  <p>{business.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-slate-50 py-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-700 mb-0.5">Location</h4>
                    <p>{business.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Target className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-700 mb-0.5">Monthly Budget</h4>
                    <p>{business.monthlyBudget || '$0 - $500'}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-700 mb-0.5">Target Audience</h4>
                  <p>{business.targetAudience || 'General online customers'}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Eye className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-700 mb-0.5">Key Competitors</h4>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {business.competitors && business.competitors.length > 0 ? (
                      business.competitors.map((comp, idx) => (
                        <span key={idx} className="bg-slate-100/80 border border-slate-200/50 text-slate-600 px-2 py-0.5 rounded text-[10px] font-semibold">{comp}</span>
                      ))
                    ) : (
                      <span className="text-slate-400 italic">None specified</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-700 mb-0.5">Main Services & Offerings</h4>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-500 mt-1">
                    {business.services.map((service, idx) => (
                      <li key={idx}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Consent check display */}
              <div className="flex items-center gap-2.5 bg-brand-50/30 border border-brand-100/40 rounded-xl p-3">
                <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
                <span className="text-[10px] font-semibold text-brand-700 leading-normal">
                  {business.consentGranted 
                    ? '✓ AI strategy execution co-pilot consent granted.' 
                    : '⚠ Autonomy settings pending. Consent check required.'}
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-end border-t border-slate-100 pt-4">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-1 shrink-0" />
                Edit Details
              </Button>
              <Button variant="primary" size="sm" onClick={() => onConfirm(business)}>
                <Check className="w-4 h-4 mr-1 shrink-0" />
                Yes, looks good
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
export default BusinessConfirmation;
