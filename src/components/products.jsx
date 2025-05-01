import { useState } from 'react';
import { ChevronDown, Minus, Plus, Clock } from 'lucide-react';

export default function DeliveryRequestForm() {
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  
  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-dark-900 to-dark-800 text-gray-100">
      <div className="w-full h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 pb-20">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-primary-400">New Delivery Request</h1>
            <p className="text-gray-400">Select products and quantities for robot delivery</p>
          </div>
          
          {/* Product Selection */}
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">Product</label>
              <button className="select w-full flex items-center justify-between hover:bg-dark-900 group">
                <span>Select a product</span>
                <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              </button>
            </div>
            
            {/* Selected Product */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
              <div className="flex items-start gap-6">
                <div className="bg-dark-900/80 p-4 rounded-lg">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="text-primary-400 w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="2" />
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 8v4M8 12h4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary-300">Industrial Circuit Board - ICB2040</h3>
                  <div className="text-gray-400 mt-2 space-y-1">
                    <p>SKU: ICB2040-A | Weight: 0.45 kg</p>
                    <p>Location: Storage Unit B, Shelf 3</p>
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400">
                      In Stock: 132 units
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
              <div className="flex w-48">
                <button 
                  className="btn bg-dark-800 hover:bg-dark-900 text-gray-300 px-4 rounded-l-md border-r border-gray-700"
                  onClick={decreaseQuantity}
                >
                  <Minus className="h-5 w-5" />
                </button>
                <div className="flex-1 bg-dark-800 flex items-center justify-center text-lg font-medium text-gray-100">
                  {quantity}
                </div>
                <button 
                  className="btn bg-dark-800 hover:bg-dark-900 text-gray-300 px-4 rounded-r-md border-l border-gray-700"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Delivery Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Destination</label>
              <button className="select w-full flex items-center justify-between hover:bg-dark-900 group">
                <span>Select a destination</span>
                <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              </button>
            </div>
            
            {/* Priority and Delivery Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                <button className="select w-full flex items-center justify-between hover:bg-dark-900 group">
                  <span>Normal</span>
                  <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Time</label>
                <button className="select w-full flex items-center justify-between hover:bg-dark-900 group">
                  <span className="text-gray-400">--:-- --</span>
                  <Clock className="h-5 w-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
                </button>
              </div>
            </div>
            
            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
              <textarea 
                className="input w-full h-32 resize-none"
                placeholder="Add any special handling instructions..."
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 mb-6">
              <button className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
                Create Delivery Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}