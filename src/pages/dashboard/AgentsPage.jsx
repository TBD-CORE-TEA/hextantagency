import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineCube,
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineDotsVertical,
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineDuplicate,
  HiOutlineEye,
  HiOutlineClock,
  HiOutlineChip,
  HiOutlineLightningBolt,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineChevronDown
} from 'react-icons/hi';
import { Reveal, StaggerChildren } from '../../components/Animated';

// Mock agents data
const mockAgents = [
  {
    id: 1,
    name: 'Customer Support Bot',
    description: 'Handles customer inquiries and support tickets automatically',
    status: 'active',
    model: 'GPT-4 Turbo',
    tasksCompleted: 1547,
    successRate: 98.5,
    avgResponseTime: '1.2s',
    lastActive: '2 min ago',
    createdAt: '2025-12-15',
    version: 'v2.3.1',
    tools: ['Email', 'Slack', 'Zendesk'],
    color: 'cyan'
  },
  {
    id: 2,
    name: 'Data Analyst Agent',
    description: 'Analyzes data patterns and generates insights reports',
    status: 'active',
    model: 'GPT-4',
    tasksCompleted: 892,
    successRate: 99.1,
    avgResponseTime: '3.5s',
    lastActive: '5 min ago',
    createdAt: '2025-11-20',
    version: 'v1.8.0',
    tools: ['SQL', 'Python', 'Tableau'],
    color: 'purple'
  },
  {
    id: 3,
    name: 'Content Writer',
    description: 'Creates blog posts, social media content, and marketing copy',
    status: 'paused',
    model: 'Claude 3',
    tasksCompleted: 2341,
    successRate: 97.2,
    avgResponseTime: '8.2s',
    lastActive: '1 hour ago',
    createdAt: '2025-10-05',
    version: 'v3.1.2',
    tools: ['WordPress', 'Buffer', 'Grammarly'],
    color: 'green'
  },
  {
    id: 4,
    name: 'Code Reviewer',
    description: 'Reviews pull requests and suggests code improvements',
    status: 'active',
    model: 'GPT-4 Turbo',
    tasksCompleted: 673,
    successRate: 96.8,
    avgResponseTime: '4.1s',
    lastActive: '12 min ago',
    createdAt: '2026-01-08',
    version: 'v1.2.0',
    tools: ['GitHub', 'GitLab', 'Jira'],
    color: 'orange'
  },
  {
    id: 5,
    name: 'Research Assistant',
    description: 'Conducts market research and competitive analysis',
    status: 'error',
    model: 'GPT-4',
    tasksCompleted: 456,
    successRate: 94.5,
    avgResponseTime: '12.3s',
    lastActive: '3 hours ago',
    createdAt: '2026-01-22',
    version: 'v1.0.3',
    tools: ['Web Search', 'PDF Parser', 'Notion'],
    color: 'red'
  },
  {
    id: 6,
    name: 'Email Responder',
    description: 'Drafts and sends email responses based on templates',
    status: 'active',
    model: 'GPT-3.5 Turbo',
    tasksCompleted: 3210,
    successRate: 99.4,
    avgResponseTime: '0.8s',
    lastActive: '1 min ago',
    createdAt: '2025-09-18',
    version: 'v2.0.0',
    tools: ['Gmail', 'Outlook', 'SendGrid'],
    color: 'cyan'
  },
];

const statusStyles = {
  active: { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500' },
  paused: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', dot: 'bg-yellow-500' },
  error: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-500' },
};

const colorAccents = {
  cyan: 'from-cyan-500 to-cyan-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
};

export default function AgentsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAgentAction = (action, agentId) => {
    console.log(`${action} agent ${agentId}`);
    setOpenDropdown(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Agents</h2>
            <p className="text-gray-400 mt-1">Manage and monitor your AI agents</p>
          </div>
          <Link
            to="/dashboard/agents/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/25 font-medium"
          >
            <HiOutlinePlus className="text-lg" />
            Create Agent
          </Link>
        </div>
      </Reveal>

      {/* Filters and Search */}
      <Reveal>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Filter */}
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
                  {['all', 'active', 'paused', 'error'].map((status) => (
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

          {/* View Toggle */}
          <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <HiOutlineViewGrid className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <HiOutlineViewList className="text-lg" />
            </button>
          </div>
        </div>
      </Reveal>

      {/* Agents Grid/List */}
      {viewMode === 'grid' ? (
        <StaggerChildren staggerDelay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all"
              >
                {/* Color accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorAccents[agent.color]}`} />

                {/* Card content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
                        <HiOutlineCube className="text-2xl text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {agent.name}
                        </h3>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[agent.status].bg} ${statusStyles[agent.status].text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[agent.status].dot}`} />
                          {agent.status}
                        </span>
                      </div>
                    </div>

                    {/* Actions dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === agent.id ? null : agent.id)}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <HiOutlineDotsVertical className="text-lg" />
                      </button>
                      {openDropdown === agent.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                          <div className="absolute right-0 mt-1 w-44 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 py-1">
                            <Link
                              to={`/dashboard/agents/${agent.id}`}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                            >
                              <HiOutlineEye className="text-lg" />
                              View Details
                            </Link>
                            <button
                              onClick={() => handleAgentAction('edit', agent.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                            >
                              <HiOutlinePencil className="text-lg" />
                              Edit Agent
                            </button>
                            <button
                              onClick={() => handleAgentAction('duplicate', agent.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                            >
                              <HiOutlineDuplicate className="text-lg" />
                              Duplicate
                            </button>
                            <hr className="my-1 border-gray-700" />
                            {agent.status === 'active' ? (
                              <button
                                onClick={() => handleAgentAction('pause', agent.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-400 hover:bg-gray-700 transition-colors"
                              >
                                <HiOutlinePause className="text-lg" />
                                Pause Agent
                              </button>
                            ) : (
                              <button
                                onClick={() => handleAgentAction('resume', agent.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-400 hover:bg-gray-700 transition-colors"
                              >
                                <HiOutlinePlay className="text-lg" />
                                Resume Agent
                              </button>
                            )}
                            <button
                              onClick={() => handleAgentAction('delete', agent.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                            >
                              <HiOutlineTrash className="text-lg" />
                              Delete Agent
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{agent.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Tasks</p>
                      <p className="text-sm font-semibold text-white">{agent.tasksCompleted.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Success</p>
                      <p className="text-sm font-semibold text-green-400">{agent.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Avg Time</p>
                      <p className="text-sm font-semibold text-white">{agent.avgResponseTime}</p>
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {agent.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded-md"
                      >
                        {tool}
                      </span>
                    ))}
                    {agent.tools.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-gray-800 text-gray-500 rounded-md">
                        +{agent.tools.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <HiOutlineChip className="text-sm" />
                      {agent.model}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <HiOutlineClock className="text-sm" />
                      {agent.lastActive}
                    </div>
                  </div>
                </div>

                {/* Hover overlay link */}
                <Link
                  to={`/dashboard/agents/${agent.id}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View ${agent.name}`}
                />
              </div>
            ))}
          </div>
        </StaggerChildren>
      ) : (
        /* List View */
        <Reveal>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Agent</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Model</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Tasks</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Success Rate</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Last Active</th>
                    <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredAgents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-4">
                        <Link to={`/dashboard/agents/${agent.id}`} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
                            <HiOutlineCube className="text-xl text-cyan-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white hover:text-cyan-400 transition-colors">{agent.name}</p>
                            <p className="text-xs text-gray-500">{agent.version}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-sm text-gray-400">{agent.model}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[agent.status].bg} ${statusStyles[agent.status].text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[agent.status].dot}`} />
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="text-sm text-white">{agent.tasksCompleted.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-sm text-green-400">{agent.successRate}%</span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-sm text-gray-400">{agent.lastActive}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/dashboard/agents/${agent.id}`}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            <HiOutlineEye className="text-lg" />
                          </Link>
                          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                            <HiOutlinePencil className="text-lg" />
                          </button>
                          {agent.status === 'active' ? (
                            <button className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-colors">
                              <HiOutlinePause className="text-lg" />
                            </button>
                          ) : (
                            <button className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-gray-800 rounded-lg transition-colors">
                              <HiOutlinePlay className="text-lg" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      )}

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <Reveal>
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <HiOutlineCube className="text-3xl text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No agents found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || statusFilter !== 'all'
                ? "Try adjusting your search or filters"
                : "Get started by creating your first agent"}
            </p>
            <Link
              to="/dashboard/agents/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium"
            >
              <HiOutlinePlus className="text-lg" />
              Create Agent
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
