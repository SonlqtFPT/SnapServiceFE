import React from 'react';
import { Mail, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Help Section */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Do You Need Help ?</h3>
            <p className="text-gray-600 text-sm mb-4">
              At Snap Service, we are committed to delivering innovative solutions that make your life easier. Our team is dedicated to providing high-quality services tailored to meet your unique needs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Monday-Friday: 08am-9pm</p>
                  <p className="font-bold text-gray-900">0987269004</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Need help with your order?</p>
                  <p className="font-bold text-gray-900">snapservice@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Make Money Section */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Sell on SnapService</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Sell Your Services on SnapService</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Sell on SnapService Business</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Sell Your Apps on SnapService</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Become an Affiliate</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Advertise Your Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Sell-Publish with Us</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Accessibility Statement</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Your Orders</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Returns & Replacements</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Shipping Rates & Policies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Refund and Returns Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Terms and Conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Cookie Settings</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Help Center</a></li>
            </ul>
          </div>

          {/* Get to Know Us Section */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Careers for Grogin</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">About Grogin</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Investor Relations</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Grogin Devices</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Customer reviews</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Social Responsibility</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Store Locations</a></li>
            </ul>
          </div>

          {/* Download App Section */}
          <div>

            {/* Social Media */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Follow us on social media:</p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-black text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <span className="text-xs font-bold">X</span>
                </a>
                <a href="#" className="w-8 h-8 bg-pink-600 text-white rounded flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-blue-700 text-white rounded flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
              <p>Copyright 2025© SnapService</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-sm">
                <a href="#" className="text-gray-600 hover:text-purple-600">Terms and Conditions</a>
                <a href="#" className="text-gray-600 hover:text-purple-600">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-purple-600">Order Tracking</a>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-2 ml-6">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">PP</div>
                <div className="w-8 h-5 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">S</div>
                <div className="w-8 h-5 bg-pink-500 rounded text-white text-xs flex items-center justify-center font-bold">K</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;