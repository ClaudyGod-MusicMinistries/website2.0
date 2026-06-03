'use client';

import { useState, useEffect } from 'react';
import { Activity, Server, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  services: Record<string, 'up' | 'down'>;
  metrics: {
    responseTime: number;
    memoryUsage: number;
    cpuUsage: number;
  };
}

interface ActivityLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  service: string;
  message: string;
}

export function ServerMonitor() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/server/health');
        const data = await response.json();
        setHealth(data);
        setLastUpdate(new Date());

        // Log the health check
        setActivityLog((prev) => [
          {
            timestamp: new Date().toISOString(),
            level: data.status === 'healthy' ? 'info' : 'warning',
            service: 'System',
            message: `Health check: ${data.status}`,
          },
          ...prev.slice(0, 49), // Keep last 50 logs
        ]);
      } catch (error) {
        console.error('[ServerMonitor] Health check failed:', error);
        setActivityLog((prev) => [
          {
            timestamp: new Date().toISOString(),
            level: 'error',
            service: 'System',
            message: 'Health check failed',
          },
          ...prev.slice(0, 49),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    // Check immediately
    checkHealth();

    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 bg-neutral-900 rounded-lg border border-white/10">
        <p className="text-neutral-400">Loading server status...</p>
      </div>
    );
  }

  if (!health) {
    return (
      <div className="p-6 bg-red-950/30 border border-red-800/50 rounded-lg">
        <p className="text-red-400">Unable to fetch server health status</p>
      </div>
    );
  }

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'unhealthy':
        return 'text-red-400';
      default:
        return 'text-neutral-400';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500/10 border-green-500/30';
      case 'degraded':
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 'unhealthy':
        return 'bg-red-500/10 border-red-500/30';
      default:
        return 'bg-neutral-500/10 border-neutral-500/30';
    }
  };

  const getServiceStatus = (service: 'up' | 'down') => {
    return service === 'up' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-purple-400" />
          <h2 className="font-bricolage font-bold text-xl text-white">Server Monitor</h2>
        </div>
        {lastUpdate && (
          <p className="text-sm text-neutral-500">
            Updated: {lastUpdate.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Status Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Overall Status */}
        <div className={cn('p-4 rounded-lg border', getStatusBgColor(health.status))}>
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-white">System Status</p>
            {health.status === 'healthy' ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            )}
          </div>
          <p className={cn('text-lg font-bold', getStatusColor(health.status))}>
            {health.status.charAt(0).toUpperCase() + health.status.slice(1)}
          </p>
        </div>

        {/* Uptime */}
        <div className="p-4 bg-neutral-800/50 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <p className="font-semibold text-white">Uptime</p>
          </div>
          <p className="text-lg font-bold text-blue-300">{formatUptime(health.uptime)}</p>
        </div>
      </div>

      {/* Services Status */}
      <div className="p-4 bg-neutral-900 rounded-lg border border-white/10">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-purple-400" />
          Services
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {Object.entries(health.services).map(([service, status]) => (
            <div
              key={service}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium capitalize',
                getServiceStatus(status),
              )}
            >
              <div className="flex items-center justify-between">
                <span>{service}</span>
                <span className={status === 'up' ? 'text-green-400' : 'text-red-400'}>
                  {status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="p-4 bg-neutral-900 rounded-lg border border-white/10">
        <h3 className="font-semibold text-white mb-3">Performance Metrics</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-400">Response Time</span>
            <span className="text-white font-medium">{health.metrics.responseTime}ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Memory Usage</span>
            <span className="text-white font-medium">{health.metrics.memoryUsage}MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">CPU Usage</span>
            <span className="text-white font-medium">{health.metrics.cpuUsage}%</span>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="p-4 bg-neutral-900 rounded-lg border border-white/10">
        <h3 className="font-semibold text-white mb-3">Activity Log</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {activityLog.length === 0 ? (
            <p className="text-sm text-neutral-500">No activity yet</p>
          ) : (
            activityLog.map((log, i) => (
              <div key={i} className="flex gap-2 text-xs text-neutral-400">
                <span className="text-neutral-600">{new Date(log.timestamp).toLocaleTimeString()}</span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded',
                    log.level === 'error'
                      ? 'bg-red-500/20 text-red-400'
                      : log.level === 'warning'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400',
                  )}
                >
                  {log.level.toUpperCase()}
                </span>
                <span className="text-neutral-300">{log.service}</span>
                <span className="text-neutral-400">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
