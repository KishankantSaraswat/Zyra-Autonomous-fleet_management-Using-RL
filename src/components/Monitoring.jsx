import { useState } from 'react';
import { Video, Wifi, Battery, Play, Pause, Square, Maximize2, Volume2, List, Grid, MapPin, ChevronRight, AlertOctagon } from 'lucide-react';

export default function RobotControlDashboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="fixed h-full bg-gray-900 text-white flex flex-col z-50" style={{ left: '280px', width: 'calc(100% - 280px)', top: 0, right: 0, bottom: 0, minHeight: '100vh', position: 'fixed' }}>
      <div className="w-full h-full overflow-y-auto">
        <div className="flex flex-col lg:flex-row w-full h-full">
          {/* Left Panel - Video Feed */}
          <div className="w-full lg:w-2/3 p-4 flex flex-col">
            {/* Live Feed Header */}
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <h2 className="text-lg font-medium">Live Feed: Robot-18</h2>
              </div>
              <div className="ml-auto flex">
                <button className="text-white mx-1">
                  <Wifi className="w-5 h-5" />
                </button>
                <button className="text-white mx-1">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Video Player */}
            <div className="relative flex-grow bg-black border border-gray-800 rounded-sm overflow-hidden mb-2">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <Video className="w-16 h-16 mb-2 opacity-50" />
                <div className="text-center">
                  <p>Live camera feed connecting...</p>
                  <div className="w-40 h-1 bg-gray-800 mt-4 mx-auto rounded-full overflow-hidden">
                    <div className="w-1/4 h-1 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Feed Info */}
              <div className="absolute bottom-0 left-0 p-3 text-sm">
                <div>Storage Area B • Camera 3</div>
                <div className="text-gray-400 text-xs">Bandwidth: 5.2 Mbps</div>
              </div>
              
              {/* Controls */}
              <div className="absolute bottom-0 right-0 p-3 flex items-center">
                <button className="p-1 text-white opacity-70 hover:opacity-100">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button className="p-1 text-white opacity-70 hover:opacity-100">
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button className="p-1 text-white opacity-70 hover:opacity-100">
                  <span className="text-2xl">+</span>
                </button>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="flex items-center bg-gray-900 py-2">
              <button className="rounded-full bg-blue-500 p-2 mr-3" onClick={() => setIsPlaying(!isPlaying)}>
                <Play className="w-5 h-5" />
              </button>
              
              <button className="p-1 text-gray-400 hover:text-white">
                <Pause className="w-5 h-5" />
              </button>
              
              <button className="p-1 text-gray-400 hover:text-white ml-2">
                <List className="w-5 h-5" />
              </button>
              
              <div className="mx-4 flex-grow">
                <div className="relative w-full h-1 bg-gray-700 rounded-full">
                  <div className="absolute h-1 w-1/4 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              
              <span className="text-sm text-gray-400 mr-4">00:34</span>
              <span className="text-sm text-gray-400 mr-4">01:42</span>
              
              <button className="p-1 text-gray-400 hover:text-white">
                <Volume2 className="w-5 h-5" />
              </button>
              
              <button className="p-1 text-gray-400 hover:text-white mx-1">
                <List className="w-5 h-5" />
              </button>
              
              <button className="p-1 text-gray-400 hover:text-white">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
            
            {/* All Camera Feeds */}
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-medium">All Camera Feeds</h3>
                <button className="text-blue-400 hover:text-blue-300 text-sm">View Grid</button>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {['R-12', 'R-05', 'R-18', 'R-24'].map((robot, index) => (
                  <div key={robot} className="relative bg-black border border-gray-800 rounded-sm overflow-hidden aspect-video">
                    <div className={`absolute top-2 left-2 flex items-center ${robot === 'R-24' ? 'text-red-500' : 'text-green-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${robot === 'R-24' ? 'bg-red-500' : 'bg-green-500'} mr-1`}></div>
                      <span className="text-xs">{robot}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="w-8 h-8 text-gray-600" />
                    </div>
                    {robot === 'R-18' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Panel - Robot Control */}
          <div className="w-full lg:w-1/3 bg-gray-800 p-4">
            <h2 className="text-xl font-bold mb-4">Robot Control: R-18</h2>
            
            {/* Robot Status */}
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Robot-18 (Transport)</h3>
                  <div className="flex items-center text-sm text-green-500">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span>Active • Delivery in Progress</span>
                  </div>
                </div>
              </div>
              
              {/* Battery Status */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <Battery className="w-4 h-4 mr-2" />
                    <span className="text-sm">Battery Status</span>
                  </div>
                  <span className="text-green-400">72%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>Est. Runtime: 5.4 hours</span>
                  <span>Last Charged: 2 hours ago</span>
                </div>
              </div>
              
              {/* Network Status */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <Wifi className="w-4 h-4 mr-2" />
                    <span className="text-sm">Network Status</span>
                  </div>
                  <span className="text-cyan-400">Connected</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div className="h-2 bg-cyan-500 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>Signal: 88%</span>
                  <span>Latency: 42ms</span>
                </div>
              </div>
              
              {/* Speed Control */}
              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm">Speed Control</span>
                  </div>
                  <span>2.4 m/s</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full mb-3">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between">
                  <button className="px-4 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600">
                    Slow
                  </button>
                  <button className="px-4 py-1 text-sm rounded bg-yellow-500 text-black hover:bg-yellow-600">
                    Normal
                  </button>
                  <button className="px-4 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600">
                    Fast
                  </button>
                </div>
              </div>
            </div>
            
            {/* Operation Controls */}
            <div className="mb-4">
              <h3 className="text-lg mb-3">Operation Controls</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md">
                  <Play className="w-5 h-5 mr-2" fill="currentColor" />
                  Start
                </button>
                <button className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-md">
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </button>
              </div>
              <button className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md mt-3">
                <Square className="w-5 h-5 mr-2" fill="currentColor" />
                Emergency Stop
              </button>
            </div>
            
            {/* Current Location */}
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <h3 className="text-lg mb-3">Current Location</h3>
              <div className="flex items-start mb-3">
                <MapPin className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium">Storage Area B, Aisle 4</div>
                  <div className="text-sm text-gray-400">Coordinates: X:145, Y:232, Z:0</div>
                </div>
              </div>
              <div className="flex items-center">
                <ChevronRight className="w-5 h-5 mr-2 text-cyan-400" />
                <div>
                  <div className="font-medium">Heading to: Assembly Line A</div>
                  <div className="text-sm text-gray-400">ETA: 3 minutes</div>
                </div>
              </div>
            </div>
            
            {/* Current Task */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg">Current Task</h3>
              {/* Task content placeholder */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}