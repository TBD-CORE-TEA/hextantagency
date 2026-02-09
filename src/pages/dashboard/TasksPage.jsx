import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineClipboardList,
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineRefresh,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineDotsVertical,
  HiOutlineLightningBolt,
  HiOutlineCube,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineCalendar,
  HiOutlineArrowRight
} from 'react-icons/hi';
import { Reveal, StaggerChildren } from '../../components/Animated';

// Mock data
const mockTasks = [
  {
    id: 1,
    name: 'Process customer inquiries batch',
    description: 'Handle all pending customer support tickets from the last 24 hours',
    agent: 'Customer Support Bot',
    agentId: 1,
    status: 'running',
    progress: 67,
    priority: 'high',
    createdAt: '2026-02-09 10:30',
    startedAt: '2026-02-09 10:31',
    estimatedCompletion: '15 min',
    steps: 12,
    completedSteps: 8,
  },
  {
    id: 2,
    name: 'Generate weekly analytics report',
    description: 'Compile and analyze data from all connected sources',
    agent: 'Data Analyst Agent',
    agentId: 2,
    status: 'running',
    progress: 45,
    priority: 'medium',
    createdAt: '2026-02-09 09:00',
    startedAt: '2026-02-09 09:05',
    estimatedCompletion: '30 min',
    steps: 8,
    completedSteps: 4,
  },
  {
    id: 3,
    name: 'Review PR #1234 - Feature update',
    description: 'Review code changes and provide feedback',
    agent: 'Code Reviewer',
    agentId: 4,
    status: 'queued',
    progress: 0,
    priority: 'medium',
    createdAt: '2026-02-09 11:00',
    startedAt: null,
    estimatedCompletion: '10 min',
    steps: 5,
    completedSteps: 0,
  },
  {
    id: 4,
    name: 'Write blog post: AI in 2026',
    description: 'Create a comprehensive blog post about AI trends',
    agent: 'Content Writer',
    agentId: 3,
    status: 'completed',
    progress: 100,
    priority: 'low',
    createdAt: '2026-02-08 14:00',
    startedAt: '2026-02-08 14:05',
    completedAt: '2026-02-08 14:47',
    estimatedCompletion: 'Completed',
    steps: 6,
    completedSteps: 6,
  },
  {
    id: 5,
    name: 'Market research: Competitor analysis',
    description: 'Analyze top 5 competitors and their offerings',
    agent: 'Research Assistant',
    agentId: 5,
    status: 'failed',
    progress: 34,
    priority: 'high',
    createdAt: '2026-02-08 16:00',
    startedAt: '2026-02-08 16:02',
    failedAt: '2026-02-08 16:28',
    error: 'Rate limit exceeded on external API',
    steps: 10,
    completedSteps: 3,
  },
  {
    id: 6,
    name: 'Send newsletter to subscribers',
    description: 'Distribute the weekly newsletter to all active subscribers',
    agent: 'Email Responder',
    agentId: 6,
    status: 'completed',
    progress: 100,
    priority: 'medium',
    createdAt: '2026-02-08 08:00',
    startedAt: '2026-02-08 08:01',
    completedAt: '2026-02-08 08:15',
    estimatedCompletion: 'Completed',
    steps: 4,
    completedSteps: 4,
  },
];

const mockWorkflows = [
  {
    id: 1,
    name: 'Customer Onboarding',
    description: 'Complete customer onboarding sequence',
    agents: ['Email Responder', 'Customer Support Bot'],
    status: 'active',
    runsToday: 23,
    successRate: 98.5,
    lastRun: '5 min ago',
  },
  {
    id: 2,
    name: 'Weekly Report Generation',
    description: 'Compile and send weekly performance reports',
    agents: ['Data Analyst Agent', 'Email Responder'],
    status: 'scheduled',
    runsToday: 1,
    successRate: 100,
    lastRun: '1 week ago',
  },
  {
    id: 3,
    name: 'Code Review Pipeline',
    description: 'Automated code review and feedback',
    agents: ['Code Reviewer'],
    status: 'active',
    runsToday: 12,
    successRate: 96.2,
    lastRun: '2 hours ago',
  },
];

const statusStyles = {
  running: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', icon: HiOutlineClock },
  queued: { bg: 'bg-gray-500/10', text: 'text-gray-400', icon: HiOutlineClock },
  completed: { bg: 'bg-green-500/10', text: 'text-green-400', icon: HiOutlineCheckCircle },
  failed: { bg: 'bg-red-500/10', text: 'text-red-400', icon: HiOutlineExclamationCircle },
  paused: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', icon: HiOutlinePause },
};

const priorityStyles = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [expandedTask, setExpandedTask] = useState(null);

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.agent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const queuedTasks = mockTasks.filter(t => t.status === 'queued');
  const runningTasks = mockTasks.filter(t => t.status === 'running');
  const completedTasks = mockTasks.filter(t => t.status === 'completed');
  const failedTasks = mockTasks.filter(t => t.status === 'failed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Tasks & Workflows</h2>
            <p className="text-gray-400 mt-1">Manage task execution and automated workflows</p>
          </div>
          <Link
            to="/dashboard/tasks/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/25 font-medium"
          >
            <HiOutlinePlus className="text-lg" />
            Create Task
          </Link>
        </div>
      </Reveal>

      {/* Stats Cards */}
      <StaggerChildren staggerDelay={0.05}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Queued', count: queuedTasks.length, color: 'gray', icon: HiOutlineClock },
            { label: 'Running', count: runningTasks.length, color: 'cyan', icon: HiOutlineLightningBolt },
            { label: 'Completed', count: completedTasks.length, color: 'green', icon: HiOutlineCheckCircle },
            { label: 'Failed', count: failedTasks.length, color: 'red', icon: HiOutlineExclamationCircle },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => setStatusFilter(statusFilter === stat.label.toLowerCase() ? 'all' : stat.label.toLowerCase())}
              className={`p-4 bg-gray-900 border rounded-xl text-left transition-all ${
                statusFilter === stat.label.toLowerCase()
                  ? 'border-cyan-500'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <stat.icon className={`text-lg text-${stat.color}-400`} />
              </div>
              <p className={`text-2xl font-bold text-${stat.color === 'gray' ? 'white' : stat.color + '-400'}`}>
                {stat.count}
              </p>
            </button>
          ))}
        </div>
      </StaggerChildren>

      {/* Tabs */}
      <Reveal>
        <div className="flex items-center gap-1 p-1 bg-gray-900 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'tasks'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('workflows')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'workflows'
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Workflows
          </button>
        </div>
      </Reveal>

      {activeTab === 'tasks' && (
        <>
          {/* Filters */}
          <Reveal>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:border-gray-700 transition-colors"
                >
                  <HiOutlineFilter className="text-lg" />
                  <span>Status: {statusFilter === 'all' ? 'All' : statusFilter}</span>
                  <HiOutlineChevronDown className={`transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
                </button>
                {showFilterMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowFilterMenu(false)} />
                    <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-20 py-1">
                      {['all', 'running', 'queued', 'completed', 'failed'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setStatusFilter(status);
                            setShowFilterMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-800 transition-colors ${
                            statusFilter === status ? 'text-cyan-400' : 'text-gray-300'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <HiOutlineViewList className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode('board')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'board' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <HiOutlineViewGrid className="text-lg" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Task List */}
          {viewMode === 'list' ? (
            <Reveal>
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="divide-y divide-gray-800">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="hover:bg-gray-800/50 transition-colors">
                      <div
                        className="flex items-center gap-4 p-4 cursor-pointer"
                        onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                      >
                        {/* Status Icon */}
                        <div className={`p-2 rounded-lg ${statusStyles[task.status].bg}`}>
                          {(() => {
                            const IconComponent = statusStyles[task.status].icon;
                            return task.status === 'running' ? (
                              <HiOutlineClock className={`text-xl ${statusStyles[task.status].text} animate-pulse`} />
                            ) : (
                              <IconComponent className={`text-xl ${statusStyles[task.status].text}`} />
                            );
                          })()}
                        </div>

                        {/* Task Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-white truncate">{task.name}</h4>
                            <span className={`px-2 py-0.5 text-xs rounded border ${priorityStyles[task.priority]}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <HiOutlineCube className="text-sm" />
                              {task.agent}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{task.createdAt}</span>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="hidden md:block w-32">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-800 rounded-full">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  task.status === 'failed' ? 'bg-red-500' :
                                  task.status === 'completed' ? 'bg-green-500' :
                                  'bg-cyan-500'
                                }`}
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400 w-10 text-right">{task.progress}%</span>
                          </div>
                        </div>

                        {/* Time */}
                        <div className="hidden lg:block text-right text-sm">
                          <p className="text-gray-400">{task.estimatedCompletion}</p>
                          <p className="text-gray-500 text-xs">{task.completedSteps}/{task.steps} steps</p>
                        </div>

                        {/* Expand Icon */}
                        <HiOutlineChevronRight
                          className={`text-gray-400 transition-transform ${expandedTask === task.id ? 'rotate-90' : ''}`}
                        />
                      </div>

                      {/* Expanded Details */}
                      {expandedTask === task.id && (
                        <div className="px-4 pb-4 border-t border-gray-800">
                          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Description</p>
                              <p className="text-gray-300">{task.description}</p>
                              {task.error && (
                                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                  <p className="text-sm text-red-400">
                                    <strong>Error:</strong> {task.error}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Started:</span>
                                <span className="text-gray-300">{task.startedAt || 'Not started'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Steps:</span>
                                <span className="text-gray-300">{task.completedSteps} of {task.steps}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Priority:</span>
                                <span className={priorityStyles[task.priority].split(' ')[1]}>{task.priority}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800">
                            {task.status === 'running' && (
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 rounded-lg text-sm transition-colors">
                                <HiOutlinePause /> Pause
                              </button>
                            )}
                            {task.status === 'queued' && (
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm transition-colors">
                                <HiOutlinePlay /> Start Now
                              </button>
                            )}
                            {task.status === 'failed' && (
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 rounded-lg text-sm transition-colors">
                                <HiOutlineRefresh /> Retry
                              </button>
                            )}
                            <Link
                              to={`/dashboard/agents/${task.agentId}`}
                              className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                            >
                              <HiOutlineEye /> View Agent
                            </Link>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm transition-colors ml-auto">
                              <HiOutlineClipboardList /> View Logs
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-colors">
                              <HiOutlineTrash /> Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : (
            /* Board View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['queued', 'running', 'completed', 'failed'].map((status) => (
                <div key={status} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                  <div className={`px-4 py-3 border-b border-gray-800 ${statusStyles[status].bg}`}>
                    <h3 className={`font-medium capitalize ${statusStyles[status].text}`}>{status}</h3>
                  </div>
                  <div className="p-2 space-y-2 max-h-96 overflow-y-auto">
                    {filteredTasks.filter(t => t.status === status).map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg border border-gray-700 transition-colors cursor-pointer"
                      >
                        <h4 className="text-sm font-medium text-white mb-2 line-clamp-2">{task.name}</h4>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">{task.agent}</span>
                          <span className={priorityStyles[task.priority].split(' ')[1]}>{task.priority}</span>
                        </div>
                        {status === 'running' && (
                          <div className="mt-2 h-1.5 bg-gray-700 rounded-full">
                            <div className="h-1.5 bg-cyan-500 rounded-full animate-pulse" style={{ width: `${task.progress}%` }} />
                          </div>
                        )}
                      </div>
                    ))}
                    {filteredTasks.filter(t => t.status === status).length === 0 && (
                      <p className="text-center text-gray-500 text-sm py-4">No tasks</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'workflows' && (
        <StaggerChildren staggerDelay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-gray-700 flex items-center justify-center">
                      <HiOutlineLightningBolt className="text-2xl text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {workflow.name}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        workflow.status === 'active'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                    <HiOutlineDotsVertical className="text-lg" />
                  </button>
                </div>

                <p className="text-sm text-gray-400 mb-4">{workflow.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {workflow.agents.map((agent) => (
                    <span key={agent} className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded-md">
                      {agent}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                  <div>
                    <p className="text-xs text-gray-500">Runs Today</p>
                    <p className="text-sm font-semibold text-white">{workflow.runsToday}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Success</p>
                    <p className="text-sm font-semibold text-green-400">{workflow.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Run</p>
                    <p className="text-sm font-semibold text-gray-400">{workflow.lastRun}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Workflow Card */}
            <Link
              to="/dashboard/workflows/new"
              className="flex flex-col items-center justify-center p-8 bg-gray-900/50 border-2 border-dashed border-gray-800 rounded-xl hover:border-cyan-500/50 hover:bg-gray-900 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-800 group-hover:bg-cyan-500/10 flex items-center justify-center mb-3 transition-colors">
                <HiOutlinePlus className="text-2xl text-gray-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="font-medium text-gray-400 group-hover:text-white transition-colors">Create Workflow</p>
              <p className="text-sm text-gray-500">Automate multi-agent tasks</p>
            </Link>
          </div>
        </StaggerChildren>
      )}

      {/* Empty State */}
      {filteredTasks.length === 0 && activeTab === 'tasks' && (
        <Reveal>
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <HiOutlineClipboardList className="text-3xl text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No tasks found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || statusFilter !== 'all'
                ? "Try adjusting your search or filters"
                : "Create your first task to get started"}
            </p>
            <Link
              to="/dashboard/tasks/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium"
            >
              <HiOutlinePlus className="text-lg" />
              Create Task
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
