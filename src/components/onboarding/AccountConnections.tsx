import React from 'react';
import { 
  BarChart2, 
  Search, 
  Instagram, 
  Facebook, 
  TrendingUp, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { Connection } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface AccountConnectionsProps {
  connections: Connection[];
  onToggle: (id: string) => void;
  onContinue: () => void;
}

export const AccountConnections: React.FC<AccountConnectionsProps> = ({
  connections,
  onToggle,
  onContinue
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart2': return <BarChart2 className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'Instagram': return <Instagram className="w-5 h-5" />;
      case 'Facebook': return <Facebook className="w-5 h-5" />;
      default: return <TrendingUp className="w-5 h-5" />;
    }
  };

  const connectedCount = connections.filter(c => c.connected).length;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Connect your marketing</h2>
        <p className="text-sm text-slate-500">This helps your AI understand what's already working. Connect accounts in one click.</p>
      </div>

      <div className="space-y-3">
        {connections.map((conn) => (
          <Card key={conn.id} className="flex items-center justify-between p-4 border border-slate-100 bg-white">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`p-2.5 rounded-xl border shrink-0 ${
                conn.connected 
                  ? 'bg-brand-50 border-brand-100 text-brand-600' 
                  : 'bg-slate-50 border-slate-100 text-slate-500'
              }`}>
                {getIcon(conn.icon)}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-slate-800">{conn.name}</h4>
                <p className="text-[10px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">{conn.description}</p>
              </div>
            </div>

            <Button
              variant={conn.connected ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => onToggle(conn.id)}
              className="shrink-0 text-[10px]"
            >
              {conn.connected ? (
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  Connected
                </span>
              ) : (
                'Demo Connection'
              )}
            </Button>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button onClick={onContinue} size="lg">
          <span>{connectedCount > 0 ? 'Continue' : 'Continue without connecting'}</span>
          <ArrowRight className="w-5 h-5 ml-1.5 shrink-0" />
        </Button>
      </div>
    </div>
  );
};
export default AccountConnections;
