
import { useState } from "react";
import Navigation from "../components/Navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

const Help = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I book a table?",
      answer: "To book a table, simply search for restaurants in your area, select your preferred restaurant, choose your date and time, specify the number of guests, and confirm your booking. You'll receive a confirmation email with a QR code."
    },
    {
      question: "How can I cancel or reschedule my booking?",
      answer: "You can cancel or reschedule your booking by going to your Dashboard and selecting 'My Bookings'. From there, you can view all your reservations and make changes as needed. Please note that cancellation policies may vary by restaurant."
    },
    {
      question: "How do I become a restaurant partner?",
      answer: "Restaurant owners can join FoodHopper by clicking on 'Owner Login' and registering their establishment. Once approved, you'll get access to your restaurant dashboard where you can manage your profile, menu, bookings, and customer reviews."
    },
    {
      question: "What are the safety guidelines?",
      answer: "We follow strict safety protocols including verified restaurant partnerships, secure payment processing, and customer data protection. All restaurants on our platform are verified and maintain hygiene standards. We also provide contactless booking options."
    },
    {
      question: "How do I pay for my booking?",
      answer: "Payment can be made securely through our platform using credit/debit cards, UPI, or digital wallets. Some restaurants may also accept payment at the venue. Payment methods accepted will be displayed during the booking process."
    },
    {
      question: "Can I modify the number of guests after booking?",
      answer: "Yes, you can modify the number of guests through your dashboard, subject to the restaurant's availability and policies. We recommend making changes at least 2 hours before your reservation time."
    },
    {
      question: "What if a restaurant is fully booked?",
      answer: "If your preferred time slot is unavailable, you can either choose a different time or join the waitlist. We'll notify you if a spot opens up. You can also browse similar restaurants in your area with available slots."
    },
    {
      question: "How do I leave a review?",
      answer: "After your dining experience, you can leave a review by going to your Dashboard and selecting 'My Reviews'. Your honest feedback helps other users make informed decisions and helps restaurants improve their service."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Help Center
            </h1>
            <p className="text-lg text-gray-600">
              Find answers to commonly asked questions
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-12 bg-orange-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Still need help?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Contact Support
              </a>
              <a 
                href="mailto:support@foodhopper.com"
                className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
