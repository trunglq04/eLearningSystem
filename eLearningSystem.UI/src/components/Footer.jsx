import React from "react";

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div>
            <img
              src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_79143.jpg"
              alt="Company Logo"
              className="h-20 w-20"
            />
            <p className="mb-4">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Commerce
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Insights
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    API Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Claim
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
