import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome, Voter!",
      "dashboard_subtitle": "Here's your personalized election dashboard.",
      "start_journey": "Start My Voter Journey",
      "know_vote": "Know Your Vote.",
      "own_future": "Own Your Future.",
      "home": "Home",
      "dashboard": "Dashboard",
      "timeline": "Timeline",
      "candidates": "Candidates",
      "booth_finder": "Booth Finder",
      "next_election": "Next Election",
      "take_action": "Take Action"
    }
  },
  hi: {
    translation: {
      "welcome": "नमस्ते, मतदाता!",
      "dashboard_subtitle": "यह आपका व्यक्तिगत चुनाव डैशबोर्ड है।",
      "start_journey": "मेरी मतदाता यात्रा शुरू करें",
      "know_vote": "अपना वोट जानें।",
      "own_future": "अपना भविष्य बनाएं।",
      "home": "होम",
      "dashboard": "डैशबोर्ड",
      "timeline": "समयरेखा",
      "candidates": "उम्मीदवार",
      "booth_finder": "बूथ खोजें",
      "next_election": "अगला चुनाव",
      "take_action": "कार्रवाई करें"
    }
  },
  bn: {
    translation: {
      "welcome": "স্বাগতম, ভোটার!",
      "dashboard_subtitle": "এখানে আপনার ব্যক্তিগতকৃত নির্বাচনী ড্যাশবোর্ড রয়েছে।",
      "home": "হোম",
      "dashboard": "ড্যাশবোর্ড",
      "candidates": "প্রার্থী",
      "booth_finder": "বুথ খুঁজুন",
      "next_election": "পরবর্তী নির্বাচন",
      "take_action": "পদক্ষেপ নিন"
    }
  },
  te: {
    translation: {
      "welcome": "స్వాగతం, ఓటరు!",
      "dashboard_subtitle": "ఇక్కడ మీ వ్యక్తిగతీకరించిన ఎన్నికల డ్యాష్‌బోర్డ్ ఉంది.",
      "home": "హోమ్",
      "dashboard": "డ్యాష్‌బోర్డ్",
      "candidates": "అభ్యర్థులు",
      "booth_finder": "బూత్ ఫైండర్",
      "next_election": "తదుపరి ఎన్నికలు",
      "take_action": "చర్య తీసుకోండి"
    }
  },
  ta: {
    translation: {
      "welcome": "வரவேற்கிறோம், வாக்காளரே!",
      "dashboard_subtitle": "உங்கள் தனிப்பயனாக்கப்பட்ட தேர்தல் டாஷ்போர்டு இதோ.",
      "home": "முகப்பு",
      "dashboard": "டாஷ்போர்டு",
      "candidates": "வேட்பாளர்கள்",
      "booth_finder": "பூத் கண்டறிதல்",
      "next_election": "அடுத்த தேர்தல்",
      "take_action": "நடவடிக்கை எடு"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
