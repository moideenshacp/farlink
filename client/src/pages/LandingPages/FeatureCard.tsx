import React from 'react';
import { Send, BarChart2, MessageSquare, ArrowRight } from 'lucide-react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  iconColor 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  iconColor: string;
}) => (
  <div className="flex flex-col bg-white p-6 sm:p-8 gap-4 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${iconColor} flex items-center justify-center`}>
      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
    </div>
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
    </div>
    <div className="mt-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer group">
      Learn more 
      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Send,
      title: "Publishing",
      description: "Plan, collaborate, and publishing your content that drives meaningful engagement and growth",
      iconColor: "bg-purple-100 text-purple-600"
    },
    {
      icon: BarChart2,
      title: "Analytics",
      description: "Analyze your performance and create gorgeous reports",
      iconColor: "bg-blue-100 text-blue-600"
    },
    {
      icon: MessageSquare,
      title: "Engagement",
      description: "Actively navigate you area targets with your audience",
      iconColor: "bg-green-100 text-green-600"
    }
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-sm sm:text-base font-semibold text-[#4361EE] mb-4">
            Features that empower your workflow
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to manage your business
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto">
            SaaS become a common delivery model for many business applications, including
            office software, messaging software, payroll processing software, DBMS software,
            management software
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={feature.iconColor}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#4361EE] hover:bg-blue-700 transition-colors duration-300">
            Explore all features
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;