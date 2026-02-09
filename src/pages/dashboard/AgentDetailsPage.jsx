import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  HiOutlineArrowLeft,
  HiOutlineCube,
  HiOutlinePencil,
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineStop,
  HiOutlineTrash,
  HiOutlineDuplicate,
  HiOutlineClock,
  HiOutlineChip,
  HiOutlineLightningBolt,
  HiOutlineKey,
  HiOutlineDatabase,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineDotsVertical,
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineAdjustments,
  HiOutlineCode,
  HiOutlineCog,
  HiOutlineClipboardList
} from 'react-icons/hi';
import { Reveal, StaggerChildren } from '../../components/Animated';

// Mock agent data
const mockAgent = {
  id: 1,
  name: 'Customer Support Bot',
  description: 'Handles customer inquiries and support tickets automatically with intelligent routing and personalized responses.',
  status: 'active',
  model: 'GPT-4 Turbo',
  tasksCompleted: 1547,
  tasksRunning: 3,
  tasksFailed: 12,
  successRate: 98.5,
  avgResponseTime: '1.2s',
  lastActive: '2 min ago',
  createdAt: '2025-12-15',
  version: 'v2.3.1',
  previousVersions: ['v2.3.0', 'v2.2.1', 'v2.2.0', 'v2.1.0', 'v2.0.0', 'v1.5.2'],
  color: 'cyan',
  goals: [
    'Respond to customer inquiries within 30 seconds',
    'Achieve 95%+ customer satisfaction rating',
    'Escalate complex issues to human agents appropriately',
    'Maintain consistent brand voice and tone'
  ],
  constraints: [
    'Never share customer personal information',
    'Do not make promises about refunds or compensation',
    'Always verify customer identity before account changes',
    'Limit response length to 500 characters for initial replies'
  ],
  tools: [
    { name: 'Email Integration', enabled: true, description: 'Send and receive emails' },
    { name: 'Slack Notifications', enabled: true, description: 'Post updates to Slack channels' },
    { name: 'Zendesk API', enabled: true, description: 'Create and update support tickets' },
    { name: 'Customer Database', enabled: true, description: 'Read customer records' },
    { name: 'Knowledge Base', enabled: true, description: 'Search help articles' },
    { name: 'Payment Gateway', enabled: false, description: 'Process refunds and payments' },
  ],
  memory: {
    shortTerm: '2048 tokens',
    longTerm: 'Enabled',
    contextWindow: '128k tokens',
    vectorStorage: '1.2GB used'
  },
  executionHistory: [
    { id: 1, task: 'Process refund inquiry #4521', status: 'completed', duration: '1.8s', time: '5 min ago' },
    { id: 2, task: 'Answer product question #4520', status: 'completed', duration: '0.9s', time: '8 min ago' },
    { id: 3, task: 'Escalate complaint #4519', status: 'completed', duration: '2.1s', time: '12 min ago' },
    { id: 4, task: 'Update ticket status #4518', status: 'completed', duration: '0.4s', time: '15 min ago' },
    { id: 5, task: 'Send follow-up email #4517', status: 'failed', duration: '3.2s', time: '20 min ago' },
    { id: 6, task: 'Categorize support ticket #4516', status: 'completed', duration: '0.6s', time: '25 min ago' },
    { id: 7, task: 'Answer billing question #4515', status: 'completed', duration: '1.4s', time: '30 min ago' },
    { id: 8, task: 'Process password reset #4514', status: 'completed', duration: '2.0s', time: '35 min ago' },
  ]
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: HiOutlineCube },
  { id: 'goals', label: 'Goals & Constraints', icon: HiOutlineAdjustments },
  { id: 'tools', label: 'Tool Permissions', icon: HiOutlineKey },
  { id: 'memory', label: 'Memory Settings', icon: HiOutlineDatabase },
  { id: 'history', label: 'Execution History', icon: HiOutlineClipboardList },
];

const statusStyles = {
  active: { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500', label: 'Active' },
  paused: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', dot: 'bg-yellow-500', label: 'Paused' },
  error: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-500', label: 'Error' },
};

export default function AgentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const agent = mockAgent; // In real app, fetch by id

  const handlePauseResume = () => {
    console.log(agent.status === 'active' ? 'Pausing agent' : 'Resuming agent');
  };

  const handleKill = () => {
    console.log('Killing agent');
  };

  const handleDelete = () => {
    console.log('Deleting agent');
    setShowDeleteModal(false);
    navigate('/dashboard/agents');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Reveal>
        <Link
          to="/dashboard/agents"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <HiOutlineArrowLeft className="text-lg" />
          Back to Agents
        </Link>
      </Reveal>

      {/* Header */}
      <Reveal>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-gray-700 flex items-center justify-center flex-shrink-0">
                <HiOutlineCube className="text-3xl text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full ${statusStyles[agent.status].bg} ${statusStyles[agent.status].text}`}>
                    <span className={`w-2 h-2 rounded-full ${statusStyles[agent.status].dot} animate-pulse`} />
                    {statusStyles[agent.status].label}
                  </span>
                </div>
                <p className="text-gray-400 mb-3 max-w-2xl">{agent.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <HiOutlineChip className="text-lg" />
                    {agent.model}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <HiOutlineClock className="text-lg" />
                    Last active: {agent.lastActive}
                  </div>
                  <button
                    onClick={() => setShowVersionHistory(!showVersionHistory)}
                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <HiOutlineCode className="text-lg" />
                    {agent.version}
                    <HiOutlineChevronRight className={`transition-transform ${showVersionHistory ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {/* Version History Dropdown */}
                {showVersionHistory && (
                  <div className="mt-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Version History</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20">
                        {agent.version} (current)
                      </span>
                      {agent.previousVersions.map((v) => (
                        <button
                          key={v}
                          className="px-2 py-1 text-xs bg-gray-700 text-gray-400 rounded hover:bg-gray-600 hover:text-white transition-colors"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => navigate(`/dashboard/agents/${id}/edit`)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              >
                <HiOutlinePencil className="text-lg" />
                Edit
              </button>
              <button
                onClick={handlePauseResume}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  agent.status === 'active'
                    ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                    : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                }`}
              >
                {agent.status === 'active' ? (
                  <>
                    <HiOutlinePause className="text-lg" />
                    Pause
                  </>
                ) : (
                  <>
                    <HiOutlinePlay className="text-lg" />
                    Resume
                  </>
                )}
              </button>
              <button
                onClick={handleKill}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <HiOutlineStop className="text-lg" />
                Kill
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <HiOutlineTrash className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Stats Row */}
      <StaggerChildren staggerDelay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Tasks Completed', value: agent.tasksCompleted.toLocaleString(), color: 'text-white' },
            { label: 'Tasks Running', value: agent.tasksRunning, color: 'text-cyan-400' },
            { label: 'Success Rate', value: `${agent.successRate}%`, color: 'text-green-400' },
            { label: 'Avg Response', value: agent.avgResponseTime, color: 'text-purple-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
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
              </button>
            ))}
          </nav>
        </div>
      </Reveal>

      {/* Tab Content */}
      <Reveal key={activeTab}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Stats */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-green-400">{agent.successRate}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: `${agent.successRate}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Tasks Today</span>
                    <span className="text-white">47 / 100</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div className="h-2 bg-cyan-500 rounded-full" style={{ width: '47%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Token Usage</span>
                    <span className="text-white">68,420 / 100,000</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div className="h-2 bg-purple-500 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {agent.executionHistory.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    {item.status === 'completed' ? (
                      <HiOutlineCheckCircle className="text-lg text-green-400 flex-shrink-0" />
                    ) : (
                      <HiOutlineExclamationCircle className="text-lg text-red-400 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{item.task}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                    <span className="text-xs text-gray-400">{item.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Goals & Constraints Tab */}
        {activeTab === 'goals' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Goals</h3>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm">Edit</button>
              </div>
              <ul className="space-y-3">
                {agent.goals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm">{goal}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Constraints</h3>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm">Edit</button>
              </div>
              <ul className="space-y-3">
                {agent.constraints.map((constraint, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <HiOutlineShieldCheck className="text-lg text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm">{constraint}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tool Permissions Tab */}
        {activeTab === 'tools' && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Tool Permissions</h3>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm">Manage Tools</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agent.tools.map((tool) => (
                <div
                  key={tool.name}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    tool.enabled
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-gray-800/20 border-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tool.enabled ? 'bg-cyan-500/10' : 'bg-gray-800'
                    }`}>
                      <HiOutlineKey className={`text-xl ${tool.enabled ? 'text-cyan-400' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${tool.enabled ? 'text-white' : 'text-gray-500'}`}>{tool.name}</p>
                      <p className="text-xs text-gray-500">{tool.description}</p>
                    </div>
                  </div>
                  <button
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      tool.enabled ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        tool.enabled ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Memory Settings Tab */}
        {activeTab === 'memory' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Memory Configuration</h3>
              <div className="space-y-4">
                {Object.entries(agent.memory).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <HiOutlineDatabase className="text-lg text-purple-400" />
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Storage Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Vector Storage</span>
                    <span className="text-white">1.2 GB / 5 GB</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full">
                    <div className="h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" style={{ width: '24%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Conversation History</span>
                    <span className="text-white">342 MB / 1 GB</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full">
                    <div className="h-3 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full" style={{ width: '34%' }} />
                  </div>
                </div>
              </div>
              <button className="mt-4 w-full py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors text-sm">
                Clear Memory Cache
              </button>
            </div>
          </div>
        )}

        {/* Execution History Tab */}
        {activeTab === 'history' && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Execution History</h3>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <HiOutlineRefresh className="text-lg" />
                Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Task</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Duration</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {agent.executionHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm text-white">{item.task}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                          item.status === 'completed'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          {item.status === 'completed' ? (
                            <HiOutlineCheckCircle className="text-sm" />
                          ) : (
                            <HiOutlineExclamationCircle className="text-sm" />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-400">{item.duration}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-500">{item.time}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Reveal>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-2">Delete Agent</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete "{agent.name}"? This action cannot be undone and all execution history will be lost.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
