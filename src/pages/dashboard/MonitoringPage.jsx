import { useState } from 'react';
import {
  HiOutlineChartBar,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineRefresh,
  HiOutlineDownload,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineExclamation,
  HiOutlineInformationCircle,
  HiOutlineCube,
  HiOutlineKey,
  HiOutlineLightningBolt,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineTerminal,
  HiOutlineEye,
  HiOutlineBell,
  HiOutlineX
} from 'react-icons/hi';
import { Reveal, StaggerChildren } from '../../components/Animated';

// Mock execution logs
const mockLogs = [
  {
    id: 1,
    timestamp: '2026-02-09 11:45:32',
    level: 'info',
    agent: 'Customer Support Bot',
    agentId: 1,
    message: 'Processing customer inquiry #4521',
    details: {
      taskId: 'task_abc123',
      input: 'Customer asked about refund policy',
      tokensUsed: 245
    }
  },
  {
    id: 2,
    timestamp: '2026-02-09 11:45:31',
    level: 'success',
    agent: 'Customer Support Bot',
    agentId: 1,
    message: 'Successfully sent response to customer #4520',
    details: {
      taskId: 'task_abc122',
      responseTime: '1.2s',
      tokensUsed: 189
    }
  },
  {
    id: 3,
    timestamp: '2026-02-09 11:45:28',
    level: 'warning',
    agent: 'Data Analyst Agent',
    agentId: 2,
    message: 'Rate limit warning: 80% of hourly quota used',
    details: {
      currentUsage: '8,000',
      limit: '10,000',
      resetIn: '15 min'
    }
  },
  {
    id: 4,
    timestamp: '2026-02-09 11:45:25',
    level: 'error',
    agent: 'Research Assistant',
    agentId: 5,
    message: 'Failed to fetch data from external API',
    details: {
      taskId: 'task_xyz789',
      error: 'Connection timeout after 30s',
      retryCount: 3
    }
  },
  {
    id: 5,
    timestamp: '2026-02-09 11:45:20',
    level: 'info',
    agent: 'Code Reviewer',
    agentId: 4,
    message: 'Started reviewing PR #1234',
    details: {
      taskId: 'task_pr1234',
      filesChanged: 12,
      linesAdded: 345
    }
  },
  {
    id: 6,
    timestamp: '2026-02-09 11:45:15',
    level: 'success',
    agent: 'Email Responder',
    agentId: 6,
    message: 'Batch email send completed',
    details: {
      taskId: 'task_email001',
      emailsSent: 1250,
      bounces: 3
    }
  },
  {
    id: 7,
    timestamp: '2026-02-09 11:45:10',
    level: 'info',
    agent: 'Content Writer',
    agentId: 3,
    message: 'Generated blog post draft',
    details: {
      taskId: 'task_blog001',
      wordCount: 1450,
      readTime: '6 min'
    }
  },
];

// Mock tool calls
const mockToolCalls = [
  {
    id: 1,
    timestamp: '2026-02-09 11:45:32',
    agent: 'Customer Support Bot',
    tool: 'zendesk_api',
    action: 'get_ticket',
    duration: '0.3s',
    status: 'success',
    input: { ticketId: '4521' },
    output: { status: 'open', priority: 'high' }
  },
  {
    id: 2,
    timestamp: '2026-02-09 11:45:30',
    agent: 'Customer Support Bot',
    tool: 'email_sender',
    action: 'send_email',
    duration: '1.2s',
    status: 'success',
    input: { to: 'customer@email.com', template: 'response' },
    output: { messageId: 'msg_123abc' }
  },
  {
    id: 3,
    timestamp: '2026-02-09 11:45:25',
    agent: 'Research Assistant',
    tool: 'web_scraper',
    action: 'fetch_url',
    duration: '30.0s',
    status: 'failed',
    input: { url: 'https://api.example.com/data' },
    output: { error: 'Connection timeout' }
  },
  {
    id: 4,
    timestamp: '2026-02-09 11:45:20',
    agent: 'Code Reviewer',
    tool: 'github_api',
    action: 'get_pull_request',
    duration: '0.5s',
    status: 'success',
    input: { repo: 'company/project', pr: 1234 },
    output: { files: 12, additions: 345, deletions: 89 }
  },
  {
    id: 5,
    timestamp: '2026-02-09 11:45:15',
    agent: 'Data Analyst Agent',
    tool: 'sql_executor',
    action: 'run_query',
    duration: '2.3s',
    status: 'success',
    input: { query: 'SELECT * FROM analytics...' },
    output: { rowCount: 15420 }
  },
];

// Mock alerts
const mockAlerts = [
  {
    id: 1,
    timestamp: '2026-02-09 11:30:00',
    severity: 'critical',
    title: 'Agent Failed: Research Assistant',
    message: 'Agent has failed 3 consecutive tasks. Manual review required.',
    acknowledged: false
  },
  {
    id: 2,
    timestamp: '2026-02-09 10:45:00',
    severity: 'warning',
    title: 'High Token Usage',
    message: 'Daily token usage at 85% of limit. Consider upgrading plan.',
    acknowledged: false
  },
  {
    id: 3,
    timestamp: '2026-02-09 09:00:00',
    severity: 'info',
    title: 'Scheduled Maintenance',
    message: 'System maintenance scheduled for Feb 10, 2026 at 02:00 UTC.',
    acknowledged: true
  },
  {
    id: 4,
    timestamp: '2026-02-08 16:30:00',
    severity: 'warning',
    title: 'API Rate Limit Approaching',
    message: 'External API rate limit at 90%. Requests may be throttled.',
    acknowledged: true
  },
];

// Mock reasoning summaries
const mockReasoningSummaries = [
  {
    id: 1,
    agent: 'Customer Support Bot',
    task: 'Process refund inquiry #4521',
    timestamp: '2026-02-09 11:45:00',
    reasoning: [
      'Received customer inquiry about refund for order #12345',
      'Checked order status: delivered 2 days ago',
      'Verified customer identity through email match',
      'Applied refund policy: eligible for return within 30 days',
      'Generated response with return instructions',
      'Escalation not required: standard refund case'
    ],
    decision: 'Approved refund request and sent return instructions',
    confidence: 0.94
  },
  {
    id: 2,
    agent: 'Code Reviewer',
    task: 'Review PR #1234',
    timestamp: '2026-02-09 11:40:00',
    reasoning: [
      'Fetched PR details: 12 files changed, 345 additions',
      'Analyzed code structure and patterns',
      'Identified 3 potential issues: security, performance, style',
      'Generated inline comments for each issue',
      'Calculated overall code quality score: 7.5/10'
    ],
    decision: 'Requested changes with 3 suggestions',
    confidence: 0.87
  },
];

const levelStyles = {
  info: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: HiOutlineInformationCircle },
  success: { bg: 'bg-green-500/10', text: 'text-green-400', icon: HiOutlineCheckCircle },
  warning: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', icon: HiOutlineExclamation },
  error: { bg: 'bg-red-500/10', text: 'text-red-400', icon: HiOutlineExclamationCircle },
};

const severityStyles = {
  critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
  warning: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  info: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
};

const tabs = [
  { id: 'logs', label: 'Execution Logs', icon: HiOutlineTerminal },
  { id: 'tools', label: 'Tool Calls', icon: HiOutlineKey },
  { id: 'alerts', label: 'Errors & Alerts', icon: HiOutlineBell, badge: 2 },
  { id: 'reasoning', label: 'Agent Reasoning', icon: HiOutlineLightningBolt },
];

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState('logs');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [agentFilter, setAgentFilter] = useState('all');
  const [expandedLog, setExpandedLog] = useState(null);
  const [expandedTool, setExpandedTool] = useState(null);
  const [expandedReasoning, setExpandedReasoning] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showLevelFilter, setShowLevelFilter] = useState(false);
  const [showAgentFilter, setShowAgentFilter] = useState(false);

  const agents = [...new Set(mockLogs.map(l => l.agent))];

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.agent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesAgent = agentFilter === 'all' || log.agent === agentFilter;
    return matchesSearch && matchesLevel && matchesAgent;
  });

  const unacknowledgedAlerts = mockAlerts.filter(a => !a.acknowledged);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Monitoring & Logs</h2>
            <p className="text-gray-400 mt-1">Real-time execution logs and system monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                autoRefresh
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-gray-800 text-gray-400 border border-gray-700'
              }`}
            >
              <HiOutlineRefresh className={autoRefresh ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">{autoRefresh ? 'Live' : 'Paused'}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
              <HiOutlineDownload />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </Reveal>

      {/* Stats Row */}
      <StaggerChildren staggerDelay={0.05}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Logs', value: '12,458', change: '+234', color: 'cyan' },
            { label: 'Tool Calls', value: '8,921', change: '+156', color: 'purple' },
            { label: 'Errors', value: '23', change: '-5', color: 'red' },
            { label: 'Avg Response', value: '1.4s', change: '-0.2s', color: 'green' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <span className={`text-xs ${stat.change.startsWith('+') && stat.color !== 'red' ? 'text-green-400' : stat.change.startsWith('-') && stat.color === 'red' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </StaggerChildren>

      {/* Tabs */}
      <Reveal>
        <div className="border-b border-gray-800">
          <nav className="flex gap-1 overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="text-lg" />
                {tab.label}
                {tab.badge && (
                  <span className="px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </Reveal>

      {/* Filters (for logs and tools tabs) */}
      {(activeTab === 'logs' || activeTab === 'tools') && (
        <Reveal>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {activeTab === 'logs' && (
              <div className="relative">
                <button
                  onClick={() => setShowLevelFilter(!showLevelFilter)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:border-gray-700 transition-colors"
                >
                  <HiOutlineFilter className="text-lg" />
                  <span>Level: {levelFilter}</span>
                  <HiOutlineChevronDown className={`transition-transform ${showLevelFilter ? 'rotate-180' : ''}`} />
                </button>
                {showLevelFilter && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowLevelFilter(false)} />
                    <div className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-20 py-1">
                      {['all', 'info', 'success', 'warning', 'error'].map((level) => (
                        <button
                          key={level}
                          onClick={() => {
                            setLevelFilter(level);
                            setShowLevelFilter(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-800 transition-colors ${
                            levelFilter === level ? 'text-cyan-400' : 'text-gray-300'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setShowAgentFilter(!showAgentFilter)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:border-gray-700 transition-colors"
              >
                <HiOutlineCube className="text-lg" />
                <span className="truncate max-w-24">Agent: {agentFilter === 'all' ? 'All' : agentFilter.split(' ')[0]}</span>
                <HiOutlineChevronDown className={`transition-transform ${showAgentFilter ? 'rotate-180' : ''}`} />
              </button>
              {showAgentFilter && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowAgentFilter(false)} />
                  <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-20 py-1">
                    <button
                      onClick={() => {
                        setAgentFilter('all');
                        setShowAgentFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                        agentFilter === 'all' ? 'text-cyan-400' : 'text-gray-300'
                      }`}
                    >
                      All Agents
                    </button>
                    {agents.map((agent) => (
                      <button
                        key={agent}
                        onClick={() => {
                          setAgentFilter(agent);
                          setShowAgentFilter(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                          agentFilter === agent ? 'text-cyan-400' : 'text-gray-300'
                        }`}
                      >
                        {agent}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {/* Execution Logs Tab */}
      {activeTab === 'logs' && (
        <Reveal>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="divide-y divide-gray-800 font-mono text-sm">
              {filteredLogs.map((log) => {
                const LogIcon = levelStyles[log.level].icon;
                return (
                <div key={log.id} className="hover:bg-gray-800/50 transition-colors">
                  <div
                    className="flex items-start gap-3 p-3 cursor-pointer"
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                  >
                    <div className={`p-1.5 rounded ${levelStyles[log.level].bg}`}>
                      <LogIcon className={`text-base ${levelStyles[log.level].text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-gray-500">{log.timestamp}</span>
                        <span className={`px-1.5 py-0.5 text-xs rounded ${levelStyles[log.level].bg} ${levelStyles[log.level].text}`}>
                          {log.level.toUpperCase()}
                        </span>
                        <span className="text-cyan-400">[{log.agent}]</span>
                      </div>
                      <p className="text-gray-300 mt-1">{log.message}</p>
                    </div>
                    <HiOutlineChevronRight
                      className={`text-gray-500 transition-transform shrink-0 ${expandedLog === log.id ? 'rotate-90' : ''}`}
                    />
                  </div>
                  {expandedLog === log.id && (
                    <div className="px-12 pb-3">
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="text-gray-500 text-xs mb-2">Details:</p>
                        <pre className="text-gray-300 text-xs overflow-x-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
              })}
            </div>
          </div>
        </Reveal>
      )}

      {/* Tool Calls Tab */}
      {activeTab === 'tools' && (
        <Reveal>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Time</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Agent</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Tool / Action</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Duration</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Status</th>
                    <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {mockToolCalls.map((call) => (
                    <>
                      <tr
                        key={call.id}
                        className="hover:bg-gray-800/50 transition-colors cursor-pointer"
                        onClick={() => setExpandedTool(expandedTool === call.id ? null : call.id)}
                      >
                        <td className="px-4 py-3 text-gray-500">{call.timestamp.split(' ')[1]}</td>
                        <td className="px-4 py-3 text-cyan-400">{call.agent}</td>
                        <td className="px-4 py-3">
                          <span className="text-purple-400">{call.tool}</span>
                          <span className="text-gray-500">.</span>
                          <span className="text-white">{call.action}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{call.duration}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded ${
                            call.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {call.status === 'success' ? <HiOutlineCheckCircle /> : <HiOutlineExclamationCircle />}
                            {call.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <HiOutlineChevronRight
                            className={`text-gray-500 transition-transform inline-block ${expandedTool === call.id ? 'rotate-90' : ''}`}
                          />
                        </td>
                      </tr>
                      {expandedTool === call.id && (
                        <tr>
                          <td colSpan={6} className="px-4 py-3 bg-gray-800/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-gray-500 text-xs mb-2">Input:</p>
                                <pre className="p-2 bg-gray-800 rounded text-gray-300 text-xs overflow-x-auto">
                                  {JSON.stringify(call.input, null, 2)}
                                </pre>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs mb-2">Output:</p>
                                <pre className="p-2 bg-gray-800 rounded text-gray-300 text-xs overflow-x-auto">
                                  {JSON.stringify(call.output, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      )}

      {/* Errors & Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {unacknowledgedAlerts.length > 0 && (
            <Reveal>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <HiOutlineBell className="animate-pulse" />
                  Active Alerts ({unacknowledgedAlerts.length})
                </h3>
                <div className="space-y-3">
                  {unacknowledgedAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-start justify-between p-4 rounded-lg border ${severityStyles[alert.severity].bg} ${severityStyles[alert.severity].border}`}
                    >
                      <div className="flex items-start gap-3">
                        <HiOutlineExclamationCircle className={`text-xl flex-shrink-0 ${severityStyles[alert.severity].text}`} />
                        <div>
                          <h4 className="font-medium text-white">{alert.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                        </div>
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                        <HiOutlineX className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Alert History</h3>
              </div>
              <div className="divide-y divide-gray-800">
                {mockAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-4 p-4 ${alert.acknowledged ? 'opacity-60' : ''}`}
                  >
                    <div className={`p-2 rounded-lg ${severityStyles[alert.severity].bg}`}>
                      {alert.severity === 'critical' ? (
                        <HiOutlineExclamationCircle className={severityStyles[alert.severity].text} />
                      ) : alert.severity === 'warning' ? (
                        <HiOutlineExclamation className={severityStyles[alert.severity].text} />
                      ) : (
                        <HiOutlineInformationCircle className={severityStyles[alert.severity].text} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{alert.title}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded capitalize ${severityStyles[alert.severity].bg} ${severityStyles[alert.severity].text}`}>
                          {alert.severity}
                        </span>
                        {alert.acknowledged && (
                          <span className="text-xs text-gray-500">Acknowledged</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* Agent Reasoning Tab */}
      {activeTab === 'reasoning' && (
        <StaggerChildren staggerDelay={0.05}>
          <div className="space-y-4">
            {mockReasoningSummaries.map((summary) => (
              <div
                key={summary.id}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
                  onClick={() => setExpandedReasoning(expandedReasoning === summary.id ? null : summary.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-gray-700 flex items-center justify-center">
                      <HiOutlineLightningBolt className="text-2xl text-purple-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{summary.task}</h4>
                        <span className="px-2 py-0.5 text-xs bg-purple-500/10 text-purple-400 rounded">
                          {(summary.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        <span className="text-cyan-400">{summary.agent}</span> • {summary.timestamp}
                      </p>
                    </div>
                  </div>
                  <HiOutlineChevronRight
                    className={`text-gray-400 transition-transform ${expandedReasoning === summary.id ? 'rotate-90' : ''}`}
                  />
                </div>

                {expandedReasoning === summary.id && (
                  <div className="px-4 pb-4 border-t border-gray-800">
                    <div className="pt-4 space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-400 mb-3">Reasoning Chain</h5>
                        <div className="space-y-2">
                          {summary.reasoning.map((step, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-gray-800 text-cyan-400 flex items-center justify-center flex-shrink-0 text-xs font-mono">
                                {index + 1}
                              </div>
                              <p className="text-gray-300 text-sm">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                        <h5 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
                          <HiOutlineCheckCircle />
                          Decision
                        </h5>
                        <p className="text-gray-300">{summary.decision}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </StaggerChildren>
      )}
    </div>
  );
}
