export interface BdSLClass {
  id: string;
  glossEn: string;
  labelBn: string;
  category: 'Medical' | 'Emergency' | 'General' | 'Daily' | 'Action';
  phonetic: string;
  descriptionBn: string;
  hospitalDepartment?: string;
  handshapeType: 'One-Handed' | 'Two-Handed';
}

export interface GesturePreset {
  id: string;
  titleBn: string;
  titleEn: string;
  tokens: string[];
  tokenEn: string[];
  reconstructedBn: string;
  reconstructedEn: string;
  urgency: 'Normal' | 'Urgent Alert';
  department: string;
  latencyBreakdown: {
    mediapipe: number;
    bilstm: number;
    rag: number;
    tts: number;
  };
  confidence: number;
  simulatedLandmarkType: 'head_pain' | 'emergency_breath' | 'medicine_time' | 'bp_check' | 'thank_you' | 'unknown_noise';
}

export interface DoctorPreset {
  id: string;
  bengaliText: string;
  englishText: string;
  department: string;
  signs: {
    glossBn: string;
    glossEn: string;
    instructionBn: string;
    instructionEn: string;
    handshape: 'flat_palm' | 'fist' | 'pointing' | 'cupped' | 'two_hands_cross' | 'chest_touch';
    direction: string;
  }[];
}

export const BDSL_W60_CLASSES: BdSLClass[] = [
  { id: 'bdsl_01', glossEn: 'I / ME', labelBn: 'আমি', category: 'General', phonetic: 'Ami', descriptionBn: 'তর্জনী বুকের দিকে নির্দেশ করা', handshapeType: 'One-Handed' },
  { id: 'bdsl_02', glossEn: 'HEAD', labelBn: 'মাথা', category: 'Medical', phonetic: 'Matha', descriptionBn: 'তর্জনী মাথার কপালে স্পর্শ করা', hospitalDepartment: 'Neurology', handshapeType: 'One-Handed' },
  { id: 'bdsl_03', glossEn: 'PAIN', labelBn: 'ব্যথা', category: 'Medical', phonetic: 'Byatha', descriptionBn: 'হাত মুঠ করে কম্পন সৃষ্টি করা', hospitalDepartment: 'General Medicine', handshapeType: 'One-Handed' },
  { id: 'bdsl_04', glossEn: 'EMERGENCY', labelBn: 'জরুরি', category: 'Emergency', phonetic: 'Joruri', descriptionBn: 'উভয় হাত দ্রুত ওঠানামা করে সতর্কীকরণ মুদ্রা', hospitalDepartment: 'Emergency Triage', handshapeType: 'Two-Handed' },
  { id: 'bdsl_05', glossEn: 'HELP', labelBn: 'সাহায্য', category: 'Emergency', phonetic: 'Sahajjo', descriptionBn: 'এক হাতের তালুতে অপর হাতের থাম্বস আপ স্থাপন', hospitalDepartment: 'Emergency Triage', handshapeType: 'Two-Handed' },
  { id: 'bdsl_06', glossEn: 'BREATHING / ASTHMA', labelBn: 'শ্বাসকষ্ট', category: 'Medical', phonetic: 'Shashkoshto', descriptionBn: 'উভয় হাত বুকের উপর রেখে শ্বাস নেয়ার ভঙ্গি', hospitalDepartment: 'Pulmonology', handshapeType: 'Two-Handed' },
  { id: 'bdsl_07', glossEn: 'MEDICINE', labelBn: 'ওষুধ', category: 'Medical', phonetic: 'Oshudh', descriptionBn: 'হাতের তালুতে ওষুধ পেষার ভঙ্গি', hospitalDepartment: 'Pharmacy', handshapeType: 'Two-Handed' },
  { id: 'bdsl_08', glossEn: 'WHEN', labelBn: 'কখন', category: 'General', phonetic: 'Kokon', descriptionBn: 'কব্জির দিকে ইশারা করে সময়ের ইঙ্গিত', handshapeType: 'One-Handed' },
  { id: 'bdsl_09', glossEn: 'EAT / TAKE', labelBn: 'খাবো', category: 'Action', phonetic: 'Khabo', descriptionBn: 'আঙুলগুলো একত্র করে মুখের দিকে নেয়া', handshapeType: 'One-Handed' },
  { id: 'bdsl_10', glossEn: 'BLOOD PRESSURE', labelBn: 'রক্তচাপ', category: 'Medical', phonetic: 'Roktochap', descriptionBn: 'বাহুর উপর হাত চেপে চাপ দেয়ার ভঙ্গি', hospitalDepartment: 'Cardiology', handshapeType: 'Two-Handed' },
  { id: 'bdsl_11', glossEn: 'TEST / CHECK', labelBn: 'পরীক্ষা', category: 'Medical', phonetic: 'Porikkha', descriptionBn: 'দুই আঙুল দিয়ে স্ক্যান করার অনুভূমিক ভঙ্গি', hospitalDepartment: 'Diagnostic Lab', handshapeType: 'One-Handed' },
  { id: 'bdsl_12', glossEn: 'THANK YOU', labelBn: 'ধন্যবাদ', category: 'General', phonetic: 'Dhonnobad', descriptionBn: 'চিবুক থেকে হাত সামনের দিকে প্রসারিত করা', handshapeType: 'One-Handed' },
  { id: 'bdsl_13', glossEn: 'GOOD / WELL', labelBn: 'ভালো', category: 'General', phonetic: 'Bhalo', descriptionBn: 'থাম্বস আপ উঁচু করা', handshapeType: 'One-Handed' },
  { id: 'bdsl_14', glossEn: 'DOCTOR', labelBn: 'ডাক্তার', category: 'Medical', phonetic: 'Daktar', descriptionBn: 'কব্জিতে নাড়ি পরীক্ষা করার ভঙ্গি', hospitalDepartment: 'Reception', handshapeType: 'Two-Handed' },
  { id: 'bdsl_15', glossEn: 'FEVER', labelBn: 'জ্বর', category: 'Medical', phonetic: 'Jwor', descriptionBn: 'হাতের উল্টো পিঠ কপালে ঠেকানো', hospitalDepartment: 'General Medicine', handshapeType: 'One-Handed' },
  { id: 'bdsl_16', glossEn: 'HOSPITAL', labelBn: 'হাসপাতাল', category: 'Medical', phonetic: 'Hospital', descriptionBn: 'কপালে বা বাহুতে লাল ক্রস চিহ্নের অনুকরণ', hospitalDepartment: 'Information', handshapeType: 'Two-Handed' },
  { id: 'bdsl_17', glossEn: 'WATER', labelBn: 'পানি', category: 'Daily', phonetic: 'Pani', descriptionBn: 'তিন আঙুল ঠোঁটে স্পর্শ করা', handshapeType: 'One-Handed' },
  { id: 'bdsl_18', glossEn: 'WAIT', labelBn: 'অপেক্ষা', category: 'Action', phonetic: 'Opekkha', descriptionBn: 'উভয় হাতের তালু নিচের দিকে রেখে স্থির থাকা', handshapeType: 'Two-Handed' },
  { id: 'bdsl_19', glossEn: 'ROOM / CABIN', labelBn: 'রুম', category: 'General', phonetic: 'Room', descriptionBn: 'চার কোণা বক্স তৈরি করা', hospitalDepartment: 'Reception', handshapeType: 'Two-Handed' },
  { id: 'bdsl_20', glossEn: 'MONEY / BILL', labelBn: 'টাকা', category: 'General', phonetic: 'Taka', descriptionBn: 'বুড়ো আঙুল ও তর্জনী ঘষা', hospitalDepartment: 'Billing Counter', handshapeType: 'One-Handed' },
  { id: 'bdsl_21', glossEn: 'NURSE', labelBn: 'নার্স', category: 'Medical', phonetic: 'Nurse', descriptionBn: 'মাথায় ক্যাপের ইঙ্গিত ও সাদা এপ্রোন ছোঁয়া', hospitalDepartment: 'Inpatient Care', handshapeType: 'Two-Handed' },
  { id: 'bdsl_22', glossEn: 'AMBULANCE', labelBn: 'অ্যাম্বুলেন্স', category: 'Emergency', phonetic: 'Ambulance', descriptionBn: 'মাথার উপর সাইরেনের ঘূর্ণায়মান ভঙ্গি', hospitalDepartment: 'Emergency', handshapeType: 'One-Handed' },
  { id: 'bdsl_23', glossEn: 'HEART', labelBn: 'হৃদরোগ', category: 'Medical', phonetic: 'Hridrog', descriptionBn: 'বুকের বাঁপাশে হাত রেখে স্পন্দনের অনুকরণ', hospitalDepartment: 'Cardiology', handshapeType: 'One-Handed' },
  { id: 'bdsl_24', glossEn: 'STOMACH', labelBn: 'পেট', category: 'Medical', phonetic: 'Pet', descriptionBn: 'পেটে হাত রেখে বৃত্তাকার সঞ্চালন', hospitalDepartment: 'Gastroenterology', handshapeType: 'One-Handed' },
  { id: 'bdsl_25', glossEn: 'YES', labelBn: 'হ্যাঁ', category: 'General', phonetic: 'Hya', descriptionBn: 'মুঠো হাত উপর-নিচ দোলানো', handshapeType: 'One-Handed' },
  { id: 'bdsl_26', glossEn: 'NO', labelBn: 'না', category: 'General', phonetic: 'Na', descriptionBn: 'তর্জনী ডানে-বাঁয়ে নাড়ানো', handshapeType: 'One-Handed' },
  { id: 'bdsl_27', glossEn: 'PLEASE', labelBn: 'দয়া করে', category: 'General', phonetic: 'Doya Kore', descriptionBn: 'বুকের ওপর হাতের তালু চক্রাকারে ঘষা', handshapeType: 'One-Handed' },
  { id: 'bdsl_28', glossEn: 'SLIP / APPOINTMENT', labelBn: 'অ্যাপয়েন্টমেন্ট', category: 'General', phonetic: 'Appointment', descriptionBn: 'কাগজে লেখার ভঙ্গি করা', hospitalDepartment: 'Reception', handshapeType: 'Two-Handed' },
  { id: 'bdsl_29', glossEn: 'TEMPERATURE', labelBn: 'তাপমাত্রা', category: 'Medical', phonetic: 'Tapmatra', descriptionBn: 'মুখে থার্মোমিটার দেয়ার ইঙ্গিত', hospitalDepartment: 'Triage Desk', handshapeType: 'One-Handed' },
  { id: 'bdsl_30', glossEn: 'WHEELCHAIR', labelBn: 'হুইলচেয়ার', category: 'Medical', phonetic: 'Wheelchair', descriptionBn: 'উভয় হাত দিয়ে চাকা ঘোরানোর ভঙ্গি', hospitalDepartment: 'Logistics', handshapeType: 'Two-Handed' },
  { id: 'bdsl_31', glossEn: 'ACCIDENT', labelBn: 'দুর্ঘটনা', category: 'Emergency', phonetic: 'Durghotona', descriptionBn: 'দুই মুষ্টিবদ্ধ হাতের মুখোমুখি সংঘর্ষ', hospitalDepartment: 'Emergency Trauma', handshapeType: 'Two-Handed' },
  { id: 'bdsl_32', glossEn: 'BLEEDING', labelBn: 'রক্তপাত', category: 'Emergency', phonetic: 'Roktopat', descriptionBn: 'শরীরের কোনো স্থান থেকে নিচের দিকে তরলের ইশারা', hospitalDepartment: 'Emergency Trauma', handshapeType: 'One-Handed' },
  { id: 'bdsl_33', glossEn: 'DIABETES', labelBn: 'ডায়াবেটিস', category: 'Medical', phonetic: 'Diabetes', descriptionBn: 'আঙুলে সুঁচ ফোটানোর ইশারা', hospitalDepartment: 'Endocrinology', handshapeType: 'Two-Handed' },
  { id: 'bdsl_34', glossEn: 'ALLERGY', labelBn: 'এলার্জি', category: 'Medical', phonetic: 'Allergy', descriptionBn: 'হাতে চুলকানির অনুকরণ', hospitalDepartment: 'Dermatology', handshapeType: 'One-Handed' },
  { id: 'bdsl_35', glossEn: 'X-RAY', labelBn: 'এক্স-রে', category: 'Medical', phonetic: 'X-Ray', descriptionBn: 'বুকের সামনে দুই হাত আড়াআড়ি করে আলোর ঝলকানি দেখানো', hospitalDepartment: 'Radiology', handshapeType: 'Two-Handed' },
  { id: 'bdsl_36', glossEn: 'INJECTION', labelBn: 'ইনজেকশন', category: 'Medical', phonetic: 'Injection', descriptionBn: 'বাহুতে সিরিঞ্জ পুশ করার ভঙ্গি', hospitalDepartment: 'Pharmacy', handshapeType: 'Two-Handed' },
  { id: 'bdsl_37', glossEn: 'PREGNANCY', labelBn: 'গর্ভবতী', category: 'Medical', phonetic: 'Gorbhoboti', descriptionBn: 'পেটের স্ফীতির উপর দুই হাত রাখা', hospitalDepartment: 'Gynecology', handshapeType: 'Two-Handed' },
  { id: 'bdsl_38', glossEn: 'CHILD', labelBn: 'শিশু', category: 'General', phonetic: 'Shishu', descriptionBn: 'ছোট উচ্চতা নির্দেশক হাত', hospitalDepartment: 'Pediatrics', handshapeType: 'One-Handed' },
  { id: 'bdsl_39', glossEn: 'EYE', labelBn: 'চোখ', category: 'Medical', phonetic: 'Chokh', descriptionBn: 'চোখের নিচে দুই আঙুল নির্দেশ করা', hospitalDepartment: 'Ophthalmology', handshapeType: 'One-Handed' },
  { id: 'bdsl_40', glossEn: 'EAR', labelBn: 'কান', category: 'Medical', phonetic: 'Kan', descriptionBn: 'কানে স্পর্শ করে শোনার ইঙ্গিত', hospitalDepartment: 'ENT', handshapeType: 'One-Handed' },
  { id: 'bdsl_41', glossEn: 'SLEEP', labelBn: 'ঘুম', category: 'Daily', phonetic: 'Ghum', descriptionBn: 'মাথা একপাশে কাত করে হাতের ওপর রাখা', handshapeType: 'One-Handed' },
  { id: 'bdsl_42', glossEn: 'TIRED', labelBn: 'ক্লান্ত', category: 'General', phonetic: 'Klanto', descriptionBn: 'বুক থেকে হাত শিথিল হয়ে নেমে আসা', handshapeType: 'Two-Handed' },
  { id: 'bdsl_43', glossEn: 'NAME', labelBn: 'নাম', category: 'General', phonetic: 'Naam', descriptionBn: 'দুই তর্জনী আড়াআড়ি ট্যাপ করা', handshapeType: 'Two-Handed' },
  { id: 'bdsl_44', glossEn: 'ADDRESS', labelBn: 'ঠিকানা', category: 'General', phonetic: 'Thikana', descriptionBn: 'বাড়ির ছাদ তৈরি করে লেখার ভঙ্গি', handshapeType: 'Two-Handed' },
  { id: 'bdsl_45', glossEn: 'PHONE', labelBn: 'ফোন', category: 'General', phonetic: 'Phone', descriptionBn: 'বৃদ্ধা ও কনিষ্ঠা কানে ধরা', handshapeType: 'One-Handed' },
  { id: 'bdsl_46', glossEn: 'FAMILY', labelBn: 'পরিবার', category: 'General', phonetic: 'Poribar', descriptionBn: 'দুই হাত দিয়ে বৃত্তাকার বন্ধনী তৈরি করা', handshapeType: 'Two-Handed' },
  { id: 'bdsl_47', glossEn: 'COME', labelBn: 'আসুন', category: 'Action', phonetic: 'Ashun', descriptionBn: 'হাত নিজের দিকে আহ্বান করা', handshapeType: 'One-Handed' },
  { id: 'bdsl_48', glossEn: 'GO', labelBn: 'যান', category: 'Action', phonetic: 'Jan', descriptionBn: 'হাত বাইরের দিকে নির্দেশ করা', handshapeType: 'One-Handed' },
  { id: 'bdsl_49', glossEn: 'SIT', labelBn: 'বসুন', category: 'Action', phonetic: 'Boshun', descriptionBn: 'দুই আঙুল অপর আঙুলের ওপর বাঁকানো', handshapeType: 'Two-Handed' },
  { id: 'bdsl_50', glossEn: 'STAND', labelBn: 'দাঁড়ান', category: 'Action', phonetic: 'Daran', descriptionBn: 'দুই আঙুল হাতের তালুর ওপর সোজা দাঁড় করানো', handshapeType: 'Two-Handed' },
  { id: 'bdsl_51', glossEn: 'OXYGEN', labelBn: 'অক্সিজেন', category: 'Emergency', phonetic: 'Oxygen', descriptionBn: 'মুখে মাস্ক পরার ভঙ্গি', hospitalDepartment: 'Emergency ICU', handshapeType: 'Two-Handed' },
  { id: 'bdsl_52', glossEn: 'SURGERY', labelBn: 'অপারেশন', category: 'Medical', phonetic: 'Operation', descriptionBn: 'বুড়ো আঙুল দিয়ে ত্বকে কাটার ভঙ্গি', hospitalDepartment: 'Surgery Dept', handshapeType: 'Two-Handed' },
  { id: 'bdsl_53', glossEn: 'REPORT', labelBn: 'রিপোর্ট', category: 'Medical', phonetic: 'Report', descriptionBn: 'কাগজ খুলে পড়ার ভঙ্গি', hospitalDepartment: 'Diagnostic Counter', handshapeType: 'Two-Handed' },
  { id: 'bdsl_54', glossEn: 'MORNING', labelBn: 'সকাল', category: 'Daily', phonetic: 'Sokal', descriptionBn: 'সূর্য ওঠার অনুকরণ হাত উঁচু করে', handshapeType: 'One-Handed' },
  { id: 'bdsl_55', glossEn: 'NIGHT', labelBn: 'রাত', category: 'Daily', phonetic: 'Raat', descriptionBn: 'এক হাত দিয়ে অন্য হাত ঢেকে দেয়া', handshapeType: 'Two-Handed' },
  { id: 'bdsl_56', glossEn: 'HOW MUCH', labelBn: 'কত', category: 'General', phonetic: 'Koto', descriptionBn: 'আঙুলগুলো দ্রুত নাচানো', handshapeType: 'One-Handed' },
  { id: 'bdsl_57', glossEn: 'UNDERSTOOD', labelBn: 'বুঝেছি', category: 'General', phonetic: 'Bujhechi', descriptionBn: 'মাথা নেড়ে তর্জনী কপালে ছোঁয়ানো', handshapeType: 'One-Handed' },
  { id: 'bdsl_58', glossEn: 'NOT UNDERSTOOD', labelBn: 'বুঝিনি', category: 'General', phonetic: 'Bujhini', descriptionBn: 'কপাল থেকে হাত উল্টে না-সূচক ঝাঁকুনি', handshapeType: 'One-Handed' },
  { id: 'bdsl_59', glossEn: 'SAFE', labelBn: 'নিরাপদ', category: 'General', phonetic: 'Nirapod', descriptionBn: 'দুই হাত ক্রস থেকে মুক্ত করা', handshapeType: 'Two-Handed' },
  { id: 'bdsl_60', glossEn: 'DISCHARGE', labelBn: 'রিলিজ', category: 'Medical', phonetic: 'Release', descriptionBn: 'দরজা খোলার মতো হাত বাইরে নিয়ে যাওয়া', hospitalDepartment: 'Discharge Desk', handshapeType: 'Two-Handed' },
];

export const SAMPLE_GESTURE_PRESETS: GesturePreset[] = [
  {
    id: 'preset_1',
    titleBn: 'মাথা ব্যথা ও ডাক্তার চাওয়া',
    titleEn: 'Severe Headache & Doctor Request',
    tokens: ['আমি', 'মাথা', 'ব্যথা'],
    tokenEn: ['I', 'HEAD', 'PAIN'],
    reconstructedBn: 'আমার প্রচণ্ড মাথা ব্যথা করছে, আমি ডাক্তার দেখাতে চাই।',
    reconstructedEn: 'I have a severe headache, I want to see a doctor.',
    urgency: 'Normal',
    department: 'General Medicine / Neurology',
    latencyBreakdown: { mediapipe: 18, bilstm: 65, rag: 110, tts: 45 },
    confidence: 96.4,
    simulatedLandmarkType: 'head_pain'
  },
  {
    id: 'preset_2',
    titleBn: 'জরুরি সাহায্য ও শ্বাসকষ্ট',
    titleEn: 'Emergency Respiratory Distress',
    tokens: ['জরুরি', 'সাহায্য', 'শ্বাসকষ্ট'],
    tokenEn: ['EMERGENCY', 'HELP', 'BREATHING'],
    reconstructedBn: 'জরুরি সাহায্য প্রয়োজন! রোগীর তীব্র শ্বাসকষ্ট হচ্ছে।',
    reconstructedEn: 'Emergency assistance required! Patient is experiencing severe respiratory distress.',
    urgency: 'Urgent Alert',
    department: 'Emergency Triage & ICU',
    latencyBreakdown: { mediapipe: 17, bilstm: 62, rag: 104, tts: 48 },
    confidence: 98.2,
    simulatedLandmarkType: 'emergency_breath'
  },
  {
    id: 'preset_3',
    titleBn: 'ওষুধ খাওয়ার নিয়ম জিজ্ঞাসা',
    titleEn: 'Medication Timing & Dosage Query',
    tokens: ['ওষুধ', 'কখন', 'খাবো'],
    tokenEn: ['MEDICINE', 'WHEN', 'EAT'],
    reconstructedBn: 'আমি এই ওষুধটি কখন এবং কীভাবে খাবো?',
    reconstructedEn: 'When and how should I take this medication?',
    urgency: 'Normal',
    department: 'Hospital Pharmacy',
    latencyBreakdown: { mediapipe: 19, bilstm: 68, rag: 112, tts: 44 },
    confidence: 94.8,
    simulatedLandmarkType: 'medicine_time'
  },
  {
    id: 'preset_4',
    titleBn: 'রক্তচাপ পরীক্ষা অনুরোধ',
    titleEn: 'Blood Pressure Check Request',
    tokens: ['রক্তচাপ', 'পরীক্ষা'],
    tokenEn: ['BLOOD PRESSURE', 'TEST'],
    reconstructedBn: 'দয়া করে আমার রক্তচাপ পরীক্ষা করুন।',
    reconstructedEn: 'Please check my blood pressure.',
    urgency: 'Normal',
    department: 'Diagnostic & Nursing Station',
    latencyBreakdown: { mediapipe: 18, bilstm: 64, rag: 108, tts: 42 },
    confidence: 95.1,
    simulatedLandmarkType: 'bp_check'
  },
  {
    id: 'preset_5',
    titleBn: 'কৃতজ্ঞতা প্রকাশ ও সুস্থতা',
    titleEn: 'Gratitude & Improved Health State',
    tokens: ['ধন্যবাদ', 'ভালো'],
    tokenEn: ['THANK YOU', 'GOOD'],
    reconstructedBn: 'আপনাকে অসংখ্য ধন্যবাদ, আমি এখন আগের চেয়ে ভালো বোধ করছি।',
    reconstructedEn: 'Thank you very much, I feel much better than before.',
    urgency: 'Normal',
    department: 'Inpatient Ward & Discharge',
    latencyBreakdown: { mediapipe: 17, bilstm: 61, rag: 106, tts: 41 },
    confidence: 97.5,
    simulatedLandmarkType: 'thank_you'
  },
  {
    id: 'preset_unknown',
    titleBn: 'অস্পষ্ট / অজানা সংকেত (Responsible AI Gate)',
    titleEn: 'Ambiguous Sign (Abstention Gate Test)',
    tokens: ['অজানা_সংকেত'],
    tokenEn: ['UNKNOWN_NOISE'],
    reconstructedBn: 'নিশ্চিতভাবে সাইন শনাক্ত করা যায়নি (কনফিডেন্স: ৪১.২% < ৮০% থ্রেশহোল্ড)। অনুগ্রহ করে হাত ক্যামেরার সামনে রেখে আবার পরিষ্কারভাবে সাইন করুন।',
    reconstructedEn: 'Sign could not be identified with certainty (Confidence: 41.2% < 80% threshold). Please sign clearly in front of the camera again.',
    urgency: 'Normal',
    department: 'Confidence Guardrail Gate',
    latencyBreakdown: { mediapipe: 22, bilstm: 55, rag: 45, tts: 35 },
    confidence: 41.2,
    simulatedLandmarkType: 'unknown_noise'
  }
];

export const DOCTOR_PRESETS: DoctorPreset[] = [
  {
    id: 'doc_1',
    bengaliText: 'আপনার অ্যাপয়েন্টমেন্ট নম্বর কত?',
    englishText: 'What is your appointment number?',
    department: 'Hospital Reception & Registration',
    signs: [
      {
        glossBn: 'আপনার',
        glossEn: 'YOUR',
        instructionBn: 'হাতের তালু উন্মুক্ত করে রোগীর দিকে প্রসারিত করুন',
        instructionEn: 'Open palm facing the patient gently',
        handshape: 'flat_palm',
        direction: 'Forward'
      },
      {
        glossBn: 'অ্যাপয়েন্টমেন্ট',
        glossEn: 'APPOINTMENT / SLIP',
        instructionBn: 'বাম তালুর উপর ডান হাতের তর্জনী দিয়ে লেখার মুদ্রা প্রদর্শন করুন',
        instructionEn: 'Mimic writing on the left palm with right index finger',
        handshape: 'pointing',
        direction: 'Right to Left Palm'
      },
      {
        glossBn: 'নম্বর',
        glossEn: 'NUMBER',
        instructionBn: 'দুই হাতের আঙুলগুলো মোচড় দিয়ে সংখ্যার সঙ্কেত তৈরি করুন',
        instructionEn: 'Twist pinched fingers together',
        handshape: 'cupped',
        direction: 'Inward'
      },
      {
        glossBn: 'কত',
        glossEn: 'HOW MUCH / WHAT',
        instructionBn: 'উভয় হাতের তালু উপরে তুলে হালকা নাড়ান',
        instructionEn: 'Open palms turned upwards and shrugging lightly',
        handshape: 'flat_palm',
        direction: 'Upward vibration'
      }
    ]
  },
  {
    id: 'doc_2',
    bengaliText: 'রক্তচাপ ও তাপমাত্রা মাপতে হবে',
    englishText: 'Need to measure blood pressure and temperature',
    department: 'Nursing & Vital Signs Triage',
    signs: [
      {
        glossBn: 'রক্তচাপ',
        glossEn: 'BLOOD PRESSURE',
        instructionBn: 'বাম হাতের বাহুতে ডান হাত রেখে রক্তচাপ মাপার কাফের মতো চেপে ধরুন',
        instructionEn: 'Place right hand around left upper arm like a BP cuff',
        handshape: 'cupped',
        direction: 'Around arm'
      },
      {
        glossBn: 'এবং',
        glossEn: 'AND',
        instructionBn: 'হাতের তালু একপাশ থেকে অন্যপাশে টানুন',
        instructionEn: 'Sweep flat hand slightly to the side',
        handshape: 'flat_palm',
        direction: 'Horizontal'
      },
      {
        glossBn: 'তাপমাত্রা',
        glossEn: 'TEMPERATURE',
        instructionBn: 'ডান তর্জনী মুখে থার্মোমিটারের মতো স্থাপন করে কপালে নির্দেশ করুন',
        instructionEn: 'Touch mouth then forehead indicating thermometer',
        handshape: 'pointing',
        direction: 'Mouth to Forehead'
      },
      {
        glossBn: 'পরীক্ষা',
        glossEn: 'CHECK / TEST',
        instructionBn: 'দুই হাতের তর্জনী দিয়ে অনুভূমিকভাবে স্ক্যানিং ভঙ্গি করুন',
        instructionEn: 'Horizontal scanning gesture with both index fingers',
        handshape: 'pointing',
        direction: 'Forward sweep'
      }
    ]
  },
  {
    id: 'doc_3',
    bengaliText: 'এই ওষুধটি দিনে দুইবার খাবেন',
    englishText: 'Take this medicine twice a day',
    department: 'Clinical Pharmacy Desk',
    signs: [
      {
        glossBn: 'এই ওষুধ',
        glossEn: 'THIS MEDICINE',
        instructionBn: 'বাম তালুর উপর ডান তর্জনী দিয়ে বড়ি পেষার ভঙ্গি করুন',
        instructionEn: 'Grind imaginary pill in left palm with right thumb/index',
        handshape: 'cupped',
        direction: 'Circular on palm'
      },
      {
        glossBn: 'দিন',
        glossEn: 'DAY',
        instructionBn: 'সূর্য ওঠার মতো ডান হাত নিচ থেকে উপরে বৃত্তাকারে তুলুন',
        instructionEn: 'Arc hand upwards like sunrise',
        handshape: 'flat_palm',
        direction: 'Arcing Up'
      },
      {
        glossBn: 'দুইবার',
        glossEn: 'TWICE (2)',
        instructionBn: 'তর্জনী ও মধ্যমা তুলে ‘২’ সংখ্যা প্রদর্শন করুন',
        instructionEn: 'Hold up two fingers (V sign)',
        handshape: 'pointing',
        direction: 'Upright'
      },
      {
        glossBn: 'খাবেন',
        glossEn: 'CONSUME / EAT',
        instructionBn: 'আঙুলগুলো গুটিয়ে মুখে ওষুধ গ্রহণের ভঙ্গি করুন',
        instructionEn: 'Bring pinched fingers to mouth gently',
        handshape: 'cupped',
        direction: 'Towards Mouth'
      }
    ]
  },
  {
    id: 'doc_4',
    bengaliText: 'জরুরি বিভাগে আসুন',
    englishText: 'Please come to the emergency department',
    department: 'Emergency & Urgent Care',
    signs: [
      {
        glossBn: 'জরুরি',
        glossEn: 'EMERGENCY',
        instructionBn: 'উভয় হাত দ্রুত ওঠানামা করিয়ে তাৎক্ষণিক তৎপরতার সংকেত দিন',
        instructionEn: 'Rapid alternating hand motion indicating urgency',
        handshape: 'two_hands_cross',
        direction: 'Fast alternating vertical'
      },
      {
        glossBn: 'বিভাগ',
        glossEn: 'DEPARTMENT / ROOM',
        instructionBn: 'উভয় হাত দিয়ে কক্ষ বা জোনের চারকোণা সীমানা আঁকুন',
        instructionEn: 'Draw box boundary with both hands',
        handshape: 'flat_palm',
        direction: 'Square tracing'
      },
      {
        glossBn: 'আসুন',
        glossEn: 'COME HERE',
        instructionBn: 'হাতের তালু নিজের দিকে টেনে আন্তরিকভাবে আহ্বান করুন',
        instructionEn: 'Beckon forward with friendly palm facing self',
        handshape: 'flat_palm',
        direction: 'Inward pull'
      }
    ]
  },
  {
    id: 'doc_5',
    bengaliText: 'আপনার কি কোনো এলার্জি আছে?',
    englishText: 'Do you have any known allergies?',
    department: 'General Consultation',
    signs: [
      {
        glossBn: 'আপনার',
        glossEn: 'YOUR',
        instructionBn: 'উন্মুক্ত তালু রোগীর দিকে নির্দেশ করুন',
        instructionEn: 'Open palm facing the patient gently',
        handshape: 'flat_palm',
        direction: 'Forward'
      },
      {
        glossBn: 'এলার্জি',
        glossEn: 'ALLERGY / ITCHING',
        instructionBn: 'এক হাত দিয়ে অপর হাতের পিঠে হালকা চুলকানোর ভঙ্গি করুন',
        instructionEn: 'Scratch back of hand gently to mimic allergic reaction',
        handshape: 'cupped',
        direction: 'Repetitive scratch'
      },
      {
        glossBn: 'আছে?',
        glossEn: 'EXIST / HAVE?',
        instructionBn: 'উভয় হাত বুকের সামনে খোলা রেখে জিজ্ঞাসু দৃষ্টি দিন',
        instructionEn: 'Open hands at waist level with questioning posture',
        handshape: 'flat_palm',
        direction: 'Open hold'
      }
    ]
  },
  {
    id: 'doc_6',
    bengaliText: 'অনুগ্রহ করে ৫ মিনিট অপেক্ষা করুন',
    englishText: 'Please wait for 5 minutes',
    department: 'Waiting Lounge & Triage',
    signs: [
      {
        glossBn: 'দয়া করে',
        glossEn: 'PLEASE',
        instructionBn: 'ডান হাতের তালু বুকের ওপর রেখে মৃদু বৃত্তাকার সঞ্চালন করুন',
        instructionEn: 'Rub right flat palm on center of chest in gentle circles',
        handshape: 'chest_touch',
        direction: 'Circular on chest'
      },
      {
        glossBn: '৫',
        glossEn: 'FIVE (5)',
        instructionBn: 'হাতের ৫টি আঙুল সম্পূর্ণ খুলে দেখান',
        instructionEn: 'Spread all 5 fingers upright',
        handshape: 'flat_palm',
        direction: 'Upright'
      },
      {
        glossBn: 'মিনিট',
        glossEn: 'MINUTE',
        instructionBn: 'তর্জনী ঘড়ির কাটার মতো একপাক ঘোরান',
        instructionEn: 'Rotate index finger one turn like clock hand',
        handshape: 'pointing',
        direction: 'Clockwise circle'
      },
      {
        glossBn: 'অপেক্ষা',
        glossEn: 'WAIT',
        instructionBn: 'উভয় হাতের তালু নিচে রেখে শান্তভাবে ধরে রাখুন',
        instructionEn: 'Hold both palms flat facing downwards calmly',
        handshape: 'flat_palm',
        direction: 'Static hold'
      }
    ]
  }
];
