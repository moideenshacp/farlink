import React from 'react';
import { LayoutGrid, ListChecks } from 'lucide-react';
import laptop from '../../assets/Laptop.png'

const FeatureItem = ({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col gap-4">
    <div className="w-12 h-12 flex items-center justify-center">
      <Icon className="w-8 h-8 text-purple-500" />
    </div>
    <div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const CoreFeaturesSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h3 className="text-gray-600 text-lg font-bold mb-4">Our Core Features</h3>
            <h2 className="text-4xl md:text-5xl text-black font-bold leading-tight">
              We Make It
              <br />
              Effortlessly To Track
              <br />
              All Employee
              <br />
              Performance
            </h2>
          </div>

          <p className="text-gray-600 text-lg">
            Self service data analytic software that lets you create
            visually appealing data visualizations and insightful
            dashboard in minutes
          </p>

          <div className="grid grid-cols-2 gap-8 pt-4">
            <FeatureItem
              icon={LayoutGrid}
              title="Powerful dashboard"
              description="Combine multiple report into a single beautiful dashboard"
            />
            <FeatureItem
              icon={ListChecks}
              title="Always in Best Organize"
              description="Combine multiple report into a single beautiful dashboard"
            />
          </div>
        </div>

        <div className="relative lg:pl-32 rounded-3xl overflow-hidden">
          <img 
            src={laptop} 
            alt="Woman working with laptop" 
            className="object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CoreFeaturesSection;