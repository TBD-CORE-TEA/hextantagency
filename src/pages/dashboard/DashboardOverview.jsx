import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineLightningBolt,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineArrowRight,
  HiOutlinePlus,
  HiOutlineRefresh,
  HiOutlineDotsVertical
} from 'react-icons/hi';
import { Reveal, StaggerChildren } from '../../components/Animated';

// Mock data
const stats = [
  {
    name: 'Active Agents',
    value: '12',
    change: '+2',
    changeType: 'increase',
    icon: HiOutlineCube,
    color: 'cyan'
  },
  {
    name: 'Tasks Running',
    value: '47',
    change: '+12',
    changeType: 'increase',
    icon: HiOutlineClipboardList,
    color: 'purple'
  },
  {
    name: 'Success Rate',
    value: '98.5%',
    change: '+0.3%',
    changeType: 'increase',
    icon: HiOutlineLightningBolt,
    color: 'green'
  },
  {
    name: 'Monthly Cost',
    value: '$2,847',
    change: '-$123',
    changeType: 'decrease',
    icon: HiOutlineCurrencyDollar,
    color: 'orange'
  }
];

const recentAgents = [
  { id: 1, name: 'Customer Support Bot', status: 'active', tasks: 156, lastActive: '2 min ago' },
  { id: 2, name: 'Data Analyst Agent', status: 'active', tasks: 89, lastActive: '5 min ago' },
  { id: 3, name: 'Content Writer', status: 'paused', tasks: 234, lastActive: '1 hour ago' },
  { id: 4, name: 'Code Reviewer', status: 'active', tasks: 67, lastActive: '12 min ago' },
  { id: 5, name: 'Research Assistant', status: 'error', tasks: 45, lastActive: '3 hours ago' },
];

const recentTasks = [
  { id: 1, name: 'Process customer inquiries', agent: 'Customer Support Bot', status: 'running', progress: 67 },
  { id: 2, name: 'Generate weekly report', agent: 'Data Analyst Agent', status: 'completed', progress: 100 },
  { id: 3, name: 'Review PR #1234', agent: 'Code Reviewer', status: 'running', progress: 45 },
  { id: 4, name: 'Write blog post draft', agent: 'Content Writer', status: 'queued', progress: 0 },
  { id: 5, name: 'Market research analysis', agent: 'Research Assistant', status: 'failed', progress: 23 },
];

const activityFeed = [
  { id: 1, type: 'success', message: 'Customer Support Bot completed 50 tasks', time: '5 min ago' },
  { id: 2, type: 'info', message: 'New agent "Email Responder" created', time: '1 hour ago' },
  { id: 3, type: 'warning', message: 'Research Assistant approaching rate limit', time: '2 hours ago' },
  { id: 4, type: 'error', message: 'Code Reviewer failed task #4521', time: '3 hours ago' },
  { id: 5, type: 'success', message: 'Data Analyst Agent generated monthly report', time: '5 hours ago' },
];

const colorClasses = {
  cyan: 'from-cyan-500 to-cyan-600 text-cyan-400 bg-cyan-500/10',
  purple: 'from-purple-500 to-purple-600 text-purple-400 bg-purple-500/10',
  green: 'from-green-500 to-green-600 text-green-400 bg-green-500/10',
  orange: 'from-orange-500 to-orange-600 text-orange-400 bg-orange-500/10',
};

const statusColors = {
  active: 'bg-green-500',
  paused: 'bg-yellow-500',
  error: 'bg-red-500',
  running: 'text-cyan-400',
  completed: 'text-green-400',
  queued: 'text-gray-400',
  failed: 'text-red-400',
};

export default function DashboardOverview() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome back, David!</h2>
            <p className="text-gray-400 mt-1">Here's what's happening with your agents today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              <HiOutlineRefresh className={`text-lg ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              to="/dashboard/agents/new"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/25"
            >
              <HiOutlinePlus className="text-lg" />
              <span>New Agent</span>
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Stats Grid */}
      <StaggerChildren staggerDelay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-sm ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.changeType === 'increase' ? (
                      <HiOutlineTrendingUp className="text-lg" />
                    ) : (
                      <HiOutlineTrendingDown className="text-lg" />
                    )}
                    <span>{stat.change}</span>
                    <span className="text-gray-500">vs last week</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color].split(' ').slice(2).join(' ')}`}>
                  <stat.icon className={`text-2xl ${colorClasses[stat.color].split(' ')[2]}`} />
                </div>
              </div>
              {/* Gradient accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses[stat.color].split(' ').slice(0, 2).join(' ')} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          ))}
        </div>
      </StaggerChildren>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Agents */}
        <Reveal className="lg:col-span-2">
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Recent Agents</h3>
              <Link
                to="/dashboard/agents"
                className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View all
                <HiOutlineArrowRight className="text-sm" />
              </Link>
            </div>
            <div className="divide-y divide-gray-800">
              {recentAgents.map((agent) => (
                <Link
                  key={agent.id}
                  to={`/dashboard/agents/${agent.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-gray-700 flex items-center justify-center">
                      <HiOutlineCube className="text-xl text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{agent.name}</p>
                      <p className="text-sm text-gray-400">{agent.tasks} tasks completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 hidden sm:block">{agent.lastActive}</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusColors[agent.status]}`} />
                      <span className={`text-sm capitalize ${agent.status === 'error' ? 'text-red-400' : agent.status === 'paused' ? 'text-yellow-400' : 'text-green-400'}`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Activity Feed */}
        <Reveal>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Activity Feed</h3>
              <button className="text-gray-400 hover:text-white transition-colors">
                <HiOutlineDotsVertical className="text-lg" />
              </button>
            </div>
            <div className="divide-y divide-gray-800 max-h-[400px] overflow-y-auto">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500/10 text-green-400' :
                      activity.type === 'error' ? 'bg-red-500/10 text-red-400' :
                      activity.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-cyan-500/10 text-cyan-400'
                    }`}>
                      {activity.type === 'success' ? <HiOutlineCheckCircle className="text-lg" /> :
                       activity.type === 'error' ? <HiOutlineExclamationCircle className="text-lg" /> :
                       activity.type === 'warning' ? <HiOutlineExclamationCircle className="text-lg" /> :
                       <HiOutlineLightningBolt className="text-lg" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Recent Tasks */}
      <Reveal>
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white">Recent Tasks</h3>
            <Link
              to="/dashboard/tasks"
              className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View all
              <HiOutlineArrowRight className="text-sm" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Task</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Agent</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-white">{task.name}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-sm text-gray-400">{task.agent}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-sm capitalize ${statusColors[task.status]}`}>
                        {task.status === 'running' && <HiOutlineClock className="animate-pulse" />}
                        {task.status === 'completed' && <HiOutlineCheckCircle />}
                        {task.status === 'failed' && <HiOutlineExclamationCircle />}
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-800 rounded-full h-2 max-w-24">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              task.status === 'failed' ? 'bg-red-500' :
                              task.status === 'completed' ? 'bg-green-500' :
                              'bg-cyan-500'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400 w-10">{task.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Quick Actions */}
      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Create New Agent', description: 'Build a new AI agent', icon: HiOutlinePlus, to: '/dashboard/agents/new', color: 'cyan' },
            { title: 'Run New Task', description: 'Execute a custom task', icon: HiOutlineLightningBolt, to: '/dashboard/tasks/new', color: 'purple' },
            { title: 'View Logs', description: 'Check execution logs', icon: HiOutlineClipboardList, to: '/dashboard/monitoring', color: 'green' },
            { title: 'Manage Billing', description: 'View usage & invoices', icon: HiOutlineCurrencyDollar, to: '/dashboard/billing', color: 'orange' },
          ].map((action) => (
            <Link
              key={action.title}
              to={action.to}
              className="group p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-all"
            >
              <div className={`w-10 h-10 rounded-lg ${colorClasses[action.color].split(' ').slice(2).join(' ')} flex items-center justify-center mb-3`}>
                <action.icon className={`text-xl ${colorClasses[action.color].split(' ')[2]}`} />
              </div>
              <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">{action.title}</h4>
              <p className="text-sm text-gray-400 mt-1">{action.description}</p>
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
