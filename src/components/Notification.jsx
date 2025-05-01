import { useState } from 'react';
import { Bell, ChevronDown, ChevronUp, Search, AlertCircle, Battery, Shield, CheckCircle, FileText, X, Mail, Smartphone, Clock, Filter } from 'lucide-react';

export default function NotificationDashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  const notifications = [
    {
      id: 1,
      title: 'Robot R-24 Malfunction',
      description: 'Robot R-24 has reported a motor failure and stopped in Zone B-7. Immediate maintenance required.',
      time: '2 minutes ago',
      type: 'Critical',
      icon: <AlertCircle className="text-red-500" size={24} />,
      actions: ['View Details', 'Escalate'],
      actionStyles: ['bg-slate-700 text-white', 'bg-red-700 text-white']
    },
    {
      id: 2,
      title: 'Low Battery Alert',
      description: 'Multiple robots (5) have battery levels below 15%. Charging stations may be malfunctioning in Sector A.',
      time: '15 minutes ago',
      type: 'Warning',
      icon: <Battery className="text-amber-500" size={24} />,
      actions: ['View Details', 'Check Status'],
      actionStyles: ['bg-slate-700 text-white', 'bg-amber-600 text-white']
    },
    {
      id: 3,
      title: 'Software Update Available',
      description: 'New firmware version 3.4.2 is available for your fleet. This update includes critical security patches.',
      time: '1 hour ago',
      type: 'Update',
      icon: <Shield className="text-cyan-500" size={24} />,
      actions: ['View Details', 'Update Now'],
      actionStyles: ['bg-slate-700 text-white', 'bg-cyan-600 text-white']
    },
    {
      id: 4,
      title: 'Task Completed Successfully',
      description: 'Robot R-12 has completed delivery task #T-5643. All items successfully delivered to Assembly Line B.',
      time: '3 hours ago',
      type: 'Info',
      icon: <FileText className="text-slate-400" size={24} />,
      actions: ['View Details', 'Dismiss'],
      actionStyles: ['bg-slate-700 text-white', 'bg-slate-600 text-white']
    },
    {
      id: 5,
      title: 'Maintenance Complete',
      description: 'Scheduled maintenance for Robot R-08 has been completed. Robot is back online and operational.',
      time: '4 hours ago',
      type: 'Success',
      icon: <CheckCircle className="text-green-500" size={24} />,
      actions: ['View Details', 'Acknowledge'],
      actionStyles: ['bg-slate-700 text-white', 'bg-green-600 text-white']
    }
  ];
  
  const stats = {
    total: 24,
    unread: 7,
    critical: 3,
    warnings: 8
  };
  
  const categoryData = [
    { name: 'Error', value: 4, color: 'bg-red-500' },
    { name: 'Battery', value: 8, color: 'bg-amber-500' },
    { name: 'System', value: 5, color: 'bg-cyan-500' },
    { name: 'Delivery', value: 6, color: 'bg-green-500' },
    { name: 'Other', value: 1, color: 'bg-purple-500' }
  ];
  
  const getTypeColor = (type) => {
    switch(type) {
      case 'Critical': return 'border-l-red-500';
      case 'Warning': return 'border-l-amber-500';
      case 'Update': return 'border-l-cyan-500';
      case 'Success': return 'border-l-green-500';
      default: return 'border-l-slate-400';
    }
  };
  
  const getTypeBadgeColor = (type) => {
    switch(type) {
      case 'Critical': return 'bg-red-800 text-red-100';
      case 'Warning': return 'bg-amber-700 text-amber-100';
      case 'Update': return 'bg-cyan-700 text-cyan-100';
      case 'Success': return 'bg-green-700 text-green-100';
      default: return 'bg-slate-700 text-slate-100';
    }
  };
  
  return (
    <div className="flex w-full gap-4 bg-slate-900 text-slate-100 min-h-screen p-4">
      {/* Left Panel - Notifications */}
      <div className="w-2/3 flex flex-col">
        <div className="bg-slate-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">Recent Notifications</h2>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3 New</span>
            </div>
            
            <div className="flex gap-2">
              {/* Dropdown filters */}
              <div className="relative">
                <button className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg">
                  All Categories
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <div className="relative">
                <button className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg">
                  Priority
                  <ChevronDown size={16} />
                </button>
              </div>
              
              {/* Search */}
              <button className="bg-slate-700 p-2 rounded-lg">
                <Search size={20} />
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-slate-700 mb-4">
            <button 
              className={`px-4 py-2 ${activeTab === 'All' ? 'border-b-2 border-cyan-500 text-cyan-400' : 'text-slate-400'}`}
              onClick={() => setActiveTab('All')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'Unread' ? 'border-b-2 border-cyan-500 text-cyan-400' : 'text-slate-400'}`}
              onClick={() => setActiveTab('Unread')}
            >
              Unread
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'Urgent' ? 'border-b-2 border-cyan-500 text-cyan-400' : 'text-slate-400'}`}
              onClick={() => setActiveTab('Urgent')}
            >
              Urgent
            </button>
            <div className="flex-grow"></div>
            <button className="px-4 py-2 text-cyan-500">Mark all as read</button>
          </div>
          
          {/* Notification Cards */}
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`bg-slate-850 border-l-4 ${getTypeColor(notification.type)} rounded-lg overflow-hidden`}
              >
                <div className="flex p-4">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-slate-800">
                    {notification.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{notification.title}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${getTypeBadgeColor(notification.type)}`}>
                        {notification.type}
                      </span>
                    </div>
                    <p className="text-slate-300 mt-1">{notification.description}</p>
                    <div className="mt-2 text-xs text-slate-400">{notification.time}</div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 p-2 bg-slate-850">
                  {notification.actions.map((action, index) => (
                    <button 
                      key={index}
                      className={`px-4 py-2 rounded-md text-sm ${notification.actionStyles[index]}`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Panel - Summary and Settings */}
      <div className="w-1/3 space-y-4">
        {/* Summary Section */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Alert Summary</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="text-slate-300">Total Alerts</div>
              <div className="text-3xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="text-slate-300">Unread</div>
              <div className="text-3xl font-bold">{stats.unread}</div>
            </div>
            <div className="bg-red-900/50 border border-red-800 p-4 rounded-lg">
              <div className="text-red-300">Critical</div>
              <div className="text-3xl font-bold">{stats.critical}</div>
            </div>
            <div className="bg-amber-900/30 border border-amber-800 p-4 rounded-lg">
              <div className="text-amber-300">Warnings</div>
              <div className="text-3xl font-bold">{stats.warnings}</div>
            </div>
          </div>
          
          <h3 className="font-semibold mb-4">Alerts by Category</h3>
          <div className="mb-6">
            <div className="flex items-end mb-2 h-32">
              {categoryData.map(category => (
                <div
                  key={category.name}
                  className="flex-1 mx-1 flex flex-col items-center"
                >
                  <div 
                    className={`w-full ${category.color}`} 
                    style={{ height: `${category.value * 8}px` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex text-xs text-center">
              {categoryData.map(category => (
                <div key={category.name} className="flex-1">
                  {category.name}
                </div>
              ))}
            </div>
          </div>
          
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-slate-700 p-3 rounded-lg">
              <Clock size={16} />
              Run Diagnostics
            </button>
            <button className="flex items-center justify-center gap-2 bg-red-900 text-red-100 p-3 rounded-lg">
              <X size={16} />
              Reset Alerts
            </button>
          </div>
        </div>
        
        {/* Settings Section */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Critical Alerts</h3>
                <p className="text-sm text-slate-400">Push, email, and SMS notifications</p>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only" id="critical" defaultChecked />
                <label htmlFor="critical" className="flex w-14 h-7 bg-cyan-500 rounded-full p-1 cursor-pointer">
                  <span className="w-5 h-5 bg-white rounded-full block ml-auto"></span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Warning Alerts</h3>
                <p className="text-sm text-slate-400">Push and email notifications</p>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only" id="warning" defaultChecked />
                <label htmlFor="warning" className="flex w-14 h-7 bg-cyan-500 rounded-full p-1 cursor-pointer">
                  <span className="w-5 h-5 bg-white rounded-full block ml-auto"></span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Information Updates</h3>
                <p className="text-sm text-slate-400">Only push notifications</p>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only" id="info" />
                <label htmlFor="info" className="flex w-14 h-7 bg-slate-600 rounded-full p-1 cursor-pointer">
                  <span className="w-5 h-5 bg-white rounded-full block"></span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Task Completions</h3>
                <p className="text-sm text-slate-400">Only in-app notifications</p>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only" id="task" defaultChecked />
                <label htmlFor="task" className="flex w-14 h-7 bg-cyan-500 rounded-full p-1 cursor-pointer">
                  <span className="w-5 h-5 bg-white rounded-full block ml-auto"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}